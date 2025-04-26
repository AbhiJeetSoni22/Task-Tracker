# Task-Tracker


Task-Tracker is a MERN (MongoDB, Express, React, Node.js) stack application for managing projects and tasks. Users can create projects, add tasks to projects, update task details, toggle task statuses, and delete tasks.

---

## Features

- User authentication (Sign up and Login)
- Create, update, and delete projects
- Add, update, toggle status, and delete tasks
- Responsive design using Tailwind CSS

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

---

## Installation

###  Clone the Repository

```bash
git clone https://github.com/your-username/task-tracker.git
cd task-tracker


```bash
cd backend
npm install

cd frontend 
npm install 

Create a .env file in the backend folder and add the following environment variables:
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
Create a .env file in the frontend  folder and add the following environment variables:
VITE_BACKEND_URL=your-backend-url(eg: http://localhost:5000)

Start the backend server:
npm run server

Start the frontend :
npm run dev