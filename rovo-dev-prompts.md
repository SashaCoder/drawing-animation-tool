# course-001 — Rovo Dev prompt pack (generic Git hosting)

These prompts work with Bitbucket, GitHub, or GitLab.

---

## 0) Pick and generate an application Hello World scaffold
Pick one file from `course/application-prompts/` and paste its prompt into Rovo Dev.

Examples:
- Secondary 3D: `course/application-prompts/app-hello-world-secondary-3d-multiplayer-game.md`
- Graduate full-stack: `course/application-prompts/app-hello-world-graduate-enterprise-profile-manager.md`

---

## 1) Initialize Git + .gitignore + first commit + push to remote (YOUR PROVIDED PROMPT)

> Use this after you created a remote repo and cloned it OR you have a repo URL ready.

```text
I have created a repo at [git path ssh/https] can you please do the initial commit of the files in this directory with an appropriate .gitignore for the language options chosen?
```

If you want a more explicit version:

```text
I have created a repo at [git path ssh/https].

Please:
1) Detect the languages/frameworks in this directory (frontend/backend).
2) Create an appropriate .gitignore for macOS + Windows and common IDEs.
3) Initialize git if needed.
4) Create the initial commit message using Conventional Commits.
5) Add the remote (origin) if missing.
6) Push to the repo's default branch (whatever it is: main or master).

Assume I am in the project root.
Show me the exact commands you want me to run.
```

---

## 2) Create a new branch for the work

```text
I want to start work on a new objective.

Please:
1) Check what the default branch is called (main/master).
2) Create and checkout a new branch named: feature/[short-description]
3) Ensure it is based on the default branch and up-to-date.

Show the exact git commands.
```

---

## 3) Commit changes on the branch

```text
Generate a Conventional Commit message for my current changes.

Constraints:
- Keep subject <= 72 chars
- Include 2–4 bullet points in the body

Then show the exact commands to:
- git status
- git add
- git commit
```

---

## 4) Push the branch to remote

```text
Show the exact commands to push my current branch to origin.
Also tell me how to verify on the remote host (Bitbucket/GitHub/GitLab) that it exists.
```

---

## 5) PR description writer (optional but recommended)

```text
Write a pull request description.

Include:
- Summary (2–3 sentences)
- Why
- What changed (bullets)
- How to test (step-by-step)
- Risks / rollout notes

Input:
- Issue key/link: [optional]
- Changes: [describe]
```

---

## 6) Merge branch back to default (main/master)

```text
I want to merge my feature branch back to the default branch.

Please:
1) Tell me whether the repo default branch is main or master.
2) Show two options:
   A) Merge locally with git
   B) Merge via Pull Request (recommended)

For each option, provide:
- exact steps
- commands (if local)
- validation checks after merge
- how to delete the branch safely

Assume my branch is: feature/[short-description]
```

---

## 7) Merge conflict explainer

```text
Explain this merge conflict in plain language:

[paste conflict markers]

Then:
1) Propose the correct resolved file (show final code)
2) Explain why you chose that resolution
3) List 3 checks I should run before merging
```

---

## 8) .gitignore assistance (standalone)

```text
Create a .gitignore for a project that uses:
- Language/runtime: [Python/Java/C#/Node/etc]
- IDE: [VS Code/IntelliJ/Visual Studio]
- OS: macOS and Windows

Include common build artifacts, dependency folders, local env files, and secrets.
Explain any non-obvious entries.
```
