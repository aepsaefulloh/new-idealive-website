# Quick Setup Guide

Panduan cepat untuk mengatur dan menjalankan proyek New Idealive Website menggunakan Supabase CLI.

## 📋 Prerequisites

- Node.js (versi 18 atau lebih tinggi)
- npm atau yarn
- Git
- Supabase CLI

## 🛠️ Instalasi Supabase CLI

### Windows (menggunakan PowerShell atau Command Prompt)
```bash
npm install -g supabase
```

### Verifikasi Instalasi
```bash
supabase --version
```

## 🚀 Setup Proyek

### 1. Clone Repository
```bash
git clone https://github.com/aepsaefulloh/new-idealive-website.git
cd new-idealive-website
```

### 2. Instalasi Dependencies
```bash
npm install
```

### 3. Setup Supabase Local Development
```bash
# Inisialisasi Supabase (jika belum ada)
supabase init

# Start Supabase local services
supabase start
```

### 4. Jalankan Migrations
```bash
# Apply migrations ke database lokal
supabase db reset
```

### 5. Setup Environment Variables
Buat file `.env` di root directory:
```env
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=your_local_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_local_service_role_key

# Untuk production, ganti dengan URL dan key dari Supabase dashboard
# SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_ANON_KEY=your_production_anon_key
```

Untuk mendapatkan key lokal:
```bash
supabase status
```

### 6. Jalankan Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 🔧 Operasi Proyek

### Development Mode
```bash
npm run dev
```

### Build untuk Production
```bash
npm run build
npm run start
```

### Static Site Generation
```bash
npm run generate
npm run preview
```

### Database Operations dengan Supabase CLI

#### Melihat Status Supabase
```bash
supabase status
```

#### Menjalankan Migrations Baru
```bash
# Buat migration baru
supabase migration new nama_migration

# Edit file migration di supabase/migrations/
# Kemudian apply
supabase db push
```

#### Reset Database
```bash
supabase db reset
```

#### Stop Supabase Services
```bash
supabase stop
```

### Environment Variables Lengkap

Untuk development lokal:
```env
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Untuk production (dari Supabase Dashboard):
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
```

## 🐛 Troubleshooting

### Jika Supabase tidak start
```bash
# Kill existing processes
supabase stop

# Clear cache
supabase start --ignore-health-check
```

### Jika port 54321 sudah digunakan
```bash
# Gunakan port berbeda
supabase start --port 54322
```

### Reset semua
```bash
supabase stop
supabase start
supabase db reset
```

## 📚 Resources Tambahan

- [Supabase Documentation](https://supabase.com/docs)
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs/)

## 📞 Support

Jika ada masalah, periksa:
1. Pastikan semua prerequisites terinstall
2. Supabase services sedang berjalan (`supabase status`)
3. Environment variables sudah benar
4. Dependencies sudah terinstall (`npm install`)