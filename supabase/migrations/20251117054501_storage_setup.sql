-- =============================================================================
-- Storage Setup Migration
-- =============================================================================
-- Description: Creates Supabase Storage bucket for project images and thumbnails
-- Bucket: images (public bucket for project assets)
-- Created: 2025-11-17
-- =============================================================================

-- =============================================================================
-- 1. STORAGE BUCKET CREATION
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Images Bucket
-- -----------------------------------------------------------------------------
-- Public bucket for storing project thumbnails, banners, and other images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- 2. STORAGE POLICIES
-- =============================================================================

-- Allow authenticated users to upload images
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow public access to view images (since bucket is public)
DROP POLICY IF EXISTS "Allow public access to images" ON storage.objects;
CREATE POLICY "Allow public access to images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to update their uploaded images
DROP POLICY IF EXISTS "Allow authenticated users to update their images" ON storage.objects;
CREATE POLICY "Allow authenticated users to update their images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their uploaded images
DROP POLICY IF EXISTS "Allow authenticated users to delete their images" ON storage.objects;
CREATE POLICY "Allow authenticated users to delete their images" ON storage.objects
  FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- =============================================================================
-- 3. FOLDER ORGANIZATION POLICIES
-- =============================================================================

-- Optional: Organize images in projects folder for better structure
-- This policy helps maintain folder structure for project-related images
DROP POLICY IF EXISTS "Allow project images in projects folder" ON storage.objects;
CREATE POLICY "Allow project images in projects folder" ON storage.objects
  FOR ALL USING (bucket_id = 'images' AND (storage.foldername(name))[1] = 'projects');

-- =============================================================================
-- Migration completed successfully!
-- =============================================================================

-- =============================================================================
-- USAGE NOTES:
-- =============================================================================
-- - Bucket 'images' is public, so images can be accessed directly via URL
-- - Upload path examples:
--   * projects/thumbnails/project-slug.jpg
--   * projects/banners/project-slug.jpg
--   * hero/background.jpg
-- - All uploads require authentication
-- - Public read access for displaying images on website
-- =============================================================================
