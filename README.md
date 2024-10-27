# Task Manager API

This is the backend for a Task Manager application built with Node.js, Express, and MongoDB.

## Features

- CRUD operations for tasks
- Task pagination
- Task filtering and sorting
- Error handling
- CORS enabled for frontend communication

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- MongoDB (Local or MongoDB Atlas)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd backend

<!-- Install the dependencies: -->
npm install

<!-- Create a .env file in the root directory and set the environment variables: -->

<!-- To start the server, run: -->
npm start

<!-- API Endpoints -->
GET /api/tasks - Retrieve a list of tasks with pagination, filtering, and sorting.
POST /api/tasks - Create a new task.
GET /api/tasks/:id - Retrieve a task by ID.
PUT /api/tasks/:id - Update an existing task by ID.
DELETE /api/tasks/:id - Delete a task by ID.



