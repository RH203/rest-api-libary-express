# REST API Library - Express.js

This is a simple REST API built with **Express.js** for managing a library system. It allows users to manage books, borrow/return books, and register/login as students. The API integrates with a database using Prisma as the ORM.

## Features

### Public Routes
- **User Registration and Login**:
    - **`POST /api/user/registrasi`**: Register a new user.
    - **`GET /api/user/login`**: User login.
- **Books**:
    - **`GET /api/book`**: Get a list of all available books (requires login).
    - **`GET /api/book/:id`**: Get detailed information about a book by its ID (requires login).
    - **`POST /api/book/borrow`**: Borrow a book (requires login).
    - **`POST /api/book/return`**: Return a borrowed book (requires login).

### Admin Routes
- **Manage Books**:
    - **`POST /api/admin/new-book`**: Add a new book (admin-only).
    - **`POST /api/admin/remove-book`**: Remove a book (admin-only).
    - **`POST /api/admin/update-book`**: Update book details (admin-only).
- **Manage Users**:
    - **`POST /api/admin/update-user`**: Update user details (admin-only).
    - **`GET /api/admin/get-all-user`**: Retrieve a list of all users (admin-only).
    - **`POST /api/admin/delete-user/:id`**: Delete a user by ID (admin-only).
- **Manage Genres and Publishers**:
    - **`POST /api/admin/new-genre`**: Add a new genre (admin-only).
    - **`POST /api/admin/new-publisher`**: Add a new publisher (admin-only).
    - **`GET /api/admin/show-genre`**: Retrieve all genres (admin-only).
    - **`GET /api/admin/show-publisher`**: Retrieve all publishers (admin-only).

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime.
- **Express.js**: Lightweight and flexible web framework.

### Database and ORM
- **MySQL**: Database for storing application data.
- **Prisma**: ORM for database management.

### Security
- **bcrypt**: For password hashing.
- **jsonwebtoken (JWT)**: For secure user authentication.

### Utilities
- **dotenv**: For managing environment variables.
- **express-rate-limit**: To prevent brute force attacks.
- **joi**: For request data validation.
- **winston**: For logging.

## Prerequisites

Ensure the following are installed on your system:
- **Node.js** (>=16.0.0)
- **npm** (>=7.0.0)
- **PostgreSQL** (or any other database supported by Prisma)

## Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/rest-api-library-express.git
   cd rest-api-library-express
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**  
   copy a `.env.example` file in the root directory with the required variables. For example:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/library
   JWT_SECRET=your-secret-key
   ```
   ```bash
   cp .env .env.example
    ```

## Scripts

The project includes various NPM scripts for development, testing, and database management. Below is a list of available commands:

| Script                | Command                       | Description                                                                 |
|-----------------------|-------------------------------|-----------------------------------------------------------------------------|
| **`test`**            | `jest -i`                    | Runs the test suite using Jest with isolated test environments.            |
| **`prisma:generate`** | `npx prisma generate`         | Generates the Prisma Client based on the current Prisma schema.            |
| **`prisma:migrate`**  | `npx prisma migrate dev`      | Applies database migrations to the development database.                   |
| **`prisma:pull`**     | `npx prisma db pull`          | Introspects the database schema and updates the Prisma schema accordingly. |
| **`prisma:reset`**    | `npx prisma migrate reset`    | Resets the database by applying migrations from scratch.                   |
| **`seeder`**          | `node seeder/index.js`        | Runs the seeder script to populate the database with initial data.         |
| **`dev`**             | `nodemon src/main.js`         | Starts the development server with hot-reloading enabled using Nodemon.    |
| **`format`**          | `prettier --write .`          | Formats the codebase using Prettier to ensure consistent styling.          |

### How to Use Scripts

To run any of these scripts, use the following command format:

```bash
npm run <script-name>
```

Run the development server:

```bash
npm run dev
```
Format the code:

```bash
npm run format
```

Apply Prisma migrations:

```bash
npm run prisma:migrate
```

## Documentation

For detailed API documentation, visit: [docs-library-express](https://rh203.github.io/docs-library-express/)