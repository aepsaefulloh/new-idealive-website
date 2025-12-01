-- =============================================================================
-- 001 FOUNDATION - Core Functions & Utilities
-- =============================================================================
-- Description: Helper functions used across all tables
-- Created: 2025-11-17
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Timestamp Auto-Update Function
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';
