# 📸 Image Compression Utility - Dokumentasi

## Overview
File `imageCompression.js` adalah utility untuk mengkompresi gambar di sisi **frontend** sebelum di-upload ke Supabase Storage. Gambar akan dikonversi ke format **WebP** dengan kualitas **75%**.

**Fitur Utama:**
- ✅ Kompresi dilakukan di browser (tidak membebani server)
- ✅ Konversi otomatis ke format WebP
- ✅ Preview langsung tanpa upload
- ✅ Upload hanya saat form di-submit (hemat storage)
- ✅ Tidak menggunakan library eksternal (pure Web API)

---

## 🔄 Alur Kerja (Flow)

### Flow Kompresi
```
┌─────────────────┐
│  User pilih     │
│  gambar (JPG,   │
│  PNG, dll)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  FileReader     │
│  membaca file   │
│  sebagai        │
│  DataURL        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Image Object   │
│  memuat gambar  │
│  untuk dapat    │
│  dimensi asli   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Hitung dimensi │
│  baru (jaga     │
│  aspect ratio)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Canvas API     │
│  gambar di-draw │
│  ulang dengan   │
│  dimensi baru   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  canvas.toBlob  │
│  konversi ke    │
│  WebP 75%       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Return File    │
│  .webp yang     │
│  sudah compress │
└─────────────────┘
```

### Flow Upload (Lazy Upload)
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Pilih Gambar   │────▶│  Kompresi &     │────▶│  Simpan di      │
│                 │     │  Preview        │     │  Memory (ref)   │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                        ┌────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │  User bisa:                   │
        │  • Ganti gambar (replace)     │
        │  • Hapus gambar (clear)       │
        │  • Cancel (tidak upload)      │
        └───────────────┬───────────────┘
                        │
                        ▼ (Submit Form)
                ┌───────────────┐
                │  Upload ke    │
                │  Supabase     │
                │  Storage      │
                └───────────────┘
```

**Keuntungan Lazy Upload:**
| Aksi | Hasil |
|------|-------|
| Pilih gambar | Kompresi & preview (belum upload) |
| Ganti gambar | File lama di-replace, tidak ada upload |
| Cancel/Close | File terbuang, tidak ada yang ter-upload |
| Submit | Baru upload ke Supabase, lalu simpan data |

---

## 📦 Fungsi yang Tersedia

### 1. `compressImage(file, options)`
Fungsi utama untuk kompresi gambar.

**Parameter:**
| Parameter | Type | Default | Deskripsi |
|-----------|------|---------|-----------|
| `file` | File | required | File gambar yang akan dikompresi |
| `options.quality` | number | 0.75 | Kualitas kompresi (0-1) |
| `options.maxWidth` | number | 1920 | Lebar maksimum output |
| `options.maxHeight` | number | 1080 | Tinggi maksimum output |

**Return:**
```javascript
{
  blob: Blob,           // Blob hasil kompresi
  file: File,           // File .webp siap upload
  dataUrl: string,      // Base64 untuk preview
  originalSize: number, // Ukuran asli (bytes)
  compressedSize: number, // Ukuran setelah kompresi
  compressionRatio: string, // Persentase pengurangan
  width: number,        // Lebar hasil
  height: number        // Tinggi hasil
}
```

---

### 2. `compressForThumbnail(file)`
Preset untuk thumbnail dengan ukuran lebih kecil.

**Konfigurasi:**
- Quality: **75%**
- Max Width: **800px**
- Max Height: **600px**

**Contoh penggunaan:**
```javascript
const compressed = await compressForThumbnail(file)
// Upload compressed.file ke Supabase
```

---

### 3. `compressForBanner(file)`
Preset untuk banner dengan ukuran lebih besar.

**Konfigurasi:**
- Quality: **75%**
- Max Width: **1920px**
- Max Height: **1080px**

**Contoh penggunaan:**
```javascript
const compressed = await compressForBanner(file)
// Upload compressed.file ke Supabase
```

---

### 4. `formatFileSize(bytes)`
Helper untuk menampilkan ukuran file yang readable.

**Contoh:**
```javascript
formatFileSize(1048576)  // "1 MB"
formatFileSize(512000)   // "500 KB"
```

---

## 🎯 Contoh Implementasi di Vue

```javascript
// Import utility
import { compressForThumbnail, compressForBanner, formatFileSize } from '@/utils/imageCompression'

