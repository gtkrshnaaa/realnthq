# Contributing to realntoffice

Thank you for your interest in contributing to `realntoffice`. As an open-source virtual office platform designed for teams from 2-person startups to 10,000+ member enterprises, we uphold strict architectural discipline, engineering craftsmanship, and high-standard code quality.

Please read this document carefully before submitting issues or pull requests.

---

## 1. Core Engineering Principles

Every contribution must align with our foundational engineering principles:

### 1.1 Semantic Atomic Architecture
* **Single Responsibility File (SRF)**: Each file must represent one singular conceptual unit (one class, one action, one UI component, one DTO, or one interface). Monolithic dumping grounds (e.g., `utils.ts`, `helpers.ts`, `common.ts`) are strictly prohibited.
* **~150-Line Soft Cap**: When a file approaches or exceeds ~150 lines of code, refactor and decompose it into co-located child components, actions, or sub-modules.
* **Co-Located Contracts**: Place data types, DTOs, and validation schemas directly alongside their logical unit (e.g., `modules/rooms/dto/create-room.dto.ts` beside `rooms.service.ts`).
* **Path Aliases**: Always use `@/*` semantic path aliases. Deep relative traversals (`../../../../`) are prohibited.

### 1.2 Anti-AI-Slop Craftsmanship
* **UI/UX Standards**: Interfaces must meet the engineering benchmarks of Linear, Figma, and Raycast. Neon purple gradients, floating centered bubbles, unstyled native checkboxes, and unscaled typography are banned.
* **Default Design Baseline**: All UI components must adhere to the **Warm Editorial Light** design system (`#fbfbfa` canvas, Fraunces serif headlines, DM Sans UI text, solid obsidian `#252724` buttons, 1px hairline borders `border-black/8`, themed inputs, and soft sage accents).
* **Zero Emojis Policy**: Raw emojis are strictly banned across source code, UI/UX, markup, filenames, commit messages, documentation, and PR discussions. Use clean, scalable SVGs or professional icon packages (Lucide).
* **Zero Em Dash Policy**: Em dashes are banned across all artifacts. Use standard hyphens ("-"), colons (":"), or standard parentheses.
* **Backend Discipline**: Passive error swallowing (`catch (e) {}`), speculative abstraction layers, unoptimized N+1 queries, and conversational AI comments (`// In a real application...`) are prohibited.

### 1.3 Right Flows vs. Anti-Patterns
* Contributions must adhere to the patterns defined in `docs/RIGHT_AND_ANTI_PATTERNS.md`:
  * Ambient spatial presence over surveillance spyware.
  * Organic soft knocks over forced audio drop-ins.
  * Spatial quadtree and room-scoped channels over global WebSocket broadcasts.
  * Decoupled media SFU nodes over co-hosted in-process audio/video transcoding.
  * Async-first room journals over ephemeral black-hole meetings.

---

## 2. Git Workflow and Branching Strategy

We enforce a strict branch lifecycle to protect trunk stability and auditability:

```text
main (Production Releases)
  ▲
  │ (Fast-forward or Squash Merge after approval)
  │
devv (Active Integration Trunk)
  ▲
  │ (Feature PRs branch and merge here)
  │
feat/your-feature-name (Your working branch)
```

1. **Target Branch**: All pull requests must branch from and target `devv`. Never submit pull requests directly against `main`.
2. **Immediate In-Stride Micro-Commits (Zero Diff Hoarding)**:
   * Do not accumulate massive diffs across dozens of files and commit them post-facto.
   * Work in an interleaved loop: `Task -> Test/Verify -> COMMIT -> Next Task`.
   * Keep each commit atomic, focused on one logical unit (one method, one DTO, or one component).
3. **Conventional Commit Standard**:
   All commit messages must be in English and follow conventional commit prefixes:
   * `feat(scope): ...` for new features
   * `fix(scope): ...` for bug fixes
   * `docs(scope): ...` for documentation additions or corrections
   * `refactor(scope): ...` for structural refactoring without behavior change
   * `test(scope): ...` for adding or improving test suites
   * `chore(scope): ...` for dependency updates or build tooling

---

## 3. Development Setup

### 3.1 Prerequisites
* Node.js v20+ and npm v10+
* Docker and Docker Compose v2.20+
* PostgreSQL 16+ (or run via Docker container)

### 3.2 Local Quickstart
1. Clone the repository:
   ```bash
   git clone https://github.com/gtkrshnaaa/realntoffice.git
   cd realntoffice
   git checkout devv
   ```
2. Launch containerized environment:
   ```bash
   ./deployment/deploy.sh
   ```
3. Or start local processes manually:
   ```bash
   # Server (NestJS on port 4000)
   cd server && npm install && npm run start:dev

   # Client (Next.js on port 3000)
   cd client && npm install && npm run dev
   ```

---

## 4. Testing and Quality Verification

Before submitting a pull request, all automated checks must pass:

1. **Client Build and Typecheck**:
   ```bash
   cd client && npm run build
   ```
2. **Server Build and Lint**:
   ```bash
   cd server && npm run build
   ```
3. **Integration and E2E Tests**:
   ```bash
   cd tests && ./run_tests.sh
   ```

Pull requests with failing builds, unhandled TypeScript errors, or broken tests will not be reviewed.

---

## 5. Pull Request Submission Checklist

When opening a Pull Request:
1. Ensure the PR title follows conventional commit syntax (`feat(rooms): add persistent whiteboard sync`).
2. Fill out the full PR template provided in `.github/PULL_REQUEST_TEMPLATE.md`.
3. Provide a clear technical explanation: *Root Cause -> Technical Solution -> Impact*.
4. Verify that zero emojis and zero em dashes are present in your code, diff, or description.
5. Ensure your branch is rebased cleanly on the latest `origin/devv`.

Thank you for helping build the future of remote work with `realntoffice`.
