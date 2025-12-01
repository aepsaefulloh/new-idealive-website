-- =============================================================================
-- 006 CATEGORIES - Master Categories
-- =============================================================================
-- Description: Master categories for projects, articles, etc
-- Dependencies: 001_foundation
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  type VARCHAR(50) DEFAULT 'general', -- project, article, general
  parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Indexes
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);

-- -----------------------------------------------------------------------------
-- RLS & Policies
-- -----------------------------------------------------------------------------
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated manage categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated');

-- -----------------------------------------------------------------------------
-- Sample Data
-- -----------------------------------------------------------------------------
INSERT INTO categories (name, slug, description, type, sort_order) VALUES
-- Project Categories
('Web Development', 'web-development', 'Web application projects', 'project', 1),
('Mobile App', 'mobile-app', 'Mobile development projects', 'project', 2),
('UI/UX Design', 'ui-ux-design', 'Design projects', 'project', 3),
('E-Commerce', 'e-commerce', 'E-commerce projects', 'project', 4),
-- Article Categories
('Tutorial', 'tutorial', 'Step-by-step guides', 'article', 10),
('Tips & Tricks', 'tips-tricks', 'Useful tips', 'article', 11),
('Case Study', 'case-study', 'Project case studies', 'article', 12);

-- -----------------------------------------------------------------------------
-- Trigger
-- -----------------------------------------------------------------------------
CREATE TRIGGER update_categories_updated_at 
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- Helper Function
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_categories_by_type(category_type VARCHAR DEFAULT NULL)
RETURNS SETOF categories AS $$
BEGIN
  IF category_type IS NULL THEN
    RETURN QUERY SELECT * FROM categories WHERE is_active = true ORDER BY sort_order;
  ELSE
    RETURN QUERY SELECT * FROM categories WHERE type = category_type AND is_active = true ORDER BY sort_order;
  END IF;
END;
$$ LANGUAGE plpgsql;
