# [Ponovo](https://ponovo.app)

### Ponovo is a job application tracking tool that easily helps you visualize and manage your job applications in one unified place. The goal of Ponovo is to make tracking job applications as hassle-free as possible.

## Features

- Create, edit and delete job applications
- Add timeline updates to your job applications as they progress
- View all your job applications in one beautiful dashboard
- More coming soon!

## Roadmap

Currently, Ponovo is in beta. It is reliable and stable, but there are many features that are missing.

View the roadmap [here](https://zealous-tie-73d.notion.site/27faa9398cf64060a1b11f8fee865a07).

## Contributing

Contributions are welcome! If you have any ideas or suggestions, please open an issue, submit a pull request, or contact me via [LinkedIn](https://www.linkedin.com/in/vishrut-agrawal/) or [email](mailto:zvishrut@gmail.com).

## Running Locally

### Precursor: Whenever following any guides, make sure to follow guides for the Next.js App Router (not the pages router)

1. Copy the `.env.example` file to `.env`
2. Set up a [Neon](https://neon.tech) account and create a PostgreSQL database (it's free!)
   - Copy the database URL and set it as the `DATABASE_URL` environment variable
3. Create a Clerk account and set up a clerk project (also free!)
   - Copy the Clerk publishable key and secret key and set them as the `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` environment variables
   - Set up a webhook in Clerk for local development by following this [guide](https://clerk.com/docs/integrations/webhooks/sync-data#sync-clerk-data-to-your-application-with-webhooks)
   - Copy the webhook secret and set it as the `CLERK_WEBHOOK_SECRET` environment variable
4. Run `npm install` and `npm run dev`

## Project Organization and Naming Conventions

### Project Organization

- `@/` - Points to `/src` directory
- `@/actions` - Contains all the server actions. Read more [here](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
  - Splits folder into categories of actions
  - Each file exports 1 server actions. All server actions must be authenticated as they act as normal POST requests
  - Used for making mutations to the database, not for fetching data
- `@/app` - Folder for the Next.js app router. Read more [here](https://nextjs.org/docs/app/building-your-application/routing)
  - Should only contain api folder and folder for routing
  - `api` - Contains all the api routes
    - `clerk/webhook` - Contains the Clerk webhook route as well as helper functions for it
    - `trpc` - contains the wrapper for the [trpc](https://trpc.io) server. No need to touch this file
- `@/components` - Contains all the components int he application. Split into many sub-folders
  - `applications` - Contains all components related to `/dashboard/applications`
  - `custsom` - Contains custom ui components that will be reused throughout the application
  - `dashboard` - Contains all components related to `/dashboard`
  - `forms` - Contains all the forms used throughout the application
  - `general` - Contains major UI components such as navbars and smaller pages
  - `magicui` - Contains all components used by [MagicUI](https://magicui.design)
  - `skeletons` - Contains skeletons used for loading states
  - `ui` - Contains all the [shadcn](https://ui.shadcn.com) components that are used throughout the application
- `@/data` - Contains all the data access and mutation logic in the application. Divided into sub-folders by table. And each type of operation has their own file.
  - `import 'server-only'` at the top of every file in this folder so that it can only be imported in the server
- `@/drizzle` - Contains the [drizzle](https://orm.drizzle.team/) schema and migrations
- `@/lib` - Contains db object that can be imported and used throughout the application
- `@/server` - Contains trpc server router
  - `routers` - Contains all functions that will be taken care of by trpc. 1 router per db table, and each router has its own file
  - `root` - Every time a new router is added, it must be added to the appRouter in this file
- `@/schemas` - Contains zod schemas for all the forms in the application
- `@/trpc` - [trpc](https://trpc.io) and [react query](https://tanstack.com/query/latest) client wrapper for providers and hooks for the server and client side of the application
- `@/types` - Contains all the types used throughout the application

### Naming Conventions

- File Names - `kebab-case`
- TSX Component Names - `PascalCase`
- TS Function Names - `camelCase`

## Tech Stack

Every item in Ponovo's tech stack was chosen for a reason. Here's a brief overview of the technologies used, why they were chosen, and how to use them.

### [Next.js](https://nextjs.org/docs)

- Version 14, using the app router. Whenever looking through forums for help, make sure to look for the **APP ROUTER** and **NOT** the **PAGES ROUTER**
- Look at the docs for any help or questions regarding the framework
- I have also written [this blog post](https://www.vishrut.tech/blog/nextjs-data-fetching-mutations) to learn more about server actions and server components

### [React](https://react.dev/reference/react)

- Version 18

### [TailwindCSS](https://tailwindcss.com/docs/installation)

- Library for inline styling. Documentation is very good
- `import { cn } from @/lib/utils` can be used to use TailwindMerge, which is an easy way to combine tailwind classes conditionally.
  - Usage Example: `className = {cn('text-5xl font-bold', error ? 'text-red' : 'text-black')}`
- `tailwind.config.js` contains all theming extensions that are used throughout the application. Some of the classes were added for ShadCN so don't worry too much about those (mostly the animations and keyframe ones).

### [Drizzle](https://orm.drizzle.team/)

- ORM for PostgreSQL
- Read more [here](https://orm.drizzle.team/docs/getting-started/installation)
- Import

### [TRPC](https://trpc.io)

- This library is used for the creating type-safe API endpoints for the application
- Instructions for where files go are placed above.
- Don't use in the server side. In the client side, `import { api } from '@/trpc/react'`
- Use is built in with React Query, so you can use it to invalidate queries after mutations as well as caching queries
- `getQueryKey` is used to retrieve the query key for a given endpoint.

### [React Query](https://tanstack.com/query/latest)

- Used along with TRPC for data fetching from the client. Use server actions for mutations from the clinet.
- Use as a last resort when you can't use server components to fetch data. Very rare use case.

### [Clerk](https://clerk.com)

- Authentication and authorization provider for the application
- Can search for users by clerk id after authenticating them in every action by clerk
- `user = auth()` is used to retrieve the user object in the server. Every action that takes place in the server needs to be authenticated

### [shadcn](https://ui.shadcn.com)

- UI Library with built in wrappers used throughout the application
- Contains wrappers for forms using [react-hook-form](https://react-hook-form.com/), [tanstack-table](https://tanstack.com/table/latest), and [ReCharts](https://recharts.org/en-US/), and more
- Uses [radix-ui](https://www.radix-ui.com/primitives) for all ui components
- All files that are used in the `@/components/ui` folder

### [Framer Motion](https://www.framer.com/motion/)

- Animation library, take a look at the docs for more information

## Known Bugs:

- [ ] Closing modal, discarding changes, and reopening modal, closing without making edits results in confirm popup showing up when it shouldn't
- [ ] Deleting an application should select a different application to view automatically
