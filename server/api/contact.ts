import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const body = await readBody(event)

    // Validate required fields
    const { name, email, subject, message, recaptcha_token } = body

    if (!name || !email || !subject || !message || !recaptcha_token) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      })
    }

    // Verify reCAPTCHA token
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY

    if (!recaptchaSecret) {
      throw createError({
        statusCode: 500,
        statusMessage: 'reCAPTCHA secret key not configured'
      })
    }

    const verificationResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: recaptchaSecret,
        response: recaptcha_token,
      }),
    })

    const verificationResult = await verificationResponse.json()

    if (!verificationResult.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'reCAPTCHA verification failed'
      })
    }

    // Check reCAPTCHA score (v3)
    const score = verificationResult.score || 0
    const isHuman = score >= 0.5 // Adjust threshold as needed

    if (!isHuman) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Suspicious activity detected'
      })
    }

    // Insert message to database
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        read: false,
        recaptcha_score: score,
        verification_status: 'verified',
        created_at: new Date().toISOString(),
      }])
      .select()

    if (error) {
      console.error('Database error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to save message'
      })
    }

    return {
      success: true,
      message: 'Message sent successfully!',
      data: data[0]
    }

  } catch (error) {
    console.error('Contact API error:', error)

    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error // Re-throw createError instances
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})