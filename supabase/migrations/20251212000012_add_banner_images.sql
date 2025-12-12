-- =============================================================================
-- 012 ADD BANNER IMAGES - Add banner_images array column
-- =============================================================================
-- Description: Add banner_images TEXT[] column to projects table for multiple banner support
-- Dependencies: 007_projects
-- =============================================================================

-- Add banner_images column to projects table
ALTER TABLE projects
ADD COLUMN banner_images TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Create index on banner_images for efficient queries
CREATE INDEX IF NOT EXISTS idx_projects_has_banner_images ON projects 
USING GIN (banner_images);

-- =============================================================================
-- Comment for documentation
-- =============================================================================
COMMENT ON COLUMN projects.banner_images IS 
'Array of banner image URLs for project gallery. Ordered list of WebP compressed images.';
