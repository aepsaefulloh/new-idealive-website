// Import all stores
import { useExampleStore } from './modules/example'
import {useSupabaseStore} from './modules/supabase'
import { useAuthStore } from './modules/auth'
import { useThemeStore } from './modules/theme'
import { useContactStore } from './modules/contact'
import { useProjectsStore } from './modules/projects'
import { useArticlesStore } from './modules/articles'
import { useCategoriesStore } from './modules/categories'
import { useCmsStore } from './modules/cms'

// Export all stores
export {
  useExampleStore,
  useSupabaseStore,
  useAuthStore,
  useThemeStore,
  useContactStore,
  useProjectsStore,
  useArticlesStore,
  useCategoriesStore,
  useCmsStore,
}