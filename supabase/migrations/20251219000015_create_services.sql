-- 20251219000015_create_services.sql
-- Create service table (singular as requested)

CREATE TABLE IF NOT EXISTS service (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_num INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE service ENABLE ROW LEVEL SECURITY;

-- Policies

-- Public read access
CREATE POLICY "Public read service" ON service
  FOR SELECT USING (true);

-- Authenticated full access (for CMS admin)
CREATE POLICY "Authenticated full access service" ON service
  FOR ALL USING (auth.role() = 'authenticated');
