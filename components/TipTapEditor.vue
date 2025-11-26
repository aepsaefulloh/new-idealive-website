<template>
  <div class="tiptap-editor">
    <!-- Toolbar -->
    <div class="border border-gray-300 dark:border-gray-600 rounded-t-lg bg-gray-50 dark:bg-gray-800 p-2 flex flex-wrap gap-1">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'"
        class="p-2 rounded text-gray-700 dark:text-gray-300"
        title="Bold"
      >
        <UIcon name="i-heroicons-bold" class="w-4 h-4" />
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'"
        class="p-2 rounded text-gray-700 dark:text-gray-300"
        title="Italic"
      >
        <UIcon name="i-heroicons-italic" class="w-4 h-4" />
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="editor.isActive('strike') ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'"
        class="p-2 rounded text-gray-700 dark:text-gray-300"
        title="Strikethrough"
      >
        <UIcon name="i-heroicons-minus" class="w-4 h-4" />
      </button>
      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'"
        class="p-2 rounded text-gray-700 dark:text-gray-300"
        title="Heading 1"
      >
        H1
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'"
        class="p-2 rounded text-gray-700 dark:text-gray-300"
        title="Heading 2"
      >
        H2
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'"
        class="p-2 rounded text-gray-700 dark:text-gray-300"
        title="Heading 3"
      >
        H3
      </button>
      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'"
        class="p-2 rounded text-gray-700 dark:text-gray-300"
        title="Bullet List"
      >
        <UIcon name="i-heroicons-list-bullet" class="w-4 h-4" />
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'"
        class="p-2 rounded text-gray-700 dark:text-gray-300"
        title="Ordered List"
      >
        <UIcon name="i-heroicons-numbered-list" class="w-4 h-4" />
      </button>
      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'"
        class="p-2 rounded text-gray-700 dark:text-gray-300"
        title="Quote"
      >
        <UIcon name="i-heroicons-chat-bubble-left-right" class="w-4 h-4" />
      </button>
      <button
        @click="editor.chain().focus().setHorizontalRule().run()"
        class="p-2 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Horizontal Rule"
      >
        <UIcon name="i-heroicons-minus" class="w-4 h-4" />
      </button>
      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
      <button
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().undo()"
        class="p-2 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Undo"
      >
        <UIcon name="i-heroicons-arrow-uturn-left" class="w-4 h-4" />
      </button>
      <button
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().redo()"
        class="p-2 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Redo"
      >
        <UIcon name="i-heroicons-arrow-uturn-right" class="w-4 h-4" />
      </button>
    </div>

    <!-- Editor Content -->
    <EditorContent :editor="editor" class="prose prose-sm max-w-none focus:outline-none border-x border-b border-gray-300 dark:border-gray-600 rounded-b-lg" />
  </div>
</template>

<script setup>
import { watch, onUnmounted } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Start writing...'
  },
  limit: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const editor = new Editor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    CharacterCount.configure({
      limit: props.limit,
    }),
  ],
  onUpdate: () => {
    emit('update:modelValue', editor.getHTML())
  },
  editorProps: {
    attributes: {
      class: 'prose prose-sm max-w-none focus:outline-none min-h-[120px] p-4 text-gray-900 dark:text-white',
    },
  },
})

// Update content when modelValue changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== editor.getHTML()) {
    editor.commands.setContent(newValue || '')
  }
})

// Cleanup on unmount
onUnmounted(() => {
  editor.destroy()
})

// Expose editor for parent component if needed
defineExpose({
  editor
})
</script>

<style scoped>
.tiptap-editor :deep(.ProseMirror) {
  outline: none;
  min-height: 120px;
}

.tiptap-editor :deep(.ProseMirror p) {
  margin: 0 0 1rem 0;
}

.tiptap-editor :deep(.ProseMirror p:last-child) {
  margin-bottom: 0;
}

.tiptap-editor :deep(.ProseMirror ul, .ProseMirror ol) {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.tiptap-editor :deep(.ProseMirror h1, .ProseMirror h2, .ProseMirror h3) {
  margin: 1rem 0 0.5rem 0;
  font-weight: 600;
}

.tiptap-editor :deep(.ProseMirror h1) {
  font-size: 1.5rem;
}

.tiptap-editor :deep(.ProseMirror h2) {
  font-size: 1.25rem;
}

.tiptap-editor :deep(.ProseMirror h3) {
  font-size: 1.125rem;
}

.tiptap-editor :deep(.ProseMirror blockquote) {
  border-left: 3px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #6b7280;
}

.tiptap-editor :deep(.ProseMirror code) {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.tiptap-editor :deep(.ProseMirror pre) {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.tiptap-editor :deep(.ProseMirror pre code) {
  background: none;
  padding: 0;
}

.tiptap-editor :deep(.ProseMirror hr) {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2rem 0;
}

/* Dark mode styles */
.dark .tiptap-editor :deep(.ProseMirror blockquote) {
  border-left-color: #374151;
  color: #9ca3af;
}

.dark .tiptap-editor :deep(.ProseMirror code) {
  background-color: #374151;
}

.dark .tiptap-editor :deep(.ProseMirror pre) {
  background-color: #374151;
}

.dark .tiptap-editor :deep(.ProseMirror hr) {
  border-top-color: #374151;
}
</style>