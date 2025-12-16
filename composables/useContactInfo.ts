import { computed } from 'vue'
import { usePublicCmsStore } from '~/stores'

export const useContactInfo = () => {
  const cmsStore = usePublicCmsStore()

  const contactInfo = computed(() => cmsStore.getContactInfo)
  const isLoading = computed(() => cmsStore.isLoading)

  const fetchIfNeeded = async () => {
    await cmsStore.fetchContactInfo()
  }

  return {
    contactInfo,
    isLoading,
    fetchIfNeeded
  }
}