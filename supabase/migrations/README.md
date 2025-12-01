# Database Migrations

Supabase database migrations untuk portfolio CMS application.

## 📁 Structure

```
migrations/
├── _reset.sql                        # ⚠️ Reset manual (tidak auto-run)
├── 20251201000001_foundation.sql     # Core helper functions
├── 20251201000002_auth_users.sql     # Users table
├── 20251201000003_cms_hero.sql       # Hero section
├── 20251201000004_cms_about.sql      # About section
├── 20251201000005_cms_contact_info.sql # Contact info
├── 20251201000006_categories.sql     # Master categories
├── 20251201000007_projects.sql       # Portfolio projects
├── 20251201000008_articles.sql       # Blog articles
├── 20251201000009_contact_messages.sql # Contact form
├── 20251201000010_storage.sql        # Storage bucket
└── README.md
```

## 🔄 Reset & Re-migrate

Untuk reset database dan migration ulang:

1. Buka **Supabase Dashboard** → **SQL Editor**
2. Jalankan isi `_reset.sql` (⚠️ akan hapus semua data!)
3. Repair migrations: `npx supabase migration repair --status reverted <timestamps>`
4. Push ulang: `npx supabase db push`

## 🚀 Push Migrations

```bash
# Cek status
npx supabase migration list

# Push ke remote
npx supabase db push
```

## 🔢 Execution Order

| # | File | Description | Dependencies |
|---|------|-------------|--------------|
| 1 | `foundation` | Helper functions | - |
| 2 | `auth_users` | Users table | 1 |
| 3 | `cms_hero` | Hero section | 1 |
| 4 | `cms_about` | About section | 1 |
| 5 | `cms_contact_info` | Contact info | 1 |
| 6 | `categories` | Categories | 1 |
| 7 | `projects` | Projects | 1, 6 |
| 8 | `articles` | Articles | 1, 6 |
| 9 | `contact_messages` | Contact form | 1 |
| 10 | `storage` | Storage bucket | - |

## 🚀 How to Run

### Supabase Dashboard
1. Open SQL Editor
2. Run migrations in order (001 → 010)

### Supabase CLI
```bash
npx supabase db reset --local
npx supabase migration up
```

## 📊 Tables

| Table | Public Read | Public Insert | Auth Required |
|-------|-------------|---------------|---------------|
| `users` | Own only | ❌ | ✅ |
| `hero_section` | ✅ | ❌ | ✅ |
| `about_section` | ✅ | ❌ | ✅ |
| `contact_info` | ✅ | ❌ | ✅ |
| `categories` | Active only | ❌ | ✅ |
| `projects` | Published | ❌ | ✅ |
| `articles` | Published | ❌ | ✅ |
| `contact_messages` | ❌ | ✅ | ✅ |

## 📦 Storage

| Bucket | Public Read | Auth Upload |
|--------|-------------|-------------|
| `images` | ✅ | ✅ |
| `images` | Project images, thumbnails, banners | Auth upload, Public read | Yes |

## Notes

- All tables include automatic `created_at` and `updated_at` timestamps
- Sample data is provided for immediate testing
- Indexes are created for optimal query performance
- Triggers automatically update `updated_at` on record changes
- Storage bucket is public for easy image serving on website