-- ============================================================================
-- realnthq: Relational Schema Definition
-- Engine: PostgreSQL 15+
-- ============================================================================

-- Organizations
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(64) UNIQUE NOT NULL,
    domain VARCHAR(255),
    settings JSONB DEFAULT '{"max_floors": 10, "media_topology": "sfu"}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    email CITEXT UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    display_title VARCHAR(120),
    avatar_url VARCHAR(500),
    role VARCHAR(32) DEFAULT 'MEMBER' CHECK (role IN ('OWNER', 'ADMIN', 'FLOOR_MANAGER', 'MEMBER', 'GUEST')),
    status VARCHAR(32) DEFAULT 'OFFLINE' CHECK (status IN ('AVAILABLE', 'DEEP_WORK', 'IN_MEETING', 'AWAY', 'OFFLINE')),
    status_message VARCHAR(160),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Headquarters / Office Locations
CREATE TABLE IF NOT EXISTS headquarters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(64) NOT NULL,
    timezone VARCHAR(64) DEFAULT 'UTC',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_headquarters_slug_per_org UNIQUE (organization_id, slug)
);

-- Floors
CREATE TABLE IF NOT EXISTS floors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    headquarters_id UUID NOT NULL REFERENCES headquarters(id) ON DELETE CASCADE,
    floor_number INT NOT NULL,
    name VARCHAR(120) NOT NULL,
    grid_width INT DEFAULT 40,
    grid_height INT DEFAULT 30,
    layout_config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_floor_number_per_hq UNIQUE (headquarters_id, floor_number)
);

-- Zones
CREATE TABLE IF NOT EXISTS zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    floor_id UUID NOT NULL REFERENCES floors(id) ON DELETE CASCADE,
    name VARCHAR(80) NOT NULL,
    zone_type VARCHAR(32) DEFAULT 'OPEN_DESK' CHECK (zone_type IN ('OPEN_DESK', 'QUIET_POD', 'MEETING', 'LOUNGE', 'BOARDROOM')),
    bounding_box JSONB NOT NULL, -- { "x": 0, "y": 0, "w": 10, "h": 10 }
    color_code VARCHAR(16) DEFAULT '#5a8357',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Rooms
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    floor_id UUID NOT NULL REFERENCES floors(id) ON DELETE CASCADE,
    zone_id UUID REFERENCES zones(id) ON DELETE SET NULL,
    name VARCHAR(80) NOT NULL,
    room_type VARCHAR(32) DEFAULT 'HUDDLE' CHECK (room_type IN ('HUDDLE', 'CONFERENCE', 'WATERCOOLER', 'WORKSHOP')),
    capacity INT DEFAULT 8,
    is_locked BOOLEAN DEFAULT FALSE,
    active_meeting_id VARCHAR(120),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Desks
CREATE TABLE IF NOT EXISTS desks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    floor_id UUID NOT NULL REFERENCES floors(id) ON DELETE CASCADE,
    zone_id UUID REFERENCES zones(id) ON DELETE SET NULL,
    desk_label VARCHAR(32) NOT NULL,
    pos_x INT NOT NULL,
    pos_y INT NOT NULL,
    desk_type VARCHAR(32) DEFAULT 'HOT_DESK' CHECK (desk_type IN ('DEDICATED', 'HOT_DESK')),
    assigned_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    current_occupant_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_desk_pos_per_floor UNIQUE (floor_id, pos_x, pos_y)
);

-- Knocks
CREATE TABLE IF NOT EXISTS knocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    to_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    desk_id UUID REFERENCES desks(id) ON DELETE SET NULL,
    status VARCHAR(32) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACCEPTED', 'BUSY', 'LATER', 'EXPIRED')),
    message VARCHAR(255),
    responded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Room Artifacts
CREATE TABLE IF NOT EXISTS room_artifacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(180) NOT NULL,
    content_markdown TEXT NOT NULL,
    artifact_type VARCHAR(32) DEFAULT 'DECISION_LOG' CHECK (artifact_type IN ('DECISION_LOG', 'STANDUP_NOTE', 'SCRATCHPAD')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Presence Log (Audit & Activity)
CREATE TABLE IF NOT EXISTS presence_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    floor_id UUID NOT NULL REFERENCES floors(id) ON DELETE CASCADE,
    desk_id UUID REFERENCES desks(id) ON DELETE SET NULL,
    started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_heartbeat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMPTZ
);

-- Strategic Indexes
CREATE INDEX IF NOT EXISTS idx_users_org_status ON users(organization_id, status);
CREATE INDEX IF NOT EXISTS idx_desks_floor ON desks(floor_id);
CREATE INDEX IF NOT EXISTS idx_rooms_floor ON rooms(floor_id);
CREATE INDEX IF NOT EXISTS idx_knocks_to_user ON knocks(to_user_id, status);
CREATE INDEX IF NOT EXISTS idx_presence_user_active ON presence_sessions(user_id, ended_at);
