import { useExampleStore } from './modules/example'
import { useSupabaseStore } from './modules/supabase'
import { useAuthStore } from './modules/auth'
import { useThemeStore } from './modules/theme'
import { useContactStore } from './modules/contact'
import { useRecaptchaStore } from './modules/recaptcha'

import { useAdminArticlesStore } from './modules/admin/articles'
import { useAdminCategoriesStore } from './modules/admin/categories'
import { useAdminCmsStore } from './modules/admin/cms'
import { useAdminProjectsStore } from './modules/admin/projects'

import { usePublicArticlesStore } from './modules/public/articles'
import { usePublicCategoriesStore } from './modules/public/categories'
import { usePublicCmsStore } from './modules/public/cms'
import { usePublicProjectsStore } from './modules/public/projects'

export {
  useExampleStore,
  useSupabaseStore,
  useAuthStore,
  useThemeStore,
  useContactStore,
  useRecaptchaStore,

  useAdminArticlesStore,
  useAdminCategoriesStore,
  useAdminCmsStore,
  useAdminProjectsStore,

  usePublicArticlesStore,
  usePublicCategoriesStore,
  usePublicCmsStore,
  usePublicProjectsStore,
}