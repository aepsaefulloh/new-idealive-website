# Portfolio CMS - Nuxt 3

A modern portfolio website with dynamic CMS capabilities built with Nuxt 3, Vue 3, and Supabase.

## Features

- **Dynamic CMS** - Manage hero section, about me, skills, and projects
- **Project Management** - CRUD operations with file upload support
- **Contact Form** - Secure contact form with reCAPTCHA integration
- **Authentication** - Supabase authentication for CMS access
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Real-time Updates** - Live data synchronization

## Tech Stack

- **Framework**: Nuxt 3.20.0 with Vue 3.5.22
- **State Management**: Pinia 3.0.4
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Styling**: Tailwind CSS 3.4.18
- **Icons**: Heroicons
- **Security**: reCAPTCHA v3

## Database Setup

All database migrations are located in `supabase/migrations/`. Run them in order:

1. `20251117053532_core_tables.sql` - Core tables (users, contact_messages)
2. `20251117053222_cms_content_tables.sql` - CMS content tables (projects, hero, about, skills)
3. `20251117054501_storage_setup.sql` - Storage bucket setup

### Running Migrations

**Via Supabase Dashboard:**
1. Open your Supabase project
2. Go to SQL Editor
3. Copy and paste each migration file content
4. Execute in the order above

## Setup

### Prerequisites
- Node.js 18+
- Supabase account and project

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure your Supabase credentials in .env
```

### Environment Variables

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# reCAPTCHA
RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── assets/           # Static assets
├── components/       # Vue components
│   ├── dashboard/   # CMS dashboard components
│   └── ui/          # Reusable UI components
├── composables/     # Vue composables
├── layouts/         # Page layouts
├── middleware/      # Route middleware
├── pages/           # Application pages
│   ├── cms/        # CMS management pages
│   └── projects/   # Public project pages
├── plugins/         # Nuxt plugins
├── server/          # Server-side API routes
├── stores/          # Pinia stores
├── supabase/        # Database migrations
└── types/           # TypeScript types
```

## CMS Features

### Available at `/xms` (requires authentication)

- **Dashboard** - Overview of all content sections
- **Projects** - Manage portfolio projects with file uploads
- **Contact** - View and manage contact form submissions
- **Hero Section** - Edit homepage hero content
- **About Me** - Edit about section content
- **Skills** - Manage technical skills and proficiency levels

### File Upload Support

- Project thumbnails and banners
- Automatic image optimization
- Secure storage with Supabase Storage
- Public access for website display

## Security

- Row Level Security (RLS) enabled on all database tables
- Authentication required for CMS access
- reCAPTCHA integration for contact forms
- Secure file upload policies

## Deployment

Deploy to any platform supporting Nuxt 3:

- Vercel
- Netlify
- Railway
- DigitalOcean App Platform

Make sure to set all environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests if available
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
