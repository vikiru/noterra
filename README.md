<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./logo-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="./logo-light.png">
    <img alt="logo" width="512" height="140" src="./logo.png">
  </picture>
</div>

<div align="center" id="badges">
  <a href="https://github.com/vikiru/noterra/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-aqua" alt="MIT License Badge"/>
  </a>
  <a href="https://biomejs.dev">
    <img alt="Static Badge" src="https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome">
  </a>
  <a href="https://github.com/vikiru/noterra/releases">
    <img src="https://img.shields.io/github/v/release/vikiru/noterra" alt="Release"/>
  </a>
  <a href="https://github.com/vikiru/noterra/issues?q=is%3Aissue+is%3Aclosed">
    <img src="https://img.shields.io/github/issues-closed/vikiru/noterra" alt="Closed Issues"/>
  </a>
  <a href="https://github.com/vikiru/noterra/pulls?q=is%3Apr+is%3Aclosed">
    <img src="https://img.shields.io/github/issues-pr-closed/vikiru/noterra?label=closed%20prs" alt="Closed PRs"/>
  </a>
</div>

---

**Noterra** is an AI-powered learning tool that leverages Gemini AI to generate comprehensive notes and flashcards based on given user prompts.

## 📖 Table of Contents

- [📖 Table of Contents](#-table-of-contents)
- [🌟 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📝 Prerequisites](#-prerequisites)
- [⚡ Setup Instructions](#-setup-instructions)
- [📜 Available Scripts](#-available-scripts)
- [✨ Acknowledgments](#-acknowledgments)
- [©️ License](#️-license)

## 🌟 Features

- Generate comprehensive notes and flashcards based on given user prompts - powered by [Gemini 2.5 Flash](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash)
- Mermaid.js diagram rendering via [Mermaid](https://mermaid.js.org/)
- Powerful note editing functionality (including undo/redo) powered by [TipTap Editor](https://tiptap.dev)
- User authentication and authorization powered by [Clerk](https://clerk.com/)
- Manage the visibility of notes and flashcards:
  - Mark notes as public or private
  - Control the visibility of flashcards (public and shared notes can have private flashcards)
  - Share private notes with others via link
- Export notes as various file formats including TXT, Markdown, and PDF

## 🛠️ Tech Stack

- Frontend: [TypeScript](https://www.typescriptlang.org/), [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [shadcn/ui](https://ui.shadcn.com/), [Lucide React Icons](https://lucide.dev/), [Tailwind CSS](https://tailwindcss.com/), [Mermaid](https://mermaid.js.org/), [TipTap](https://tiptap.dev)

- Backend: [Node.js](https://nodejs.org/), [Drizzle ORM](https://orm.drizzle.team/), [PostgreSQL](https://www.postgresql.org/), [Zod](https://zod.dev/), [Clerk](https://clerk.com/), [Google Gemini](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash)

## 📝 Prerequisites

Ensure that the following prerequisites are installed on your system by following the [Setup Instructions](#-setup-instructions):

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Clerk](https://clerk.com/)
- Google Gemini API Key (via [Google AI Studio](https://aistudio.google.com/))

## ⚡ Setup Instructions

1. Clone this repository to your local machine.

```bash
git clone https://github.com/vikiru/noterra.git
cd noterra
```

2. Install dependencies.

```bash
pnpm install
```

3. Setup Clerk and Google Gemini

   - Create a [Clerk account](https://clerk.com/) and obtain the necessary API keys.

   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   ```

   - Create a new project in [Google AI Studio](https://aistudio.google.com/) and obtain the necessary API key.

   ```bash
   GEMINI_API_KEY=
   ```

4. Set up environment variables by creating an `.env` file in the root directory of the project.

```bash
GEMINI_API_KEY=
# Replace these with your database username, password, host, port, and database name.
DATABASE_URL='postgresql://<username>:<password>@<host>:<port>/<database name>'

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/signup
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding
```

5. Perform database migrations using [Drizzle](https://orm.drizzle.team/).

```bash
npx drizzle-kit push
```

6. Start the development server.

```bash
pnpm dev
```

The application will be running and available at the following URL:

```bash
http://localhost:3000
```

## 📜 Available Scripts

1. Start the development server.

```bash
pnpm dev
```

2. Build the production version of the application.

```bash
pnpm build
```

3. Start the production server after building.

```bash
pnpm start
```

4. Launch [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview) for managing the database.

```bash
pnpm studio
```

5. Lint files using [Biome](https://biomejs.dev).

```bash
pnpm lint
```

6. Format files using [Biome](https://biomejs.dev).

```bash
pnpm format
```

7. Run TypeScript type checks without emitting files.

```bash
pnpm typecheck
```

8. Check unused dependencies and files with [Knip](https://github.com/webpro-nl/knip)

```bash
pnpm unused
```

## ✨ Acknowledgments

- [tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [tailwind-debug-screens](https://github.com/jorenvanhee/tailwindcss-debug-screens)
- [turndown](https://github.com/mixmark-io/turndown)
- [html-react-parser](https://github.com/remarkablemark/html-react-parser)
- [isomorphic-dompurify](https://github.com/kkomelin/isomorphic-dompurify)
- [JSDOM](https://github.com/jsdom/jsdom)
- [Lefthook](https://github.com/evilmartians/lefthook)
- [Profanity](https://github.com/2Toad/Profanity)
- [Luxon](https://github.com/moment/luxon)
- [Faker.js](https://github.com/faker-js/faker)
- [Shields Badges](https://github.com/badges/shields)
- [Semantic Release](https://github.com/semantic-release/semantic-release)
- [Favicon Generator](https://favicon.io/favicon-generator/)

## ©️ License

The contents of this repository are licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

[MIT](LICENSE) &copy; 2025-present Visakan Kirubakaran.
