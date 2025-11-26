# 🎨 Website - Modern CMS

Sebuah website portfolio modern dengan sistem CMS dinamis yang dibangun menggunakan Nuxt 3, Vue 3, dan Supabase. Website ini dirancang untuk menampilkan portfolio kreatif dengan kemampuan manajemen konten yang lengkap.

## ✨ Fitur Utama

### 🎯 **Dynamic Content Management**
- **Hero Section** - Konten hero yang dapat diedit melalui CMS
- **About Me** - Section tentang diri yang dinamis
- **Skills & Expertise** - Manajemen skill dengan level proficiency
- **Projects Portfolio** - CRUD lengkap untuk project showcase

### 📱 **Modern User Experience**
- **Responsive Design** - Mobile-first dengan Tailwind CSS
- **Dark/Light Mode** - Auto-detect system preference
- **Smooth Animations** - GSAP powered transitions
- **Fast Performance** - Optimized loading dan images

### 🔐 **Secure CMS System**
- **Authentication** - Supabase Auth untuk akses CMS
- **Role-based Access** - Hanya admin yang bisa manage content
- **File Upload** - Secure image upload dengan validation
- **Real-time Updates** - Live sync antar admin dan public pages

### 📧 **Contact Integration**
- **Contact Form** - Form kontak dengan reCAPTCHA v3
- **Message Management** - CMS untuk manage pesan masuk
- **Spam Protection** - Bot detection dengan reCAPTCHA

## 🛠️ Tech Stack

### **Frontend Framework**
- **Nuxt 3.20.0** - Full-stack Vue framework
- **Vue 3.5.22** - Progressive JavaScript framework
- **TypeScript** - Type-safe development

### **State Management & Data**
- **Pinia 3.0.4** - Intuitive state management
- **Supabase** - Backend-as-a-Service (Database + Auth + Storage)

### **Styling & UI**
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Heroicons** - Beautiful hand-crafted SVG icons
- **GSAP 3.13.0** - High-performance animations

### **Security & Performance**
- **reCAPTCHA v3** - Advanced bot protection
- **Row Level Security** - Database-level security
- **Image Optimization** - Automatic image compression

## 📁 Project Structure

```
portfolio-website/
├── 📄 pages/                 # Route-based pages
│   ├── index.vue            # Homepage dengan hero section
│   ├── about.vue            # About page
│   ├── contact.vue          # Contact page
│   ├── projects/            # Project showcase
│   │   ├── index.vue        # Projects grid
│   │   └── [slug].vue       # Project detail
│   └── cms/                 # CMS Management (Protected)
│       ├── index.vue        # CMS Dashboard
│       ├── projects.vue     # Projects CRUD
│       └── contact.vue      # Contact messages
├── 🧩 components/           # Reusable Vue components
│   ├── Navbar.vue           # Main navigation
│   ├── Footer.vue           # Site footer
│   └── dashboard/           # CMS components
├── 🏪 stores/               # Pinia state management
│   ├── modules/
│   │   ├── auth.js          # Authentication store
│   │   ├── projects.js      # Projects data store
│   │   ├── contact.js       # Contact messages store
│   │   └── cms.js           # CMS content store
├── 🎨 layouts/              # Page layouts
│   ├── default.vue          # Main layout
│   ├── auth.vue             # Auth pages layout
│   └── dashboard.vue        # CMS dashboard layout
└── 🔧 server/               # Server-side API routes
    └── api/
        ├── auth/            # Auth endpoints
        └── contact.ts       # Contact form handler
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **Supabase Account** - Untuk database dan authentication

### Installation

```bash
# Clone repository
git clone <repository-url>
cd portfolio-website

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan Supabase credentials Anda
```

### Environment Configuration

```env
# Supabase Configuration
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# reCAPTCHA (untuk contact form)
RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```

### Database Setup

1. **Buka Supabase Dashboard**
2. **SQL Editor** → Jalankan migrations secara berurutan:
   - `supabase/migrations/20251117053532_core_tables.sql`
   - `supabase/migrations/20251117053222_cms_content_tables.sql`
   - `supabase/migrations/20251117054501_storage_setup.sql`

### Development

```bash
# Start development server
npm run dev

