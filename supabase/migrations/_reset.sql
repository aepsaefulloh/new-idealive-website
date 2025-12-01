-- =============================================================================
-- 000 RESET - Drop All Tables & Functions
-- =============================================================================
-- ⚠️ WARNING: This will DELETE ALL DATA!
-- Run this before re-running migrations 001-010
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Drop Tables (in reverse dependency order)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS contact_info CASCADE;
DROP TABLE IF EXISTS about_section CASCADE;
DROP TABLE IF EXISTS hero_section CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- -----------------------------------------------------------------------------
-- Drop Functions
-- -----------------------------------------------------------------------------
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS get_categories_by_type(VARCHAR) CASCADE;
DROP FUNCTION IF EXISTS increment_article_views(INTEGER) CASCADE;

-- -----------------------------------------------------------------------------
-- Drop Storage
-- -----------------------------------------------------------------------------
DELETE FROM storage.objects WHERE bucket_id = 'images';
DELETE FROM storage.buckets WHERE id = 'images';

-- =============================================================================
-- Reset completed! Now run migrations 001-010 in order.
-- =============================================================================
