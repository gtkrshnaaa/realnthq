-- ============================================================================
-- realnthq: Database Initialization Script
-- Engine: PostgreSQL 15+
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Ensure timezone is strictly UTC
SET timezone = 'UTC';
