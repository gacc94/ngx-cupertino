## 1. Create CONTRIBUTING.md — Header & Git Workflow

- [x] 1.1 Create `CONTRIBUTING.md` at repo root
- [x] 1.2 Write project heading: `# Contributing to @ngx-cupertino/ui`
- [x] 1.3 Write Git Workflow section with mandatory rule: one branch per change, never work directly on main
- [x] 1.4 Add explicit example workflow: `git checkout main && git pull && git checkout -b <prefix>/<name>`

## 2. Write CONTRIBUTING.md — Conventions & Process

- [x] 2.1 Write Branch Naming section with table (feat/, fix/, chore/, docs/, refactor/, test/)
- [x] 2.2 Write Commit Conventions section with 10-type table (type, emoji, semver) and 8 allowed scopes
- [x] 2.3 Write Pull Request Process section (5 steps, squash merge, CI required)

## 3. Write CONTRIBUTING.md — Setup & Structure

- [x] 3.1 Write Development Setup section with clone, bun install, serve, build, test, biome commands
- [x] 3.2 Write Project Structure section with tree diagram
- [x] 3.3 Write Package Architecture section with npm registry diagram and Angular Material comparison
- [x] 3.4 Write Protected Branches section with full step-by-step configuration guide (Settings → Rules → Rulesets → protect-main ruleset)
- [x] 3.5 Write Merge Options section documenting manual merge (current) vs auto-merge (future) with recommendation table
- [x] 3.6 Write Questions section with links to issues and discussions

## 4. Add Mermaid Diagrams

- [x] 4.1 Add CI Pipeline Flow Mermaid diagram (flowchart LR: PR → commitlint/format/typecheck/build → test → pass/fail)
- [x] 4.2 Add Release Pipeline Flow Mermaid diagram (flowchart TB: push → Release Please → scan commits → release PR → merge → tags per package)
- [x] 4.3 Add Git Workflow gitGraph diagram (feature branches + commits + merges)

## 5. Final Verification

- [x] 5.1 Verify `CONTRIBUTING.md` exists at repo root
- [x] 5.2 Verify all sections are present (Git Workflow with branch-per-change rule, Branch Naming, Commits, PR Process, Dev Setup, Project Structure, Package Architecture, Protected Branches with setup guide, Merge Options)
- [x] 5.3 Verify all 3 Mermaid diagrams render correctly in GitHub preview
- [x] 5.4 Run `bun biome check --write CONTRIBUTING.md` to ensure formatting
- [x] 5.5 Commit: `git add . && git commit -m "docs: 📝 add CONTRIBUTING.md with Git workflow and PR process"`