// Refs untuk menyimpan file sementara
const thumbnailFile = ref(null)
const thumbnailPreview = ref('')

// Handler kompresi (tanpa upload)
const handleThumbnailUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    try {
      toast.info('Compressing image...')
      const compressed = await compressForThumbnail(file)
      
      // Simpan file & preview (belum upload)
      thumbnailFile.value = compressed.file
      thumbnailPreview.value = compressed.dataUrl
      
      console.log(`Compressed: ${formatFileSize(compressed.originalSize)} → ${formatFileSize(compressed.compressedSize)}`)
      toast.success(`Image compressed (${compressed.compressionRatio}% smaller)`)
    } catch (error) {
      toast.error('Failed to compress image')
    }
  }
}

// Handler submit (upload saat submit)
const handleSubmit = async () => {
  let finalThumbnailUrl = form.value.thumbnail_url
  
  // Upload hanya jika ada file baru
  if (thumbnailFile.value) {
    toast.info('Uploading thumbnail...')
    finalThumbnailUrl = await uploadFile(thumbnailFile.value, 'articles')
  }
  
  // Simpan data dengan URL gambar
  const payload = { ...form.value, thumbnail_url: finalThumbnailUrl }
  // ... save to database
}

// Upload ke Supabase
const uploadFile = async (file, folder) => {
  const supabase = useNuxtApp().$supabase
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.webp`
  const filePath = `${folder}/${fileName}`

  const { error } = await supabase.storage
    .from('images')
    .upload(filePath, file, {
      contentType: 'image/webp',
      cacheControl: '3600',
    })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath)

  return publicUrl
}
```

---

## ⚡ Kenapa WebP?

| Format | Ukuran | Kualitas | Browser Support |
|--------|--------|----------|-----------------|
| JPEG | Medium | Good | ✅ Semua |
| PNG | Large | Excellent | ✅ Semua |
| **WebP** | **Small** | **Excellent** | ✅ Modern (95%+) |

WebP memberikan kompresi **25-34% lebih baik** dari JPEG dengan kualitas visual yang sama.

---

## 📊 Contoh Hasil Kompresi

| File Asli | Ukuran Asli | Ukuran WebP 75% | Pengurangan |
|-----------|-------------|-----------------|-------------|
| photo.jpg | 2.5 MB | 450 KB | ~82% |
| banner.png | 5.0 MB | 800 KB | ~84% |
| logo.png | 500 KB | 120 KB | ~76% |

*Hasil bervariasi tergantung konten gambar*

---

## 🔧 Konfigurasi Kustom

Jika ingin kualitas atau ukuran berbeda:

```javascript
import { compressImage } from '@/utils/imageCompression'

// Kompresi dengan konfigurasi kustom
const compressed = await compressImage(file, {
  quality: 0.85,      // Kualitas 85%
  maxWidth: 1200,     // Maks lebar 1200px
  maxHeight: 800      // Maks tinggi 800px
})
```

---

## ⚠️ Catatan Penting

1. **Browser Support**: WebP didukung 95%+ browser modern. IE tidak mendukung WebP.
2. **Kompresi di Frontend**: Proses terjadi di browser user, tidak membebani server.
3. **Aspect Ratio**: Selalu dijaga, gambar tidak akan terdistorsi.
4. **Transparansi**: WebP mendukung transparansi seperti PNG.

---

## 📁 File Terkait

- `utils/imageCompression.js` - Utility compression
- `pages/xms/articles.vue` - Implementasi di articles
- `pages/xms/projects.vue` - Implementasi di projects
