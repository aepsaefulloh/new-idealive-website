-- =============================================================================
-- 010 STORAGE - Images Bucket
-- =============================================================================
-- Description: Supabase Storage bucket for images
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Create Bucket
-- -----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- Policies
-- -----------------------------------------------------------------------------

-- Public read
DROP POLICY IF EXISTS "Public read images" ON storage.objects;
CREATE POLICY "Public read images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

-- Authenticated upload
DROP POLICY IF EXISTS "Authenticated upload images" ON storage.objects;
CREATE POLICY "Authenticated upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Authenticated update
DROP POLICY IF EXISTS "Authenticated update images" ON storage.objects;
CREATE POLICY "Authenticated update images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Authenticated delete
DROP POLICY IF EXISTS "Authenticated delete images" ON storage.objects;
CREATE POLICY "Authenticated delete images" ON storage.objects
  FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- =============================================================================
-- USAGE:
-- - projects/thumbnails/slug.jpg
-- - projects/banners/slug.jpg
-- - articles/thumbnails/slug.jpg
-- - hero/background.jpg
-- =============================================================================
