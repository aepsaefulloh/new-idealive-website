-- =============================================================================
-- 007 PROJECTS - Portfolio Projects
-- =============================================================================
-- Description: Portfolio projects with metadata
-- Dependencies: 001_foundation, 006_categories
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  overview TEXT,
  icon VARCHAR(10),
  thumbnail_url TEXT,
  banner_url TEXT,
  tags TEXT[],
  features TEXT[],
  year VARCHAR(4),
  role VARCHAR(100),
  duration VARCHAR(50),
  demo_url TEXT,
  github_url TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Indexes
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_category_id ON projects(category_id);

-- -----------------------------------------------------------------------------
-- RLS & Policies
-- -----------------------------------------------------------------------------
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published projects" ON projects
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- -----------------------------------------------------------------------------
-- Sample Data
-- -----------------------------------------------------------------------------
INSERT INTO projects (slug, title, description, icon, tags, year, role, featured, published) VALUES
('ecommerce-platform', 'E-Commerce Platform', 'Modern online shopping experience', '🛒',
 ARRAY['Vue.js', 'Node.js', 'PostgreSQL'], '2024', 'Full Stack Developer', true, true),
('task-management', 'Task Management App', 'Collaborative project management tool', '✅',
 ARRAY['React', 'TypeScript', 'Supabase'], '2024', 'Frontend Developer', true, true),
('portfolio-generator', 'Portfolio Generator', 'Create stunning portfolios', '🎨',
 ARRAY['Nuxt', 'Tailwind', 'GSAP'], '2023', 'Lead Developer', false, true);

-- -----------------------------------------------------------------------------
-- Trigger
-- -----------------------------------------------------------------------------
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
