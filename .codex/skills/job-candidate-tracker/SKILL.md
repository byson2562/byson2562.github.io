---
name: job-candidate-tracker
description: Evaluate job postings for this user's job search, decide fit based on the user's current career criteria, update /Users/tnakamura/git/byson2562.github.io/候補企業リスト.md, and then run the local build command when the list changes.
---

# Job Candidate Tracker

Use this skill when the user:

- shares a job posting URL
- pastes a job description
- asks whether a company or role fits their job search
- asks to add or update a company in the candidate list

## Source of truth

The candidate list lives at:

- `/Users/tnakamura/git/byson2562.github.io/候補企業リスト.md`

Always update that file when the user asks to add or reflect a job posting.

## Evaluation policy

Evaluate postings against this user's current standing preferences:

- values business health, future potential, and management transparency more than strict `BtoB SaaS`
- prefers roles where application and infrastructure work overlap
- strongest fit is `Rails / AWS / ECS / Fargate` or adjacent backend + SRE work
- still interested in SRE / platform / CI/CD / operational improvement roles, but pure platform-specialist roles are usually a weaker fit
- prefers small to mid-size orgs with autonomy, but now also considers brand value and company name recognition as a meaningful positive factor
- wants to avoid strong SES / pure contract development / opaque management

## Required output when evaluating a posting

For each posting, determine:

1. company name
2. role name
3. priority group
4. short fit summary
5. short concern summary
6. next action
7. URL

Keep table text compact and consistent with existing entries.

## Update rules for 候補企業リスト.md

- Add a new row to the main table if the company is not present.
- Update the existing row if the company is already present and the new job posting adds better role detail.
- Keep the table sorted roughly by current priority group, not alphabetically.
- Use the existing group system in the file:
  - `第1群`
  - `第2群`
  - `第3群`
  - `第4群`
  - `保留`
- Respect the current file's group logic instead of reintroducing old rank labels.
- If a new posting materially changes fit, also update the lower summary sections that reference the company:
  - group membership lists
  - salary-band resort sections
  - any short notes that now need to match the new role framing

## Required post-update command

Whenever you modify `/Users/tnakamura/git/byson2562.github.io/候補企業リスト.md`, run this command afterward:

```bash
PATH="/opt/homebrew/opt/node@20/bin:$PATH" node build-pdf.mjs 職務経歴書.md
```

Notes:

- Run it from `/Users/tnakamura/git/byson2562.github.io`.
- With the current script behavior, this generates or refreshes the intermediate HTML and does not build a PDF unless `--pdf` is explicitly added.
- Mention in the user-facing response that you ran the command after updating the list.

## If the posting is hard to read

If the URL cannot be read well due to login or rendering limits:

- try alternate public sources first
- if still unclear, tell the user what could not be confirmed
- if enough is known to make a tentative judgment, mark it as tentative and explain the missing points
- if too little is known, ask the user to paste the job text or a screenshot

## Response style

- Give a short recommendation first.
- Mention the main fit and main concern.
- If the user asked to add it, confirm that `/Users/tnakamura/git/byson2562.github.io/候補企業リスト.md` was updated.
- If the file changed, also confirm that the post-update build command was run.
