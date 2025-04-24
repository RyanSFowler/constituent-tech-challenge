# Constituent Management System

This project is a full-stack application for managing constituents. It includes a backend API and a frontend user interface.

## Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Backend Setup

### Navigate to the Backend Directory
```bash
cd constituent-backend
npm install
npm run dev
```
- The backend server will start on http://localhost:3000.


### Navigate to the Frontend Directory
```bash
cd constituent-frontend
npm install
npm run dev
```
- The frontend will start on http://localhost:5173 (or another port if 5173 is in use)


## Notes
- The backend serves the API for managing constituents and exporting data as CSV.
- The frontend provides a user interface for interacting with the backend API.
- Ensure the backend is running before using the frontend to avoid API errors.

## Project Structure

### Backend
- Directory: constituent-backend
- Entry Point: src/index.ts
- API Routes: Defined in src/routes/constituent.ts
### Frontend
- Directory: constituent-frontend
- Entry Point: src/main.tsx
- UI Components: Located in components/

## Troubleshooting
- If you encounter issues with dependencies, try deleting node_modules and reinstalling:
- Ensure the .env file in the frontend contains the correct backend URL: VITE_API_URL=http://localhost:3000
