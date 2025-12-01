# Dokumentasi Implementasi Pemisahan Admin & Public

---

## 📋 Recent Change Log

### ✅ 1 Desember 2025 - Implementasi Admin/Public Store Separation

#### Files Created:
| File | Description |
|------|-------------|
| `stores/modules/admin/articles.js` | Full CRUD store untuk articles (admin) |
| `stores/modules/admin/categories.js` | Full CRUD store untuk categories (admin) |
| `stores/modules/admin/cms.js` | Full CRUD store untuk CMS content (admin) |
| `stores/modules/admin/projects.js` | Full CRUD store untuk projects (admin) |
| `stores/modules/public/articles.js` | Read-only store dengan filter `published: true` |
| `stores/modules/public/categories.js` | Read-only store dengan filter `is_active: true` |
| `stores/modules/public/cms.js` | Read-only store via public API |
| `stores/modules/public/projects.js` | Read-only store dengan filter `published: true` |

#### Files Updated:
| File | Changes |
|------|---------|
| `stores/index.js` | Added exports untuk semua admin & public stores |
| `pages/xms/index.vue` | Ganti ke `useAdminProjectsStore`, `useAdminArticlesStore` |
| `pages/xms/projects.vue` | Ganti ke `useAdminProjectsStore`, `useAdminCategoriesStore` |
| `pages/xms/articles.vue` | Ganti ke `useAdminArticlesStore`, `useAdminCategoriesStore` |
| `pages/xms/categories.vue` | Ganti ke `useAdminCategoriesStore` |
| `pages/xms/portfolio.vue` | Ganti ke `useAdminProjectsStore`, `useAdminCmsStore` |
| `pages/contact.vue` | Ganti ke `usePublicCmsStore` |
| `pages/projects/index.vue` | Ganti ke `usePublicProjectsStore` |
| `pages/projects/[slug].vue` | Ganti ke `usePublicProjectsStore` |
| `pages/work/index.vue` | Ganti ke `usePublicProjectsStore` |
| `pages/work/[slug].vue` | Ganti ke `usePublicProjectsStore` |

#### Test Results:
- ✅ Dashboard loading dengan benar (4 projects, 0 articles displayed)
- ✅ Projects page menampilkan 4 projects dengan Edit/Delete buttons
- ✅ Articles page menampilkan 1 article dengan toggle buttons
- ✅ Categories page menampilkan 14 categories dalam format table
- ✅ Login authentication berfungsi normal

---

## Overview
Proyek ini memiliki dua bagian utama:
- **Admin Dashboard (XMS)**: `/xms/*` - untuk management konten
- **Public Website**: Halaman utama untuk visitors

Untuk memudahkan management dan keamanan, kita akan pisahkan logic admin dan public.

## Struktur Akhir yang Diinginkan
```
📁 stores/modules/
├── 📁 admin/           # Stores untuk admin (full access)
│   ├── articles.js
│   ├── categories.js
│   └── cms.js
└── 📁 public/          # Stores untuk public (filtered data)
    ├── articles.js
    ├── categories.js
    └── cms.js

📁 server/api/
├── 📁 admin/           # API untuk admin (butuh auth)
│   ├── articles.get.ts
│   ├── articles.post.ts
│   └── categories.get.ts
└── 📁 public/          # API untuk public (no auth)
    ├── articles.get.ts
    ├── categories.get.ts
    └── content.get.ts
```

## Step-by-Step Implementation

### Step 1: Buat Folder Structure
```bash
# Buat folder untuk stores
mkdir -p stores/modules/admin
mkdir -p stores/modules/public

# Buat folder untuk server API
mkdir -p server/api/admin
mkdir -p server/api/public
```

### Step 2: Pindah Stores Admin
```bash
# Pindah stores yang sudah ada ke admin
mv stores/modules/articles.js stores/modules/admin/
mv stores/modules/categories.js stores/modules/admin/
mv stores/modules/cms.js stores/modules/admin/
```

