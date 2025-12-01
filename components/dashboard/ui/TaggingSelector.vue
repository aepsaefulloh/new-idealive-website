<template>
    <div class="w-full">
        <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ label }}
        </label>

        <div class="flex flex-wrap items-center gap-2 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all"
            @click="focusInput">
            <span v-for="(tag, index) in internalTags" :key="`${tag}-${index}`"
                class="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                {{ tag }}
                <button type="button" @click.stop="removeTag(index)" class="hover:text-red-500 transition-colors">
                    <UIcon name="i-heroicons-x-mark" class="w-3 h-3" />
                </button>
            </span>

            <input ref="inputRef" v-model="inputValue" :placeholder="placeholder" :disabled="disabled"
                class="flex-1 min-w-[160px] bg-transparent outline-none text-sm" @keydown.tab.prevent="handleAddByTab"
                @keydown.enter.prevent="handleAddByEnter" @keydown.prevent.arrowDown="navigate(1)"
                @keydown.prevent.arrowUp="navigate(-1)" @keydown.backspace="handleBackspace"
                @input="filterSuggestions" />
        </div>

        <div v-if="showDropdown && filteredSuggestions.length"
            class="mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-48 overflow-auto">
            <button v-for="(item, i) in filteredSuggestions" :key="item" type="button"
                class="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:bg-gray-50 dark:focus:bg-gray-700/50 transition-colors"
                :class="{ 'bg-gray-100 dark:bg-gray-700/60': i === highlightedIndex }" @click="addTag(item)">
                {{ item }}
            </button>
        </div>

        <p v-if="helperText" class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {{ helperText }}
        </p>
    </div>
</template>

<script setup>
import { ref, watch, computed, nextTick } from 'vue'

const props = defineProps({
    modelValue: { type: Array, default: () => [] },
    suggestions: { type: Array, default: () => [] },
    placeholder: { type: String, default: 'Type and press Tab or Enter' },
    label: { type: String, default: '' },
    helperText: { type: String, default: 'Press Tab to add. Use Backspace to remove last.' },
    maxTags: { type: Number, default: 50 },
    allowDuplicates: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    normalizeCase: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue', 'add', 'remove', 'focus'])

const inputRef = ref(null)
const inputValue = ref('')
const internalTags = ref([...props.modelValue])
const showDropdown = ref(false)
const filteredSuggestions = ref([])
const highlightedIndex = ref(-1)

watch(() => props.modelValue, (val) => {
    internalTags.value = [...(val || [])]
})
const normalizedTags = computed(() => internalTags.value.map(t => props.normalizeCase ? t.trim().toLowerCase() : t.trim()))

const focusInput = () => {
    emit('focus')
    nextTick(() => inputRef.value?.focus())
}

const sanitize = (val) => {
    if (!val) return ''
    let t = props.normalizeCase ? val.trim().toLowerCase() : val.trim()
    t = t.replace(/\s+/g, ' ')
    return t
}

const canAdd = (val) => {
    if (!val) return false
    if (internalTags.value.length >= props.maxTags) return false
    if (!props.allowDuplicates) {
        const n = props.normalizeCase ? val.toLowerCase() : val
        return !normalizedTags.value.includes(n)
    }
    return true
}

const addTag = (val) => {
    const tag = sanitize(val)
    if (!tag || !canAdd(tag)) return
    internalTags.value.push(tag)
    emit('update:modelValue', [...internalTags.value])
    emit('add', tag)
    inputValue.value = ''
    showDropdown.value = false
    highlightedIndex.value = -1
}

const removeTag = (index) => {
    const [removed] = internalTags.value.splice(index, 1)
    emit('update:modelValue', [...internalTags.value])
    emit('remove', removed)
}

const handleAddByTab = () => {
    if (highlightedIndex.value >= 0) {
        addTag(filteredSuggestions.value[highlightedIndex.value])
    } else {
        addTag(inputValue.value)
    }
}

const handleAddByEnter = () => {
    if (highlightedIndex.value >= 0) {
        addTag(filteredSuggestions.value[highlightedIndex.value])
    } else {
        addTag(inputValue.value)
    }
}

const handleBackspace = (e) => {
    if (!inputValue.value && internalTags.value.length) {
        removeTag(internalTags.value.length - 1)
    }
}

const filterSuggestions = () => {
    const q = sanitize(inputValue.value)
    if (!q) {
        filteredSuggestions.value = []
        showDropdown.value = false
        highlightedIndex.value = -1
        return
    }
    const pool = (props.suggestions || []).map(s => props.normalizeCase ? String(s).toLowerCase() : String(s))
    filteredSuggestions.value = pool
        .filter(s => s.includes(q))
        .filter(s => props.allowDuplicates || !normalizedTags.value.includes(s))
        .slice(0, 20)
    showDropdown.value = !!filteredSuggestions.value.length
    highlightedIndex.value = filteredSuggestions.value.length ? 0 : -1
}

const navigate = (delta) => {
    if (!showDropdown.value || !filteredSuggestions.value.length) return
    const len = filteredSuggestions.value.length
    highlightedIndex.value = (highlightedIndex.value + delta + len) % len
}
</script>

<style scoped></style>
