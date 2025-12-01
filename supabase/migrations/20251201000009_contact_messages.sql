-- =============================================================================
-- 009 CONTACT - Contact Messages
-- =============================================================================
-- Description: Contact form submissions with reCAPTCHA
-- Dependencies: 001_foundation
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Table
-- -----------------------------------------------------------------------------
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

COMMENT ON COLUMN contact_messages.recaptcha_score IS 'reCAPTCHA v3 score (0.0-1.0)';
COMMENT ON COLUMN contact_messages.verification_status IS 'Status: verified, unverified, failed';

-- -----------------------------------------------------------------------------
-- Indexes
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_recaptcha_score ON contact_messages(recaptcha_score);

-- -----------------------------------------------------------------------------
-- RLS & Policies
-- -----------------------------------------------------------------------------
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert contact" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated read contact" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated update contact" ON contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated delete contact" ON contact_messages
  FOR DELETE USING (auth.role() = 'authenticated');

-- -----------------------------------------------------------------------------
-- Sample Data
-- -----------------------------------------------------------------------------
INSERT INTO contact_messages (name, email, subject, message, read, recaptcha_score) VALUES
('John Doe', 'john@example.com', 'Website Inquiry', 
 'Hello, I am interested in your services.', false, 0.9),
('Jane Smith', 'jane@example.com', 'Project Collaboration',
 'I think we could collaborate on a project.', true, 0.8);

-- -----------------------------------------------------------------------------
-- Trigger
-- -----------------------------------------------------------------------------
CREATE TRIGGER update_contact_messages_updated_at 
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