### Step 3: Buat Stores Public (Filtered)
Buat file `stores/modules/public/articles.js`:

```javascript
import { defineStore } from 'pinia'

export const usePublicArticlesStore = defineStore('public-articles', {
  state: () => ({
    articles: [],
    isLoading: false,
    error: '',
  }),

  getters: {
    publishedArticles: (state) => state.articles.filter(article => article.published),
    featuredArticles: (state) => state.articles.filter(article => article.featured && article.published),
  },

  actions: {
    getSupabase() {
      return useNuxtApp().$supabase
    },

    async fetchArticles() {
      this.isLoading = true
      this.error = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error } = await supabase
          .from('articles')
          .select(`
            *,
            categories (
              id,
              name,
              slug,
              type
            )
          `)
          .eq('published', true)  // Hanya published articles
          .order('created_at', { ascending: false })

        if (error) {
          this.error = error.message || 'Failed to fetch articles'
          return { success: false, error: this.error }
        }

        this.articles = data || []
        return { success: true, data: this.articles }
      } catch (err) {
        this.error = err.message || 'Failed to fetch articles'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    getArticleBySlug(slug) {
      return this.articles.find(article => article.slug === slug)
    }
  }
})
```

Buat file `stores/modules/public/categories.js`:

```javascript
import { defineStore } from 'pinia'

export const usePublicCategoriesStore = defineStore('public-categories', {
  state: () => ({
    categories: [],
    isLoading: false,
    error: '',
  }),

  getters: {
    projectCategories: (state) => state.categories.filter(cat => cat.type === 'project'),
    articleCategories: (state) => state.categories.filter(cat => cat.type === 'article'),
    activeCategories: (state) => state.categories.filter(cat => cat.is_active),
  },

  actions: {
    getSupabase() {
      return useNuxtApp().$supabase
    },

    async fetchCategories() {
      this.isLoading = true
      this.error = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)  // Hanya active categories
          .order('sort_order', { ascending: true })

        if (error) {
          this.error = error.message || 'Failed to fetch categories'
          return { success: false, error: this.error }
        }

        this.categories = data || []
        return { success: true, data: this.categories }
      } catch (err) {
        this.error = err.message || 'Failed to fetch categories'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    }
  }
})
```

Buat file `stores/modules/public/cms.js`:

```javascript
import { defineStore } from 'pinia'

export const usePublicCmsStore = defineStore('public-cms', {
  state: () => ({
    heroSection: {
      title: 'Hello World',
      subtitle: 'Building Modern Web Experiences',
      description: 'Specialized in Vue.js, Nuxt, React, and modern JavaScript frameworks.'
    },
    aboutSection: {
      bio: 'I am a passionate web developer with expertise in creating modern, responsive web applications.'
    },
    contactInfo: {
      email: 'hello@example.com',
      phone: '+1 (234) 567-890',
      location: 'San Francisco, CA',
      github_url: 'https://github.com/username',
      linkedin_url: 'https://linkedin.com/in/username',
      twitter_url: 'https://twitter.com/username',
      dribbble_url: 'https://dribbble.com/username',
      instagram_url: '',
      website_url: ''
    },
    isLoading: false,
    error: '',
  }),

  actions: {
    async loadAllCmsData() {
      this.isLoading = true
      this.error = ''

      try {
        // Load from public API
        const res = await $fetch('/api/public/content')
        if (res?.success && res.data) {
          if (res.data.hero) {
            this.heroSection = res.data.hero
          }
          if (res.data.about) {
            this.aboutSection = res.data.about
          }
          if (res.data.contact) {
            this.contactInfo = res.data.contact
          }
          return { success: true, data: res.data }
        }
        return { success: false, error: 'No public content returned' }
      } catch (err) {
        this.error = 'Failed to load CMS data'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    }
  }
})
```

### Step 4: Update Imports di Pages

