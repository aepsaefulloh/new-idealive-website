import { createClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl as string
  const serviceKey = config.private.supabaseServiceRoleKey as string

  if (!supabaseUrl || !serviceKey) {
    return {
      success: false,
      error: 'Supabase service credentials missing'
    }
  }

  // Service role client (server-side only)
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  try {
    // Parallel fetches
    const [heroRes, aboutRes, contactRes] = await Promise.all([
      supabase.from('hero_section').select('*').single(),
      supabase.from('about_section').select('*').single(),
      supabase.from('contact_info').select('*').single()
    ])

    const hero = !heroRes.error && heroRes.data ? {
      title: heroRes.data.title,
      subtitle: heroRes.data.subtitle,
      description: heroRes.data.description
    } : null

    const about = !aboutRes.error && aboutRes.data ? {
      bio: aboutRes.data.bio
    } : null

    const contact = !contactRes.error && contactRes.data ? {
      email: contactRes.data.email || '',
      phone: contactRes.data.phone || '',
      location: contactRes.data.location || '',
      github_url: contactRes.data.github_url || '',
      linkedin_url: contactRes.data.linkedin_url || '',
      twitter_url: contactRes.data.twitter_url || '',
      dribbble_url: contactRes.data.dribbble_url || '',
      instagram_url: contactRes.data.instagram_url || '',
      website_url: contactRes.data.website_url || ''
    } : null

    return {
      success: true,
      data: {
        hero,
        about,
        contact
      }
    }
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to load public content'
    }
  }
})
