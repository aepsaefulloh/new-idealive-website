-- =============================================================================
-- 003 CMS - Hero Section
-- =============================================================================
-- Description: Dynamic hero section content
-- Dependencies: 001_foundation
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hero_section (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- RLS & Policies
-- -----------------------------------------------------------------------------
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read hero" ON hero_section
  FOR SELECT USING (true);

CREATE POLICY "Authenticated manage hero" ON hero_section
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- -----------------------------------------------------------------------------
-- Sample Data
-- -----------------------------------------------------------------------------
INSERT INTO hero_section (title, subtitle, description) VALUES
('Hello World', 'Building Modern Web Experiences', 
 'Specialized in Vue.js, Nuxt, React, and modern JavaScript frameworks.');

-- -----------------------------------------------------------------------------
-- Trigger
-- -----------------------------------------------------------------------------
CREATE TRIGGER update_hero_section_updated_at 
  BEFORE UPDATE ON hero_section
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