#### Untuk Admin Pages (contoh: pages/xms/articles.vue)
```javascript
// Ganti import
// dari: import { useArticlesStore } from '@/stores/modules/articles'
// menjadi:
import { useAdminArticlesStore } from '@/stores/modules/admin/articles'

// Update penggunaan store
// dari: const articlesStore = useArticlesStore()
// menjadi:
const articlesStore = useAdminArticlesStore()
```

#### Untuk Public Pages (contoh: pages/index.vue)
```javascript
// Tambah import public stores
import { usePublicArticlesStore } from '@/stores/modules/public/articles'
import { usePublicCmsStore } from '@/stores/modules/public/cms'

// Gunakan untuk data publik
const articlesStore = usePublicArticlesStore()
const cmsStore = usePublicCmsStore()
```

### Step 5: Buat Server API untuk Admin
Buat file `server/api/admin/articles.get.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  // Check authentication
  const user = await requireAuth(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl as string
  const serviceKey = config.private.supabaseServiceRoleKey as string

  if (!supabaseUrl || !serviceKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase service credentials missing'
    })
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  try {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          type
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message
      })
    }

    return {
      success: true,
      data: data || []
    }
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: err?.message || 'Failed to fetch articles'
    })
  }
})
```

### Step 6: Update Server API Public
Pastikan `server/api/public/content.get.ts` sudah benar (seperti sebelumnya).

Buat file `server/api/public/articles.get.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl as string
  const serviceKey = config.private.supabaseServiceRoleKey as string

  if (!supabaseUrl || !serviceKey) {
    return {
      success: false,
      error: 'Supabase service credentials missing'
    }
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  try {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          type
        )
      `)
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      data: data || []
    }
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to load public articles'
    }
  }
})
```

### Step 7: Update Stores untuk Menggunakan API
Update `stores/modules/admin/articles.js`:

```javascript
// Ganti fetchArticles method
async fetchArticles() {
  this.isLoading = true
  this.error = ''

  try {
    const response = await $fetch('/api/admin/articles')
    if (response.success) {
      this.articles = response.data
      return { success: true, data: this.articles }
    } else {
      this.error = response.error
      return { success: false, error: this.error }
    }
  } catch (err) {
    this.error = err.message || 'Failed to fetch articles'
    return { success: false, error: this.error }
  } finally {
    this.isLoading = false
  }
}
```

Update `stores/modules/public/articles.js`:

```javascript
// Ganti fetchArticles method
async fetchArticles() {
  this.isLoading = true
  this.error = ''

  try {
    const response = await $fetch('/api/public/articles')
    if (response.success) {
      this.articles = response.data
      return { success: true, data: this.articles }
    } else {
      this.error = response.error
      return { success: false, error: this.error }
    }
  } catch (err) {
    this.error = err.message || 'Failed to fetch articles'
    return { success: false, error: this.error }
  } finally {
    this.isLoading = false
  }
}
```

### Step 8: Testing
1. **Test Admin**: Login ke `/xms/articles` - harus bisa lihat semua articles
2. **Test Public**: Kunjungi halaman utama - harus filter published articles
3. **Test API**: 
   - `/api/admin/articles` butuh auth
   - `/api/public/articles` bebas akses

### Step 9: Troubleshooting
- **Error 401**: Pastikan middleware auth di admin routes
- **Data tidak muncul**: Check console untuk error API
- **SSR issues**: Pastikan API menggunakan service role client

## Checklist Implementasi
- [x] Folder structure created ✅ (1 Des 2025)
- [x] Admin stores created ✅ (1 Des 2025)
- [x] Public stores created with filters ✅ (1 Des 2025)
- [x] Imports updated in pages ✅ (1 Des 2025)
- [ ] Admin API endpoints created (Optional - stores use Supabase directly)
- [x] Public API endpoints available ✅ (Already exists)
- [x] Stores use Supabase client ✅ (1 Des 2025)
- [x] Testing completed ✅ (Playwright test passed)
- [x] No errors in console ✅

## Notes
- Pastikan semua file tersimpan dengan benar
- Restart dev server setelah perubahan
- Test di incognito mode untuk cache issues
- Jika ada error, check network tab untuk API calls