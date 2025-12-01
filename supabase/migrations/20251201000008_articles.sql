-- =============================================================================
-- 008 ARTICLES - Blog Articles
-- =============================================================================
-- Description: Blog articles with categories and author
-- Dependencies: 001_foundation, 006_categories
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT,
  thumbnail_url TEXT,
  banner_url TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  tags TEXT[],
  read_time INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Indexes
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);

-- -----------------------------------------------------------------------------
-- RLS & Policies
-- -----------------------------------------------------------------------------
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published articles" ON articles
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated manage articles" ON articles
  FOR ALL USING (auth.role() = 'authenticated');

-- -----------------------------------------------------------------------------
-- Sample Data
-- -----------------------------------------------------------------------------
INSERT INTO articles (slug, title, excerpt, tags, read_time, featured, published, published_at) VALUES
('getting-started-with-nuxt-3', 'Getting Started with Nuxt 3', 
 'Learn the basics of Nuxt 3 and build your first application.',
 ARRAY['Nuxt', 'Vue.js', 'JavaScript'], 5, true, true, NOW()),
('tailwind-css-tips', 'Tailwind CSS Tips for Faster Development',
 'Discover useful tips to speed up your workflow with Tailwind CSS.',
 ARRAY['Tailwind CSS', 'CSS', 'Frontend'], 3, false, true, NOW());

-- -----------------------------------------------------------------------------
-- Trigger
-- -----------------------------------------------------------------------------
CREATE TRIGGER update_articles_updated_at 
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- Helper Function
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION increment_article_views(article_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE articles SET views = views + 1 WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;
