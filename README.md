# Vercel Interview Prep App

For the Vercel interview, I was asked to create a simple autocomplete feature. This is a simple implementation of that feature with a few extra features.

---

## 🚀 Features

-   **Smart Autocomplete**: Lightning-fast word search with prefix and fuzzy matching, powered by a Trie data structure and Levenshtein distance algorithm.
-   **High-Frequency Word Prioritization**: (Considered/Planned) The system can be enhanced to showcase high-frequency words at the top of suggestions, giving priority to more commonly used words.
-   **Infinite Scroll / Load More**: (Considered/Planned) As users scroll through the autocomplete options, more results can be dynamically loaded beyond the initial set, enabling exploration of a larger word list.
-   **Reusable UI Components**: Pre-built with [shadcn/ui](https://ui.shadcn.com/) and Tailwind CSS for rapid development.
-   **Type Safety**: End-to-end TypeScript coverage for all APIs and utilities.
-   **Modern Developer Experience**: App Router, React 19, and best practices throughout.

---

## 🛠️ Tech Stack

-   **Next.js 15** (App Router)
-   **React 19**
-   **TypeScript**
-   **Tailwind CSS**
-   **shadcn/ui**

---

## 📦 Project Structure

```
src/
├── app/
│   ├── api/           # Backend API routes
│   │   ├── users/     # User management endpoints
│   │   └── words/     # Word search/autocomplete endpoints
│   ├── autocomplete/  # Autocomplete demo page
│   ├── layout.tsx     # Root layout and navigation
│   └── page.tsx       # Home page
├── components/
│   ├── ui/            # shadcn/ui components
│   └── nav.tsx        # Navigation bar
├── lib/
│   ├── types.ts       # TypeScript type definitions
│   ├── utils.ts       # Utility functions and API client
│   └── wordlist.txt   # Large word list for autocomplete
```

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Visit the app
open http://localhost:3000
```

---

## 🔌 API Endpoints

### Words API (`/api/words/search`)

-   `GET /api/words/search?query=foo` — Prefix search for words
-   `GET /api/words/search?query=foo&fuzzy=true` — Fuzzy search for similar words

---

## 🧠 Autocomplete Demo

Visit `/autocomplete` for a live demo of the smart autocomplete feature, including:

-   Real-time suggestions as you type
-   Keyboard navigation and selection
-   Multi-select support
-   Showcase of selected words
-   **(Planned) High-frequency words prioritized at the top of suggestions**
-   **(Planned) Infinite scroll or 'load more' to fetch additional options as you scroll**

---

## 🧩 Extending the App

-   Add persistent storage (e.g., database) for users/tasks
-   Implement authentication and authorization
-   Expand the API with new resources
-   Add more UI pages or dashboards
-   Integrate with external APIs or services
