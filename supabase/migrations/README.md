# Database Migrations

This directory contains Supabase database migration files for the portfolio CMS application.

## Migration Files

### 1. `20251117053532_core_tables.sql`
**Purpose**: Core application tables
**Tables Created**:
- `users` - User profiles extending Supabase auth
- `contact_messages` - Contact form submissions with reCAPTCHA

**Features**:
- Row Level Security (RLS) enabled
- Proper security policies for authenticated users
- Sample contact messages for testing
- Automatic timestamp updates

### 2. `20251117053222_cms_content_tables.sql`
**Purpose**: CMS content management tables
**Tables Created**:
- `projects` - Portfolio projects with file uploads
- `hero_section` - Dynamic hero section content
- `about_section` - Dynamic about me content
- `skills` - Technical skills with proficiency levels

**Features**:
- Full CRUD support for all CMS content
- File upload support (thumbnail/banner for projects)
- Row Level Security (RLS) enabled
- Sample data for immediate use
- Automatic timestamp updates
- Performance indexes

### 3. `20251117054501_storage_setup.sql`
**Purpose**: Supabase Storage bucket configuration
**Storage Created**:
- `images` bucket - Public bucket for project images and assets

**Features**:
- Public bucket for easy image access
- Authenticated upload permissions
- Public read access for website display
- Folder organization policies
- Secure file management

## How to Run Migrations

### Option 1: Supabase Dashboard (Recommended)
1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy and paste the contents of each migration file
4. Run them in order:
   - First: `20251117053532_core_tables.sql`
   - Second: `20251117053222_cms_content_tables.sql`
   - Third: `20251117054501_storage_setup.sql`

### Option 2: Supabase CLI (Local Development)
```bash
# Apply all migrations
npx supabase db reset --local

# Or apply specific migration
npx supabase migration up
```

## Migration Structure

Each migration follows a consistent structure:

1. **Header** - Description and metadata
2. **Tables Creation** - CREATE TABLE statements with comments
3. **Indexes** - Performance optimization indexes
4. **Row Level Security** - RLS enablement
5. **Security Policies** - Access control policies
6. **Sample Data** - Default/test data insertion
7. **Triggers** - Automatic timestamp updates

## Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Authentication-based policies** for CMS content
- **Public access** for contact form submissions
- **Secure file uploads** through Supabase Storage

## Tables Overview

| Table | Purpose | Access Level |
|-------|---------|--------------|
| `users` | User profiles | Authenticated users only |
| `contact_messages` | Contact form data | Public insert, authenticated read/update |
| `projects` | Portfolio projects | Authenticated users only |
| `hero_section` | Hero content | Authenticated users only |
| `about_section` | About me content | Authenticated users only |
| `skills` | Technical skills | Authenticated users only |

## Storage Overview

| Bucket | Purpose | Access Level | Public Access |
|--------|---------|--------------|---------------|
| `images` | Project images, thumbnails, banners | Auth upload, Public read | Yes |

## Notes

- All tables include automatic `created_at` and `updated_at` timestamps
- Sample data is provided for immediate testing
- Indexes are created for optimal query performance
- Triggers automatically update `updated_at` on record changes
- Storage bucket is public for easy image serving on website