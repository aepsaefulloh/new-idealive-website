-- =============================================================================
-- CMS Content Tables Migration
-- =============================================================================
-- Description: Creates all CMS-related tables for dynamic content management
-- Tables: projects, hero_section, about_section, skills
-- Created: 2025-11-17
-- =============================================================================

-- =============================================================================
-- 1. TABLES CREATION
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Projects Table
-- -----------------------------------------------------------------------------
-- Stores portfolio projects with file uploads and metadata
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  overview TEXT,
  icon VARCHAR(10),
  thumbnail_url TEXT,
  banner_url TEXT,
  tags TEXT[], -- Array of technology tags
  features TEXT[], -- Array of project features
  year VARCHAR(4),
  role VARCHAR(100),
  duration VARCHAR(50),
  demo_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Hero Section Table
-- -----------------------------------------------------------------------------
-- Stores dynamic hero section content (single record expected)
CREATE TABLE IF NOT EXISTS hero_section (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- About Section Table
-- -----------------------------------------------------------------------------
-- Stores dynamic about me content (single record expected)
CREATE TABLE IF NOT EXISTS about_section (
  id SERIAL PRIMARY KEY,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Contact Info Table
-- -----------------------------------------------------------------------------
-- Stores dynamic contact information (single record expected)
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  phone VARCHAR(50),
  location VARCHAR(255),
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  dribbble_url TEXT,
  instagram_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- 2. INDEXES
-- =============================================================================

-- Projects indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);

-- =============================================================================
-- 3. ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 4. SECURITY POLICIES
-- =============================================================================

-- Projects policies
CREATE POLICY "Allow authenticated users to manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Content section policies
CREATE POLICY "Allow authenticated users to manage hero_section" ON hero_section
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage about_section" ON about_section
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage contact_info" ON contact_info
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================================================
-- 5. SAMPLE DATA
-- =============================================================================

-- Sample projects data
INSERT INTO projects (
  slug, title, description, overview, icon, tags, features, year, role, duration, featured, published
) VALUES
(
  'ecommerce-platform',
  'E-Commerce Platform',
  'Modern online shopping experience with real-time updates',
  'A comprehensive e-commerce solution featuring product management, shopping cart, secure payments, and order tracking. Built with performance and user experience in mind.',
  '🛒',
  ARRAY['Vue.js', 'Node.js', 'PostgreSQL', 'Stripe'],
  ARRAY['Real-time inventory updates', 'Secure payment processing with Stripe', 'Advanced product filtering and search', 'User authentication and profiles', 'Admin dashboard for management'],
  '2024',
  'Full Stack Developer',
  '3 months',
  true,
  true
),
(
  'task-management',
  'Task Management App',
  'Collaborative project management tool for teams',
  'A powerful task management application designed for teams to collaborate effectively. Features include real-time updates, drag-and-drop interfaces, and comprehensive project tracking.',
  '✅',
  ARRAY['React', 'TypeScript', 'Supabase'],
  ARRAY['Kanban-style boards', 'Real-time collaboration', 'Task assignments and due dates', 'File attachments and comments', 'Progress tracking and analytics'],
  '2024',
  'Frontend Developer',
  '2 months',
  true,
  true
),
(
  'portfolio-generator',
  'Portfolio Generator',
  'Create stunning portfolios in minutes',
  'An intuitive portfolio builder that allows creatives to showcase their work beautifully. Features customizable templates and smooth animations.',
  '🎨',
  ARRAY['Nuxt', 'Tailwind', 'GSAP'],
  ARRAY['Multiple template options', 'Drag-and-drop customization', 'Smooth GSAP animations', 'Responsive design', 'Export and share capabilities'],
  '2023',
  'Lead Developer',
  '2 months',
  false,
  true
);

-- Default hero section content
INSERT INTO hero_section (title, subtitle, description) VALUES
(
  'Hello World',
  'Building Modern Web Experiences',
  'Specialized in Vue.js, Nuxt, React, and modern JavaScript frameworks. Transforming creative ideas into pixel-perfect, responsive web applications.'
);

-- Default about section content
INSERT INTO about_section (bio) VALUES
(
  'I am a passionate web developer with expertise in creating modern, responsive web applications using Vue.js, Nuxt, React, and other cutting-edge technologies.'
);

-- Default contact information
INSERT INTO contact_info (email, phone, location, github_url, linkedin_url, twitter_url, dribbble_url) VALUES
(
  'hello@example.com',
  '+1 (234) 567-890',
  'San Francisco, CA',
  'https://github.com/username',
  'https://linkedin.com/in/username',
  'https://twitter.com/username',
  'https://dribbble.com/username'
);

-- =============================================================================
-- 6. TRIGGERS
-- =============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_section_updated_at BEFORE UPDATE ON hero_section
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_section_updated_at BEFORE UPDATE ON about_section
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- Migration completed successfully!
-- =============================================================================