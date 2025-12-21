-- =============================================================================
-- 004 CMS - About Section
-- =============================================================================
-- Description: Dynamic about me content
-- Dependencies: 001_foundation
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS about_section (
  id SERIAL PRIMARY KEY,
  bio TEXT,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- RLS & Policies
-- -----------------------------------------------------------------------------
ALTER TABLE about_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read about" ON about_section
  FOR SELECT USING (true);

CREATE POLICY "Authenticated manage about" ON about_section
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- -----------------------------------------------------------------------------
-- Sample Data
-- -----------------------------------------------------------------------------
INSERT INTO about_section (bio, description) VALUES
('I am a passionate web developer with expertise in creating modern, responsive web applications.',
 'I am a passionate web developer with expertise in creating modern, responsive web applications.');

-- -----------------------------------------------------------------------------
-- Trigger
-- -----------------------------------------------------------------------------
CREATE TRIGGER update_about_section_updated_at 
  BEFORE UPDATE ON about_section
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
