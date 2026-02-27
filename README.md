# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Environment variables

This project includes a `.env.template` file at the repository root. To provide local configuration:

- Copy `.env.template` to `.env`:

	cp .env.template .env

- Edit `.env` and fill in values. Note: Vite only exposes variables starting with the `VITE_` prefix to the client.

- Do NOT commit your `.env` file. It's included in `.gitignore` to prevent accidental commits. For production secrets, use a proper secret manager (e.g. AWS Secrets Manager, GitHub Actions secrets, etc.).

Example variables provided in `.env.template`:

- `VITE_API_BASE_URL` — base URL the frontend uses to call your backend.
- `VITE_SENTRY_DSN` (optional) — Sentry DSN for error reporting.
- `VITE_GA_MEASUREMENT_ID` (optional) — Google Analytics measurement ID.

If you need help wiring a variable into the app, tell me which value you want to expose and I can show the exact code pattern.
