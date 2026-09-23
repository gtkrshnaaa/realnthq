-- ============================================================================
-- realnthq: Initial Seed Data
-- ============================================================================

-- 1. Organization (Fictitious Development Organization)
INSERT INTO organizations (id, name, slug, domain)
VALUES ('a0000000-0000-0000-0000-000000000001', 'RealntHQ Dev Squad', 'realnthq-dev-squad', 'squad.realnthq.local')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, domain = EXCLUDED.domain;

-- 2. Users (Passwords: 'password123' bcrypt hash)
INSERT INTO users (id, organization_id, email, password_hash, full_name, display_title, role, status, status_message)
VALUES 
    ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'admin@squad.realnthq.local', '$2b$10$ep5Oq.7a7l0yUu3lGZ2EAu1h9E37.uJ3sM8lPsmv0sW6l2sYmJ4iK', 'Alex Vance', 'Head of Engineering', 'ADMIN', 'AVAILABLE', 'Reviewing PRs and architecture'),
    ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'sarah@squad.realnthq.local', '$2b$10$ep5Oq.7a7l0yUu3lGZ2EAu1h9E37.uJ3sM8lPsmv0sW6l2sYmJ4iK', 'Sarah Connor', 'Staff Product Designer', 'MEMBER', 'DEEP_WORK', 'Design system Figma sprint'),
    ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'kenji@squad.realnthq.local', '$2b$10$ep5Oq.7a7l0yUu3lGZ2EAu1h9E37.uJ3sM8lPsmv0sW6l2sYmJ4iK', 'Kenji Sato', 'Distributed Systems Lead', 'MEMBER', 'AVAILABLE', 'Pairing on WebRTC signaling')
ON CONFLICT (email) DO NOTHING;

-- 3. Campus
INSERT INTO campuses (id, organization_id, name, slug, timezone)
VALUES ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'RealntHQ Digital Campus', 'hq-main', 'UTC')
ON CONFLICT DO NOTHING;

-- 4. Floors
INSERT INTO floors (id, campus_id, floor_number, name, grid_width, grid_height)
VALUES 
    ('d0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 1, 'Lobby & Community Commons', 40, 30),
    ('d0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 2, 'Engineering & Product Floor', 40, 30),
    ('d0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 3, 'Executive & Focus Library', 40, 30)
ON CONFLICT DO NOTHING;

-- 5. Zones on Floor 2
INSERT INTO zones (id, floor_id, name, zone_type, bounding_box, color_code)
VALUES 
    ('e0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000002', 'Core Engineering Pods', 'OPEN_DESK', '{"x": 2, "y": 2, "w": 18, "h": 14}', '#5a8357'),
    ('e0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'Architecture Huddle Hub', 'MEETING', '{"x": 22, "y": 2, "w": 16, "h": 10}', '#252724'),
    ('e0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000002', 'Silent Focus Alcove', 'QUIET_POD', '{"x": 22, "y": 14, "w": 16, "h": 14}', '#668c63')
ON CONFLICT DO NOTHING;

-- 6. Rooms
INSERT INTO rooms (id, floor_id, zone_id, name, room_type, capacity)
VALUES 
    ('f0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 'Turing War Room', 'HUDDLE', 6),
    ('f0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 'Lovelace Sync Hub', 'CONFERENCE', 12),
    ('f0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000001', NULL, 'Virtual Coffee Bar', 'WATERCOOLER', 20)
ON CONFLICT DO NOTHING;

-- 7. Desks
INSERT INTO desks (id, floor_id, zone_id, desk_label, pos_x, pos_y, desk_type, assigned_user_id, current_occupant_id)
VALUES 
    ('10000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'ENG-01', 4, 4, 'DEDICATED', 'b0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001'),
    ('10000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'ENG-02', 6, 4, 'DEDICATED', 'b0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002'),
    ('10000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000000', 'ENG-03', 8, 4, 'HOT_DESK', NULL, 'b0000000-0000-0000-0000-000000000003'),
    ('10000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000000', 'HOT-01', 4, 8, 'HOT_DESK', NULL, NULL),
    ('10000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000000', 'HOT-02', 6, 8, 'HOT_DESK', NULL, NULL)
ON CONFLICT DO NOTHING;

-- 8. Sample Room Artifact
INSERT INTO room_artifacts (room_id, author_id, title, content_markdown, artifact_type)
VALUES (
    'f0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    'Sprint 42 Architecture Decisions',
    '## Decision Register: Real-Time Quadtree Sharding\n\n- **Context**: Scaling past 1,000 active participants on campus 1.\n- **Decision**: Adopt quadtree room-level spatial bucketing.\n- **Impact**: Network egress reduced by 84%.',
    'DECISION_LOG'
)
ON CONFLICT DO NOTHING;
