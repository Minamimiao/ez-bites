# EZ Bites

EZ Bites is a restaurant menu website. Users can view menu items and prices on a simple, responsive page.

This project uses React for the frontend, Express for the backend, and PostgreSQL for the database.

## Features

- Display menu items and prices from the database
- Support desktop and mobile layouts
- Show loading, empty, and error messages
- Allow users to retry if the menu fails to load

## Tech Stack

- **Frontend:** React, JavaScript, CSS, Vite
- **Backend:** Node.js, Express
- **Database:** PostgreSQL

## Project Structure

The main folders and files are:

```text
ez-bites/
├── backend/
│   ├── certs/
│   │   └── aiven-ca.pem       # Certificate for the remote database connection
│   ├── database-config.js    # Database connection settings
│   ├── server.js             # Express server and API routes
│   ├── SSL.md                # Database SSL setup notes
│   └── package.json          # Backend dependencies
│
├── frontend/
│   ├── public/               # Static images and icons
│   ├── src/
│   │   ├── assets/           # Image and SVG assets
│   │   ├── App.jsx           # Main menu page and data fetching
│   │   ├── App.css           # Starter styles, currently unused
│   │   ├── index.css         # Main styles and responsive layout
│   │   └── main.jsx          # React entry point
│   ├── index.html            # Main HTML file
│   ├── vite.config.js        # Vite settings
│   └── package.json          # Frontend dependencies and scripts
│
├── documentation/
│   └── GIT_WORKFLOW.md        # Team collaboration guide
│
└── .gitignore                # Files and folders excluded from Git
```

### Frontend

The `frontend` folder contains the website interface. It requests menu data from the backend and displays the results.

Most of the page logic is in `App.jsx`, and the main styling is in `index.css`.

### Backend

The `backend` folder contains the server and database connection code.

`server.js` handles API requests, while `database-config.js` manages the PostgreSQL connection.

### Documentation

The `documentation` folder contains notes and guides for team members.

## How It Works

1. The frontend sends a request to `/api/menu`.
2. The backend reads the menu items from PostgreSQL.
3. The backend returns the data as JSON.
4. The frontend displays the menu items and prices.

## Running Locally

### Backend

Inside the `backend` folder, install the dependencies:

```bash
npm install
```

Create a `.env` file with your database settings:

```dotenv
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
PORT=3000
```

Start the backend:

```bash
node server.js
```

The database needs a `menu_items` table with `id`, `name`, and `price` fields. Database setup scripts are not included yet.

### Frontend

Inside the `frontend` folder, install the dependencies:

```bash
npm install
```

Create a `.env` file:

```dotenv
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Open the URL shown in the terminal. Keep both the frontend and backend running.

## API Routes

| Method | Route | Description |
| --- | --- | --- |
| GET | `/` | Check whether the backend is running |
| GET | `/api/menu` | Get all menu items |
