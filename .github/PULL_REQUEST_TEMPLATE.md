## Pull Request Summary

### 1. High-Density Description
* **Root Cause / Context**:
* **Technical Solution**:
* **Impact**:

---

## 2. Type of Change
- [ ] `feat`: New feature or user capability
- [ ] `fix`: Bug fix
- [ ] `docs`: Documentation addition or update
- [ ] `refactor`: Code reorganization without functional change
- [ ] `perf`: Performance optimization
- [ ] `test`: New or modified test suites
- [ ] `chore`: Tooling, CI, or dependency update

---

## 3. Related Issue(s)
* Closes #

---

## 4. Engineering Quality Checklist
- [ ] My PR targets the `devv` branch (not `main`).
- [ ] Changes adhere to **Semantic Atomic Architecture** (~150-line soft cap per file, Single Responsibility File, co-located DTOs/contracts).
- [ ] Strictly zero emojis and zero em dashes across all code, markup, comments, commit messages, and PR description.
- [ ] UI changes comply with the **Warm Editorial Light** default design system (`#fbfbfa` canvas, Plus Jakarta Sans headlines, Inter / DM Sans UI, solid obsidian buttons, 1px hairlines, themed form controls).
- [ ] Backend changes avoid passive error swallowing (`catch (e) {}`), N+1 queries, and speculative abstractions.
- [ ] Granular in-stride micro-commits preserved in git history (zero diff hoarding).
- [ ] Automated tests and builds pass cleanly:
  - [ ] `cd client && npm run build`
  - [ ] `cd server && npm run build`
  - [ ] `cd tests && ./run_tests.sh`
