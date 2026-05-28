---
alwaysApply: true
scene: git_message
---

Generate concise commit messages using Conventional Commits format.

Rules:
- Use format: <type>: <message>
- Keep commit message short and meaningful
- Use lowercase only
- Do not end with a period
- Use present tense verbs
- Focus on what changed

Allowed types:
- feat: for new features
- fix: for bug fixes
- docs: for documentation changes
- refactor: for code improvements without behavior change
- chore: for maintenance/config changes
- style: for formatting/UI styling
- perf: for performance improvements
- test: for adding or updating tests

Examples:
- feat: add jwt authentication
- fix: resolve product validation bug
- docs: add api documentation
- refactor: optimize redis caching logic
- chore: setup docker compose
