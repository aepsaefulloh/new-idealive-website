-- =============================================================================
-- 005 CMS - Contact Info
-- =============================================================================
-- Description: Dynamic contact information
-- Dependencies: 001_foundation
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  phone VARCHAR(50),
  location VARCHAR(255),
  facebook_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  dribbble_url TEXT,
  instagram_url TEXT,
  website_url TEXT,
  map_url TEXT,
  map_url_iframe TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- RLS & Policies
-- -----------------------------------------------------------------------------
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read contact info" ON contact_info
  FOR SELECT USING (true);

CREATE POLICY "Authenticated manage contact info" ON contact_info
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- -----------------------------------------------------------------------------
-- Sample Data
-- -----------------------------------------------------------------------------
INSERT INTO contact_info (email, phone, location, github_url, linkedin_url) VALUES
('hello@example.com', '+1 234 567 890', 'San Francisco, CA', 
 'https://github.com/username', 'https://linkedin.com/in/username');

-- -----------------------------------------------------------------------------
-- Trigger
-- -----------------------------------------------------------------------------
CREATE TRIGGER update_contact_info_updated_at 
  BEFORE UPDATE ON contact_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
