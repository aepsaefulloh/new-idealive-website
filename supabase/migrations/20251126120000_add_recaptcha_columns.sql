-- Add reCAPTCHA columns to contact_messages table
-- Migration: Add reCAPTCHA score and verification status columns

ALTER TABLE contact_messages
ADD COLUMN IF NOT EXISTS recaptcha_score DECIMAL(3,2),
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'unverified';

-- Add comments for documentation
COMMENT ON COLUMN contact_messages.recaptcha_score IS 'reCAPTCHA v3 score (0.0 to 1.0, higher = more likely human)';
COMMENT ON COLUMN contact_messages.verification_status IS 'Verification status: verified, unverified, failed';

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_recaptcha_score ON contact_messages(recaptcha_score);
CREATE INDEX IF NOT EXISTS idx_contact_messages_verification_status ON contact_messages(verification_status);