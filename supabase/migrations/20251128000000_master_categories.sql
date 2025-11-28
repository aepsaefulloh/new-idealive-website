-- =============================================================================
-- Master Categories & Articles Migration
-- =============================================================================
-- Description: Creates master categories table and articles table
-- Tables: categories, articles
-- Created: 2025-11-28
-- =============================================================================

-- =============================================================================
-- 1. TABLES CREATION
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Categories Table (Master)
-- -----------------------------------------------------------------------------
-- Master table for all categories, can be used for projects, articles, etc.
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  type VARCHAR(50) DEFAULT 'general', -- Type: project, article, general (can be used for both)
  parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL, -- For subcategories
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Articles Table
-- -----------------------------------------------------------------------------
-- Stores blog articles/posts
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT, -- Short summary for previews
  content TEXT, -- Full article content (HTML/Markdown)
  thumbnail_url TEXT,
  banner_url TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  tags TEXT[], -- Array of tags
  read_time INTEGER DEFAULT 0, -- Estimated read time in minutes
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Add category_id to Projects Table
-- -----------------------------------------------------------------------------
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL;

-- =============================================================================
-- 2. INDEXES
-- =============================================================================

-- Categories indexes
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(sort_order);

-- Articles indexes
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);

-- Projects category index
CREATE INDEX IF NOT EXISTS idx_projects_category_id ON projects(category_id);

-- =============================================================================
-- 3. ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 4. SECURITY POLICIES
-- =============================================================================

-- Categories policies (Public read, authenticated write)
CREATE POLICY "Anyone can view active categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can manage categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Articles policies
CREATE POLICY "Anyone can view published articles" ON articles
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated users can manage articles" ON articles
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================================================
-- 5. SAMPLE DATA
-- =============================================================================

-- Insert default categories for projects
INSERT INTO categories (name, slug, description, type, sort_order) VALUES
-- Project Categories
('Web Development', 'web-development', 'Website and web application development projects', 'project', 1),
('Mobile App', 'mobile-app', 'Mobile application development for iOS and Android', 'project', 2),
('UI/UX Design', 'ui-ux-design', 'User interface and user experience design projects', 'project', 3),
('E-Commerce', 'e-commerce', 'Online store and e-commerce platform projects', 'project', 4),
('Backend Development', 'backend-development', 'Server-side and API development projects', 'project', 5),
('Full Stack', 'full-stack', 'Complete full-stack development projects', 'project', 6),

-- Article Categories
('Tutorial', 'tutorial', 'Step-by-step guides and tutorials', 'article', 10),
('Tips & Tricks', 'tips-tricks', 'Useful tips and tricks for developers', 'article', 11),
('Case Study', 'case-study', 'In-depth project case studies', 'article', 12),
('News', 'news', 'Latest news and updates', 'article', 13),
('Opinion', 'opinion', 'Opinion pieces and thoughts', 'article', 14),

-- General Categories (can be used for both)
('Technology', 'technology', 'Technology-related content', 'general', 20),
('Business', 'business', 'Business and entrepreneurship', 'general', 21),
('Creative', 'creative', 'Creative and artistic content', 'general', 22);

-- Sample articles
INSERT INTO articles (slug, title, excerpt, content, category_id, tags, read_time, featured, published, published_at) VALUES
(
  'getting-started-with-nuxt-3',
  'Getting Started with Nuxt 3',
  'Learn the basics of Nuxt 3 and build your first application with this comprehensive guide.',
  '<h2>Introduction</h2><p>Nuxt 3 is a powerful framework for building Vue.js applications. In this tutorial, we will explore the basics and get you started with your first Nuxt 3 project.</p><h2>Installation</h2><p>To create a new Nuxt 3 project, run the following command:</p><pre><code>npx nuxi init my-app</code></pre>',
  (SELECT id FROM categories WHERE slug = 'tutorial'),
  ARRAY['Nuxt', 'Vue.js', 'JavaScript', 'Web Development'],
  5,
  true,
  true,
  NOW()
),
(
  'tailwind-css-tips-for-faster-development',
  'Tailwind CSS Tips for Faster Development',
  'Discover useful tips and tricks to speed up your development workflow with Tailwind CSS.',
  '<h2>Why Tailwind CSS?</h2><p>Tailwind CSS is a utility-first CSS framework that allows you to build custom designs quickly without writing custom CSS.</p><h2>Tips</h2><ul><li>Use @apply for repeated patterns</li><li>Customize your config file</li><li>Use plugins for extended functionality</li></ul>',
  (SELECT id FROM categories WHERE slug = 'tips-tricks'),
  ARRAY['Tailwind CSS', 'CSS', 'Frontend', 'Tips'],
  3,
  false,
  true,
  NOW()
);

-- =============================================================================
-- 6. TRIGGERS
-- =============================================================================

-- Apply updated_at trigger to categories
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Apply updated_at trigger to articles
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- 7. HELPER FUNCTIONS
-- =============================================================================

-- Function to get categories by type
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

-- Function to increment article views
CREATE OR REPLACE FUNCTION increment_article_views(article_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE articles SET views = views + 1 WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- Migration completed successfully!
-- =============================================================================
