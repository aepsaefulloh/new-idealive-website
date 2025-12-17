import { useExampleStore } from './modules/example'
import { useSupabaseStore } from './modules/supabase'
import { useAuthStore } from './modules/auth'
import { useThemeStore } from './modules/theme'
import { useContactStore } from './modules/contact'
import { useRecaptchaStore } from './modules/recaptcha'

import { useAdminArticlesStore } from './modules/admin/articles'
import { useAdminCategoriesStore } from './modules/admin/categories'
import { useAdminClientsStore } from './modules/admin/clients'
import { useAdminCmsStore } from './modules/admin/cms'
import { useAdminProjectsStore } from './modules/admin/projects'
import { useAdminTeamStore } from './modules/admin/team'

import { usePublicArticlesStore } from './modules/public/articles'
import { usePublicCategoriesStore } from './modules/public/categories'
import { usePublicClientsStore } from './modules/public/clients'
import { usePublicCmsStore } from './modules/public/cms'
import { usePublicProjectsStore } from './modules/public/projects'
import { usePublicTeamStore } from './modules/public/team'

export {
  useExampleStore,
  useSupabaseStore,
  useAuthStore,
  useThemeStore,
  useContactStore,
  useRecaptchaStore,

  useAdminArticlesStore,
  useAdminCategoriesStore,
  useAdminClientsStore,
  useAdminCmsStore,
  useAdminProjectsStore,
  useAdminTeamStore,

  usePublicArticlesStore,
  usePublicCategoriesStore,
  usePublicClientsStore,
  usePublicCmsStore,
  usePublicProjectsStore,
  usePublicTeamStore,
}