# recipe-book exercise during WBS Coding School

## Project Requirements

| ID     | Functional Requirement     | Description                                                                                                   | Status         |
| ------ | -------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------- |
| FR001  | Public GitHub Repository   | Host code in a public repo and merge into main only via pull requests.                                        | In Progress    |
| FR002  | Commit Workflow            | Make small, frequent commits and open PRs for each feature or fix.                                            | In Progress    |
| FR003  | Framework Scaffolding      | Scaffold your project with React Router or NextJS using the TypeScript template.                              | Done           |
| FR004  | Routing Configuration      | Set up client-side routes with React Router or NextJS pages and server functions.                             | Done           |
| FR005  | TailwindCSS Styling        | Apply consistent styling throughout using TailwindCSS.                                                        | In Progress    |
| FR006  | Neon Integration           | Set up a Neon database with recipe data and configure server-side functions to query it.                      | Done           |
| FR007  | Data Generation            | Use Neon to seed your database with sample recipes on project initialization.                                 | Done           |
| FR008  | Search Functionality       | Implement a search interface that queries your Neon database on the server and displays results.              | Done           |
| FR009  | Recipe Detail Page         | Create a dedicated page to fetch and display detailed data for a selected recipe from Neon.                   | In Progress    |
| FR010  | Cookbook CRUD              | Enable visitors to add, list, update notes, and remove recipes in their cookbook, persisting changes to Neon. | In Progress    |
| FR011  | Loading and Error Handling | Provide user feedback: loading indicators and graceful error messages for database operations.                | In Progress    |
| FR012  | Code Organization          | Maintain a clear folder structure (components, utils, types).                                                 | In Progress    |
| FR013  | Documentation & Readme     | Include a README with setup instructions, project overview, TS feature roadmap, and Neon usage details.       | In Progress    |
| FR014a | React Router Deployment    | Deploy the React Router app (Netlify or Vercel) and verify production routes/actions.                         | does not apply |
| FR014b | NextJS Deployment          | Deploy the NextJS app to Vercel and configure loading.js for data fetching states.                            | In Progress    |

## Setup and Installation Instructions

1. clone from Github repo with SSH
   git clone git@github.com:Al-Amer/recipe-book.git

2. install dependencies with (still to test, accordigliy to Gemini this shoul work without specifying all packages independently)
   npm i

    // alternatively use single statements
    npm install react-icons
    npm install next-auth
    npm install bcryptjs
    npm install @neondatabase/serverless

3. run with
   npm run dev
