-- =============================================================================
-- Core Application Tables Migration
-- =============================================================================
-- Description: Creates core application tables for users and contact management
-- Tables: users, contact_messages
-- Created: 2025-11-17
-- =============================================================================

-- =============================================================================
-- 1. TABLES CREATION
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Users Table
-- -----------------------------------------------------------------------------
-- Extends Supabase auth.users with additional profile information
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Contact Messages Table
-- -----------------------------------------------------------------------------
-- Stores contact form submissions with reCAPTCHA verification
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  recaptcha_score DECIMAL(3,2),
  verification_status VARCHAR(50) DEFAULT 'verified',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- 2. INDEXES
-- =============================================================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Contact messages indexes
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

-- =============================================================================
-- 3. ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 4. SECURITY POLICIES
-- =============================================================================

-- Users table policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow authenticated users to manage users" ON users
  FOR ALL USING (auth.role() = 'authenticated');

-- Contact messages policies
CREATE POLICY "Anyone can create contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view all contact messages" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contact messages" ON contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete contact messages" ON contact_messages
  FOR DELETE USING (auth.role() = 'authenticated');

-- =============================================================================
-- 5. SAMPLE DATA
-- =============================================================================

-- Sample contact messages for testing (optional)
INSERT INTO contact_messages (
  name, email, subject, message, read, recaptcha_score, verification_status
) VALUES
(
  'John Doe',
  'john@example.com',
  'Website Inquiry',
  'Hello, I am interested in your services. Can you provide more information about your Vue.js development packages?',
  false,
  0.9,
  'verified'
),
(
  'Jane Smith',
  'jane@example.com',
  'Project Collaboration',
  'Hi there! I saw your portfolio and I think we could collaborate on a project. Let me know if you are interested.',
  true,
  0.8,
  'verified'
),
(
  'Bob Johnson',
  'bob@example.com',
  'Technical Question',
  'I have a question about your Nuxt.js implementation. How do you handle SEO optimization in your projects?',
  false,
  0.7,
  'verified'
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
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- Migration completed successfully!
-- =============================================================================