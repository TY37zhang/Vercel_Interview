# Vercel Interview Prep App

A fully bootstrapped Next.js application ready for your Vercel interview! This project comes pre-configured with modern tools and a solid foundation that you can quickly extend during your interview.

## 🚀 Quick Start

```bash
# Start the development server
npm run dev

# Visit the app
open http://localhost:3000
```

## 🛠️ Tech Stack

-   **Next.js 15** - App Router with React 19
-   **TypeScript** - Type safety and developer experience
-   **Tailwind CSS** - Modern utility-first styling
-   **shadcn/ui** - Beautiful, accessible UI components
-   **API Routes** - Full-stack functionality with backend endpoints

## 📁 Project Structure

```
src/
├── app/
│   ├── api/           # Backend API routes
│   │   ├── users/     # User management endpoints
│   │   └── tasks/     # Task management endpoints
│   ├── demo/          # Demo page showing API functionality
│   ├── layout.tsx     # Root layout with navigation
│   └── page.tsx       # Home page
├── components/
│   ├── ui/            # shadcn/ui components
│   └── nav.tsx        # Navigation component
└── lib/
    ├── types.ts       # TypeScript type definitions
    └── utils.ts       # Utility functions and API client
```

## 🔧 Available API Endpoints

### Users API (`/api/users`)

-   `GET /api/users` - Get all users
-   `GET /api/users?role=admin` - Filter users by role
-   `POST /api/users` - Create a new user
-   `DELETE /api/users?id=1` - Delete a user

### Tasks API (`/api/tasks`)

-   `GET /api/tasks` - Get all tasks
-   `GET /api/tasks?status=pending` - Filter by status
-   `GET /api/tasks?priority=high` - Filter by priority
-   `GET /api/tasks?userId=1` - Filter by user
-   `POST /api/tasks` - Create a new task
-   `PUT /api/tasks` - Update a task
-   `DELETE /api/tasks?id=1` - Delete a task

## 💡 Features Ready for Extension

### Pre-built UI Components

-   Buttons, Cards, Forms, Dialogs
-   Badges, Separators, Progress bars
-   Dropdowns, Selects, Inputs
-   And many more from shadcn/ui!

### API Utilities

-   Type-safe API client in `src/lib/utils.ts`
-   Consistent error handling
-   Request/response types in `src/lib/types.ts`

### Styling Utilities

-   Status and priority color coding
-   Date/time formatting functions
-   Responsive design helpers

## 🎯 Demo Page

Visit `/demo` to see:

-   Live API endpoints in action
-   Sample data display
-   Interactive functionality
-   API status monitoring

## 🚦 Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 📝 Sample Data

The app comes with sample users and tasks for immediate testing:

**Users:**

-   John Doe (admin)
-   Jane Smith (user)
-   Bob Johnson (user)

**Tasks:**

-   Various statuses: pending, in-progress, completed
-   Different priorities: low, medium, high
-   Assigned to different users

## 🎨 UI Components Available

All shadcn/ui components are pre-installed and ready to use:

-   `Button`, `Card`, `Badge`, `Separator`
-   `Input`, `Textarea`, `Select`, `Checkbox`
-   `Dialog`, `AlertDialog`, `Dropdown`
-   `Tabs`, `Accordion`, `Progress`
-   And more!

## 💻 Perfect for Interview Scenarios

This setup is ideal for implementing common interview requirements:

-   **CRUD operations** - Users and tasks APIs ready
-   **Data filtering** - Query parameters implemented
-   **Form handling** - Components and validation ready
-   **State management** - React hooks examples
-   **Responsive design** - Mobile-first approach
-   **Type safety** - Full TypeScript coverage

## 🎯 Quick Extension Ideas

During your interview, you could easily add:

-   User authentication/login forms
-   Task management dashboard
-   Data visualization components
-   Real-time updates
-   Search and filtering UI
-   File upload functionality
-   And much more!

## 🚀 Ready to Interview!

Your Next.js app is fully configured and ready to go. Just run `npm run dev` and start building amazing features during your Vercel interview!

Good luck! 🍀

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
