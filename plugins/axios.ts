// plugins/axios.ts
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const baseApi = axios.create({
        baseURL: (config.public.apiBase as string) || 'http://localhost:3000',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })

    // Add request interceptor to include auth token
    baseApi.interceptors.request.use(
        (config) => {
            try {
                const authToken = useCookie('auth_token')
                if (authToken.value) {
                    config.headers.Authorization = `Bearer ${authToken.value}`
                }
            } catch (error) {
                console.error('[Axios] Request interceptor error:', error)
            }
            return config
        },
        (error) => {
            console.error('[Axios] Request interceptor error:', error)
            return Promise.reject(error)
        }
    )

    // Add response interceptor to handle token refresh and auth errors
    baseApi.interceptors.response.use(
        (response) => {
            return response
        },
        async (error) => {
            const originalRequest = error.config

            // Handle 401 Unauthorized
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true

                try {
                    const authRefresh = useCookie('auth_refresh')
                    const supabaseClient = nuxtApp.$supabase as any

                    if (!supabaseClient) {
                        console.error('[Axios] Supabase client not available')
                        throw new Error('Supabase client not available')
                    }

                    if (authRefresh.value) {
                        // Use Supabase to refresh token
                        const { data, error: refreshError } = await supabaseClient.auth.refreshSession({
                            refresh_token: authRefresh.value
                        })

                        if (refreshError || !data?.session?.access_token) {
                            console.error('[Axios] Token refresh failed:', refreshError?.message)
                            // Clear invalid tokens
                            const authToken = useCookie('auth_token', { encode: String, decode: String })
                            const authRefreshCookie = useCookie('auth_refresh', { encode: String, decode: String })
                            const authUser = useCookie('auth_user', { encode: JSON.stringify, decode: JSON.parse })
                            authToken.value = null
                            authRefreshCookie.value = null
                            authUser.value = null
                            
                            // Only redirect if not already on login page
                            if (typeof window !== 'undefined' && !window.location.pathname.includes('/xms/login')) {
                                window.location.href = '/xms/login'
                            }
                            return Promise.reject(error)
                        }

                        // Save new tokens
                        const newAccessToken = data.session.access_token
                        const newRefreshToken = data.session.refresh_token

                        const authToken = useCookie('auth_token', { maxAge: 60*60*24*7, encode: String, decode: String })
                        const authRefreshCookie = useCookie('auth_refresh', { maxAge: 60*60*24*7, encode: String, decode: String })
                        
                        authToken.value = newAccessToken
                        authRefreshCookie.value = newRefreshToken

                        // Update original request with new token
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                        // Retry original request
                        return baseApi(originalRequest)
                    }
                } catch (refreshError) {
                    console.error('[Axios] Token refresh exception:', refreshError)
                    
                    // Clear cookies and redirect to login (only if not already on login page)
                    const authToken = useCookie('auth_token', { encode: String, decode: String })
                    const authRefreshCookie = useCookie('auth_refresh', { encode: String, decode: String })
                    const authUser = useCookie('auth_user', { encode: JSON.stringify, decode: JSON.parse })
                    authToken.value = null
                    authRefreshCookie.value = null
                    authUser.value = null
                    
                    if (typeof window !== 'undefined' && !window.location.pathname.includes('/xms/login')) {
                        window.location.href = '/xms/login'
                    }
                    
                    return Promise.reject(refreshError)
                }
            }

            // Handle 403 Forbidden
            if (error.response?.status === 403) {
                console.error('[Axios] 403 Forbidden - Access denied')
                return Promise.reject(error)
            }

            // Handle 500 Server Error
            if (error.response?.status === 500) {
                console.error('[Axios] 500 Server Error')
                return Promise.reject(error)
            }

            return Promise.reject(error)
        }
    )

    return {
        provide: {
            baseApi,
        },
    }
})
