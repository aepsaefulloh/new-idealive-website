# 🚀 Quick Setup Guide - New Idealive Website

Panduan lengkap untuk mengatur dan menjalankan proyek New Idealive Website menggunakan Supabase CLI.

---

## 📋 Prerequisites

Pastikan sistem Anda memiliki software berikut:

- ✅ **Node.js** (versi 18 atau lebih tinggi)
- ✅ **npm** atau **yarn** (package manager)
- ✅ **Git** (untuk cloning repository)
- ✅ **Supabase CLI** (akan diinstall di step berikutnya)

---

## 🛠️ Step 1: Install Supabase CLI

### Windows (PowerShell/Command Prompt)
```bash
npm install -g supabase
```

### Verifikasi Instalasi
```bash
supabase --version
```

**Expected Output:**
```
1.x.x
```

---

## 🚀 Step 2: Setup Project

### 2.1 Clone Repository
```bash
git clone https://github.com/aepsaefulloh/new-idealive-website.git
cd new-idealive-website
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Initialize Supabase (Local Development)
```bash
# Initialize Supabase project
supabase init

# Start local Supabase services
supabase start
```

**Expected Output:**
```
Started supabase local development setup.
```

### 2.4 Run Database Migrations
```bash
# Apply all migrations to local database
supabase db reset
```

### 2.5 Setup Environment Variables

Buat file `.env` di root directory project:

```env
# Local Development
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=your_local_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_local_service_role_key_here

# Production (uncomment and replace when deploying)
# SUPABASE_URL=https://your-project-id.supabase.co
# SUPABASE_ANON_KEY=your_production_anon_key
# SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
```

**Untuk mendapatkan local keys:**
```bash
supabase status
```

### 2.6 Start Development Server
```bash
npm run dev
```

**Aplikasi akan berjalan di:** `http://localhost:3000`

---

## 🔧 Step 3: Production Deployment

### 3.1 Create Supabase Project
1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Create new project
3. Catat **Project URL** dan **API Keys**

### 3.2 Update Environment Variables
Update file `.env` dengan production values:

```env
# Production
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
```

### 3.3 Link & Push Database
```bash
# Login to Supabase
npx supabase login

# Link to remote project (replace with your project ref)
npx supabase link --project-ref your-project-ref

# Push migrations to remote
npx supabase db push
```

### 3.4 Build & Deploy
```bash
# Build for production
npm run build

# Start production server
npm run start
```

---

## 📊 Step 4: Daily Operations

### Development Workflow
```bash
# Start development
npm run dev

# Check Supabase status
supabase status

# View logs
supabase logs
```

### Database Management

#### Create New Migration
```bash
# Create migration file
supabase migration new migration_name

# Edit file in supabase/migrations/
# Then push to database
supabase db push
```

#### Check Migration Status
```bash
supabase migration list
```

#### Reset Local Database
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

---

## 🐛 Troubleshooting

### Issue: Supabase tidak bisa start
```bash
# Kill existing processes
supabase stop

# Clear cache and restart
supabase start --ignore-health-check
```

### Issue: Port 54321 sudah digunakan
```bash
# Use different port
supabase start --port 54322

# Update .env accordingly
SUPABASE_URL=http://localhost:54322
```

### Issue: Migration "Remote database is up to date"
```bash
# Repair specific migration (replace timestamp)
npx supabase migration repair 20251201000001 --status reverted

# Then push again
npx supabase db push
```

### Issue: Reset semua migrations
```bash
# Stop services
supabase stop

# Restart and reset
supabase start
supabase db reset
```

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs/)

---

## ✅ Quick Checklist

- [ ] Node.js installed (v18+)
- [ ] Supabase CLI installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Supabase initialized (`supabase init`)
- [ ] Local services started (`supabase start`)
- [ ] Migrations applied (`supabase db reset`)
- [ ] Environment variables configured (`.env`)
- [ ] Development server running (`npm run dev`)
- [ ] App accessible at `http://localhost:3000`

---

## 📞 Support

Jika mengalami masalah:
1. Pastikan semua prerequisites terinstall
2. Check Supabase services: `supabase status`
3. Verify environment variables di `.env`
4. Pastikan dependencies terinstall: `npm install`
5. Check logs: `supabase logs`

**Happy coding! 🎉**