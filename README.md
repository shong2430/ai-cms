# AI-CMS (AI Content Management System)

A modern, AI-powered CMS dashboard built with **Next.js**, integrating rich text editing, image generation, and content publishing features. Designed for fast content creation and easy deployment.

🌐 Live: [https://ai-cms-mocha.vercel.app](https://ai-cms-mocha.vercel.app)

---

## ✨ Features

- 🔐 **Authentication system** (WIP): Login to manage your posts and track authorship.
- 🧠 **AI-generated content**: Use OpenAI API to generate article text and images.
- 🖋 **Rich Text Editing**: Powered by [TipTap](https://tiptap.dev), with support for headings, bold, links, and more.
- 🖼 **Image Upload**: Automatically upload AI-generated images to **Supabase Storage**.
- ⚡ **SEO-friendly routing**: Blog detail pages served via dynamic `slug` routing.
- ☁️ **CI/CD Integration**:
  - Jenkins: auto build & Dockerize
  - Docker Hub: image registry
  - Railway: deploy using custom Docker image

---

## 🛠 Tech Stack

| Area            | Technology |
|-----------------|------------|
| Framework       | Next.js (App Router) |
| Language        | TypeScript |
| Editor          | TipTap |
| Auth            | Custom auth system (email/password) |
| AI Integration  | OpenAI API |
| Storage         | Supabase Storage |
| Styling         | Tailwind CSS |
| Deployment      | Railway + Docker |
| CI/CD           | Jenkins + GitHub Webhook |
| Image Hosting   | Docker Hub |

---

## 🧑‍💻 Development

```bash
# 1. Install dependencies
yarn install

# 2. Set up environment variables
cp .env.example .env.local

# 3. Run development server
yarn dev
