-- =============================================================================
-- 013 TEAM - Team Members
-- =============================================================================
-- Description: Team members with job details and divisions
-- Dependencies: 001_foundation
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS team (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  jobdesk VARCHAR(255) NOT NULL,
  job_description TEXT,
  division VARCHAR(100) NOT NULL,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Indexes
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_team_published ON team(published);
CREATE INDEX IF NOT EXISTS idx_team_division ON team(division);
CREATE INDEX IF NOT EXISTS idx_team_sort_order ON team(sort_order);

-- -----------------------------------------------------------------------------
-- RLS & Policies
-- -----------------------------------------------------------------------------
ALTER TABLE team ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published team" ON team
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated manage team" ON team
  FOR ALL USING (auth.role() = 'authenticated');

-- -----------------------------------------------------------------------------
-- Sample Data
-- -----------------------------------------------------------------------------
INSERT INTO team (fullname, jobdesk, job_description, division, sort_order, published) VALUES
('John Doe', 'Lead Developer', 'Experienced full-stack developer specializing in Vue.js and Node.js. Passionate about building scalable web applications.', 'Engineering', 1, true),
('Jane Smith', 'UI/UX Designer', 'Creative designer with 5+ years of experience in user interface and user experience design. Expert in Figma and Adobe Creative Suite.', 'Design', 2, true),
('Mike Johnson', 'Project Manager', 'Agile-certified project manager with expertise in leading cross-functional teams to deliver projects on time and within budget.', 'Management', 3, true);

-- -----------------------------------------------------------------------------
-- Trigger
-- -----------------------------------------------------------------------------
CREATE TRIGGER update_team_updated_at 
  BEFORE UPDATE ON team
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- Comment for documentation
-- -----------------------------------------------------------------------------
COMMENT ON TABLE team IS 'Team members information with job roles and divisions';
COMMENT ON COLUMN team.fullname IS 'Full name of the team member';
COMMENT ON COLUMN team.jobdesk IS 'Job title/position';
COMMENT ON COLUMN team.job_description IS 'Detailed description of role and responsibilities';
COMMENT ON COLUMN team.division IS 'Department or division (Engineering, Design, Management, etc.)';
COMMENT ON COLUMN team.image_url IS 'Profile photo URL';
COMMENT ON COLUMN team.sort_order IS 'Display order (lower numbers appear first)';
