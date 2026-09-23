# Database Schemas and Migration Architecture

## Directory Overview
This directory contains SQL schemas, DDL declarations, and seed datasets for the PostgreSQL database backing `realnthq`.

## File Structure
- `01_init.sql`: Sets timezone to UTC and enables required PostgreSQL extensions (`uuid-ossp`, `pgcrypto`, `citext`).
- `02_tables.sql`: Relational table definitions, constraints, checks, foreign keys, and indexes.
- `03_seed.sql`: Initial seed data providing an organization, campus floors, engineering pods, meeting rooms, and desk assignments.

## Manual Migration / Execution
To run these files directly against a target PostgreSQL instance:
```bash
psql -h localhost -U postgres -d realnthq -f 01_init.sql
psql -h localhost -U postgres -d realnthq -f 02_tables.sql
psql -h localhost -U postgres -d realnthq -f 03_seed.sql
```
In containerized environments, these files are mounted into `/docker-entrypoint-initdb.d/` for automatic bootstrap.