# Website akan berjalan di http://localhost:3000
```

## 🎛️ CMS Management

### Akses CMS
1. Kunjungi `/xms/login`
2. Login dengan akun admin
3. Akses dashboard di `/xms`

### Fitur CMS

#### 📊 **Dashboard Overview**
- Statistik konten
- Recent projects
- Unread contact messages
- Quick actions

#### 🎨 **Content Management**
- **Hero Section**: Edit title, subtitle, description
- **About Me**: Update bio dan personal info
- **Skills**: Add/edit skills dengan proficiency level
- **Contact Info**: Manage email, phone, location, social links
- **Projects**: Full CRUD dengan file upload

#### 📁 **Projects Management**
- **Create**: Add new project dengan thumbnail/banner
- **Read**: List semua projects dengan filter
- **Update**: Edit project details dan images
- **Delete**: Remove project dengan konfirmasi

#### 📧 **Contact Management**
- View semua pesan masuk
- Mark as read/unread
- Reply ke email pengirim
- Delete spam messages

### File Upload System
- **Thumbnail**: Preview images untuk project cards
- **Banner**: Hero images untuk project detail pages
- **Auto-optimization**: Compress dan resize otomatis
- **Secure Storage**: Supabase Storage dengan RLS policies

## 🌐 Public Pages

### Homepage (`/`)
- Hero section dengan call-to-action
- Featured projects showcase
- Skills overview
- Contact CTA

### About Page (`/about`)
- Personal bio
- Skills breakdown
- Experience timeline
- Social links

### Projects (`/projects`)
- Grid layout dengan filter
- Project cards dengan hover effects
- Search functionality
- Category filtering

### Project Detail (`/projects/[slug]`)
- Full project showcase
- Image gallery
- Tech stack badges
- Live demo & GitHub links

### Contact (`/contact`)
- Contact form dengan reCAPTCHA
- **Contact information dinamis** dari CMS (email, phone, location)
- **Social media links** yang dapat dikelola dari CMS
- Location info dan business hours

## 🔒 Security Features

### Authentication & Authorization
- **Supabase Auth** - Secure authentication
- **Route Protection** - CMS pages protected
- **Session Management** - Auto session handling

### Data Security
- **Row Level Security** - Database-level access control
- **Input Validation** - Client & server-side validation
- **SQL Injection Protection** - Parameterized queries

### Content Security
- **File Upload Validation** - Type, size, malware checks
- **Image Optimization** - Safe image processing
- **Public Access Control** - Secure file serving

## 📱 Responsive Design

### Mobile-First Approach
- **Breakpoint System**: sm/md/lg/xl breakpoints
- **Touch-Friendly**: Large tap targets
- **Optimized Images**: Mobile-optimized image delivery

### Performance Optimizations
- **Lazy Loading**: Images load on demand
- **Code Splitting**: Route-based code splitting
- **Caching**: Intelligent caching strategies

## 🎨 Design System

### Color Palette
- **Primary**: Purple/Blue gradient
- **Secondary**: Green accents
- **Neutral**: Gray scale untuk text
- **Dark Mode**: Full dark theme support

### Typography
- **Font Family**: System fonts untuk performance
- **Hierarchy**: Clear heading structure
- **Readability**: Optimized line-height dan spacing

### Components
- **Reusable UI**: Consistent component library
- **Accessibility**: WCAG compliant
- **Animations**: Subtle micro-interactions

## 🚀 Deployment

### Production Build
```bash
# Build untuk production
npm run build

# Preview production build
npm run preview
```

### Deployment Platforms
- **Vercel** - Recommended untuk Nuxt
- **Netlify** - Great static hosting
- **Railway** - Full-stack deployment
- **DigitalOcean** - VPS hosting

### Environment Setup
Pastikan production environment memiliki:
- Supabase production project
- Environment variables yang benar
- Domain configuration
- SSL certificate

## 🔧 Development Guidelines

### Code Style
- **ESLint**: Code linting dan formatting
- **Prettier**: Consistent code formatting
- **TypeScript**: Type safety
- **Vue Composition API**: Modern Vue patterns

### Git Workflow
- **Feature Branches**: Branch per feature
- **Pull Requests**: Code review required
- **Semantic Commits**: Conventional commit messages

### Testing
- **Unit Tests**: Component testing dengan Vitest
- **E2E Tests**: Playwright untuk integration tests
- **Performance**: Lighthouse auditing

## 📈 Performance Metrics

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimization Features
- **Image Optimization**: WebP format, lazy loading
- **Bundle Splitting**: Route-based code splitting
- **Caching**: Aggressive caching strategies
- **CDN**: Global content delivery

## 🐛 Troubleshooting

### Common Issues

#### CMS Access Problems
```bash
# Check authentication status
console.log('Auth status:', useSupabaseUser())
```

#### Image Upload Issues
- Check storage bucket permissions
- Verify file size limits (max 5MB)
- Check network connectivity

#### Database Connection
- Verify Supabase credentials
- Check RLS policies
- Review network restrictions

### Debug Commands
```bash
# Development dengan inspect
npm run dev -- --inspect

# Build analysis
npm run build -- --analyze

# Type checking
npm run typecheck
```

## 📞 Support & Contributing

### Getting Help
1. Check documentation di `README.md`
2. Review console errors
3. Check Supabase dashboard logs
4. Search existing issues

### Contributing
1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎉 Getting Started

1. **Setup project** - Install dependencies dan configure environment
2. **Run migrations** - Setup database tables dan storage
3. **Start developing** - `npm run dev` dan mulai customize
4. **Deploy** - Push ke production ketika ready

**Happy coding! 🚀**

---

*Built with ❤️ using Nuxt 3, Vue 3, and Supabase*