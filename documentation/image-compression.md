# Image compression — ringkas dan praktis

Dokumentasi singkat untuk utility kompresi gambar di `utils/imageCompression.js`. Utility ini menjalankan kompresi di browser, mengubah gambar ke format WebP (default quality 75%) dan menghasilkan file siap di-upload ke Supabase Storage.

**Keunggulan singkat:**
- **Kompresi di browser:** mengurangi beban server.
- **Konversi ke WebP:** ukuran lebih kecil dengan kualitas baik.
- **Preview langsung:** bisa lihat hasil sebelum upload.
- **Lazy upload:** file hanya di-upload saat form disubmit.

---

**Bagaimana alurnya (singkat):**
1. User memilih file gambar.
2. `FileReader` baca file sebagai DataURL.
3. Gambar dimuat ke object `Image` untuk dapatkan dimensi asli.
4. Hitung ukuran keluaran sambil menjaga aspect ratio.
5. Gambar digambar ulang di `canvas` lalu diekspor dengan `canvas.toBlob` ke WebP.
6. Hasilnya: `Blob` + `File` (.webp) + `dataUrl` untuk preview.

---

**Fungsi utama**

- `compressImage(file, options)` — fungsi utama.
  - Parameter umum:
    - `file` (File) — file input.
    - `options.quality` (number, default 0.75)
    - `options.maxWidth` (number, default 1920)
    - `options.maxHeight` (number, default 1080)
  - Mengembalikan objek:
    ```javascript
    {
      blob,         // hasil Blob (WebP)
      file,         // File .webp siap upload
      dataUrl,      // base64 untuk preview
      originalSize, // bytes
      compressedSize,
      compressionRatio,
      width,
      height
    }
    ```

- `compressForThumbnail(file)` — preset untuk thumbnail (max 800×600, quality 75%).
- `compressForBanner(file)` — preset untuk banner (max 1920×1080, quality 75%).
- `formatFileSize(bytes)` — helper untuk menampilkan ukuran yang mudah dibaca.

---

Contoh singkat penggunaan (Vue):

```javascript
import { compressForThumbnail, formatFileSize } from '@/utils/imageCompression'

const thumbnailFile = ref(null)
const thumbnailPreview = ref('')

const handleThumbnailUpload = async (e) => {
  const f = e.target.files?.[0]
  if (!f) return
  try {
    const result = await compressForThumbnail(f)
    thumbnailFile.value = result.file
    thumbnailPreview.value = result.dataUrl
    console.log(`${formatFileSize(result.originalSize)} → ${formatFileSize(result.compressedSize)}`)
  } catch (err) {
    console.error('Compression failed', err)
  }
}

// Upload hanya saat submit
const uploadFile = async (file, folder = 'images') => {
  const supabase = useNuxtApp().$supabase
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.webp`
  const filePath = `${folder}/${fileName}`

  const { error } = await supabase.storage.from('images').upload(filePath, file, {
    contentType: 'image/webp',
    cacheControl: '3600'
  })
  if (error) throw error

  const { data } = supabase.storage.from('images').getPublicUrl(filePath)
  return data.publicUrl
}
```

---

Kenapa WebP?
- Ukuran lebih kecil dengan kualitas yang setara.
- Dukungan di browser modern sangat baik (kecuali IE).

Contoh kasar hasil kompresi (bergantung konten):
- 2.5 MB → ~450 KB
- 5.0 MB → ~800 KB

---

Tips dan catatan
- Proses terjadi di client; pastikan UX (spinner/toast) saat kompresi berlangsung.
- Aspect ratio selalu dijaga — gambar tidak akan terdistorsi.
- WebP mendukung transparansi seperti PNG.

---

File terkait
- `utils/imageCompression.js` — implementasi utility
- `pages/xms/articles.vue`, `pages/xms/projects.vue` — contoh pemakaian

Jika mau, saya bisa:
- menyingkat contoh kode lebih jauh, atau
- menambahkan potongan `API` test sederhana untuk mencoba utility di browser.

