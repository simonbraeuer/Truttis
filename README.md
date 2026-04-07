# Truttis

Homepage für den Truttistammtisch

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

## About

A club home page built with:

| Technology | Purpose |
|---|---|
| **Angular 19** (standalone components) | Frontend SPA |
| **SCSS** | Styles |
| **Nx** (no cloud) | Monorepo tooling |
| **NgRx** | State management |
| **Supabase** | Backend (auth + database) |
| **Jest** | Unit testing |
| **Playwright** | End-to-end testing |

## Workspace structure

```
apps/
  truttis/           ← Angular SPA (routing, app shell, NgRx setup)
  truttis-e2e/       ← Playwright e2e tests

libs/
  core-ui/           ← Shared dumb UI components            (type:ui)
  core-api/          ← SupabaseService (reads URL/key from localStorage) (type:api)
  api/               ← Domain-specific backend clients       (type:api)
  feature-auth/      ← Login, NgRx auth state, authGuard    (type:feature)
  feature-settings/  ← Settings page — configure Supabase connection (type:feature)
  feature-meetings/  ← Meeting model, RSVP, meetings list   (type:feature)
  feature-dashboard/ ← 4-tile dashboard                     (type:feature)
  feature-users/     ← Admin-only user management           (type:feature)
```

## Module boundary rules

Enforced by `@nx/enforce-module-boundaries` ESLint rule:

| Tag | May import from |
|---|---|
| `type:api` | `type:api` only |
| `type:ui` | `type:ui` only |
| `type:core` | `type:api`, `type:ui`, `type:core` |
| `type:feature` | `type:api`, `type:ui`, `type:core`, `type:feature` |

## Running the app

```sh
# Development server
npx nx serve truttis

# Production build
npx nx build truttis

# Unit tests (Jest)
npx nx test <project>

# E2e tests (Playwright)
npx nx e2e truttis-e2e

# Lint all projects
npx nx run-many --target=lint --all
```

## Configuration (Settings page)

The **Settings** page (`/settings`) is accessible **without logging in** so members can configure the backend before signing in.

Enter:
- **Supabase URL** — your project URL (e.g. `https://xyz.supabase.co`)
- **Supabase Anon Key** — your project's public anon key

Values are stored in `localStorage` — the backend details are never hardcoded, keeping the connection hidden from non-members.

## Domain features

- **Login** — email + password via Supabase Auth
- **Dashboard** — 4 tiles:
  - 📅 Calendar — upcoming meetings preview
  - 📊 Statistics — this year's attendance
  - ✅ RSVP — respond to next meeting (Attend / Decline / Maybe)
  - 🎉 Flashback — impressions of the last meeting
- **Meetings** — admins/organizers create meetings (date, location, address, description, photos, links, attendees + RSVP)
- **Users** — admin-only member management
- **Settings** — Supabase connection config (no auth required)
