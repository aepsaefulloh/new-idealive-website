// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt/image', '@nuxtjs/robots', '@nuxtjs/sitemap', '@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      'Syne': [400, 500, 600, 700, 800],
      'Space Grotesk': [300, 400, 500, 600, 700],
      'Inter': [300, 400, 500, 600]
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
  },
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'light'
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY || '',
    },
    private: {
      supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    }
  },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // SEO Meta Tags
        { name: 'description', content: '' },
        { name: 'keywords', content: '' },
        { name: 'author', content: 'Aep Saefulloh' },
        { name: 'robots', content: 'index, follow' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '' },
        { property: 'og:description', content: '' },
        { property: 'og:image', content: '/images/logo-idealive-blue.svg' },
        { property: 'og:url', content: 'https://www.aepsaefulloh.my.id' },
        { property: 'og:site_name', content: 'Idealive' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '' },
        { name: 'twitter:description', content: '' },
        { name: 'twitter:image', content: '/images/logo-idealive-blue.svg' },

        // Additional SEO
        { name: 'theme-color', content: '#3b82f6' },
        { name: 'msapplication-TileColor', content: '#3b82f6' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Website' },            
      ],
      link: [
        // Favicon
        { rel: 'icon', type: 'image/x-icon', href: '/images/favicon/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicon/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon/favicon-32x32.png' },
        { rel: 'apple-touch-icon', href: '/images/favicon/apple-touch-icon.png' },

        // Android icons
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/images/favicon/android-chrome-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/images/favicon/android-chrome-512x512.png' },

        // Manifest for PWA
        { rel: 'manifest', href: '/manifest.json' },

        // Canonical URL
        { rel: 'canonical', href: '/' },
      ],
    },
  },

  // Robots.txt configuration - configured via public/_robots.txt
  // robots: {
  //   UserAgent: '*',
  //   Disallow: ['/xms/', '/api/', '/_nuxt/'],
  //   Allow: '/',
  //   Sitemap: 'https://www.aepsaefulloh.my.id/sitemap.xml'
  // },

  // Sitemap configuration - configured via public/sitemap.xml
  // sitemap: {
  //   hostname: 'https://www.aepsaefulloh.my.id',
  //   gzip: true,
  //   routes: [
  //     '/',
  //     '/about',
  //     '/contact',
  //     '/projects',
  //     '/analytics'
  //   ]
  // },

  // Image optimization
  image: {
    domains: ['www.idealive.co.id', process.env.NUXT_PUBLIC_SUPABASE_URL?.replace('https://', '').replace('/','') || ''],
  },

  // Build optimization
  nitro: {
    compressPublicAssets: true,
  },

  // Development server
  devServer: {
    port: 3000,
    host: 'localhost'
  }
})