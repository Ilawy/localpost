# LocalPost

LocalPost is a simple blogging platform built with Next.js, Prisma, and NextAuth.

## Features

*   **Create, Read, Update, and Delete (CRUD) Posts:** Users can create, read, update, and delete their own blog posts.
*   **Authentication:** Secure authentication using NextAuth with GitHub provider.
*   **Editor.js Integration:** Rich text editing using Editor.js for creating engaging content.
*   **Database Persistence:** Data is stored in a database using Prisma.
*   **Dynamic Routing:** Uses Next.js dynamic routes for individual post pages and editing.
*   **Server Actions:** Leverages Next.js Server Actions for data mutations.
*   **Client Components:** Uses client components for interactive elements like the post list and form.

## Technologies Used

*   **Next.js:** React framework for building server-rendered applications.
*   **Prisma:** ORM for database access.
*   **NextAuth:** Authentication library.
*   **Editor.js:** Block-style editor for creating rich content.
*   **Day.js:** Library for date and time formatting.
*   **React Use:** Collection of useful React hooks.
*   **Tailwind CSS:** Utility-first CSS framework.

3.  **Set up your database:**

    *   Configure your database connection in the `.env` file.  You'll need to create a `.env` file in the root of your project.  Example:

        ```
        DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
        GITHUB_CLIENT_ID="YOUR_GITHUB_CLIENT_ID"
        GITHUB_CLIENT_SECRET="YOUR_GITHUB_CLIENT_SECRET"
        NEXTAUTH_SECRET="SOMESUPERSECRET" # This should be a strong, randomly generated secret in production
        ```

    *   Run Prisma migrations:

        ```bash
        npx prisma migrate dev
        ```

4.  **Configure Authentication:**

    *   Create a GitHub OAuth application and obtain your `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.
    *   Set the `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` environment variables in your `.env` file.
    *   **Important:** In a production environment, replace the `NEXTAUTH_SECRET` with a strong, randomly generated secret.
