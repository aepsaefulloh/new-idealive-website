import { createClient } from '@supabase/supabase-js'

/**
 * Server API untuk auto-confirm email di Supabase
 * Ini menggunakan Service Role Key sehingga bisa bypass RLS
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { userId, email } = body

    if (!userId || !email) {
      return {
        success: false,
        error: 'Missing userId or email'
      }
    }

    const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL || ''
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials in environment')
      return {
        success: false,
        error: 'Server configuration error'
      }
    }

    // Gunakan Service Role Key untuk bypass RLS
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

    // Update user dengan email confirmed
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: {
        email_verified: true
      }
    })

    if (error) {
      console.error('Error confirming email:', error)
      return {
        success: false,
        error: error.message
      }
    }

    console.log('Email confirmed for:', email)
    return {
      success: true,
      data
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('Server error:', errorMessage)
    return {
      success: false,
      error: errorMessage
    }
  }
})
