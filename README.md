# Task Management System

Welcome to the Task Management System! This is a full-stack web application designed to help users organize, track, and manage their daily tasks efficiently.

## 🌟 Features

*   **User Authentication:** Secure registration and login using JSON Web Tokens (JWT).
*   **Task Management:** Create, read, update, and delete (CRUD) your own tasks.
*   **Data Security:** Users can only view and edit their own tasks.
*   **Responsive Design:** A beautiful, modern interface built with React, Material UI, and Tailwind CSS.
*   **Clean Architecture:** Backend structured cleanly with Spring Boot controllers, services, and repositories.

## 🛠️ Technology Stack

**Backend:**
*   Java
*   Spring Boot (RESTful APIs, Spring Security)
*   MySQL (Database)
*   JWT (JSON Web Tokens for secure authentication)

**Frontend:**
*   React (with TypeScript)
*   Vite (for fast development and building)
*   Tailwind CSS (for styling)
*   Material UI (MUI) (for pre-built UI components)
*   React Router (for navigation)

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

Make sure you have the following installed on your machine:
*   [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/) (version 17 or higher recommended)
*   [Node.js and npm](https://nodejs.org/) (for the frontend)
*   [MySQL](https://www.mysql.com/) (running on your local machine)

### 1. Setup the Database

1. Open your MySQL client (like MySQL Workbench).
2. Create a new database for the application (e.g., `task_master`).
3. Update the `application.properties` or `application.yml` file in the backend to match your MySQL username, password, and database name.

### 2. Run the Backend (Spring Boot)

1. Open a terminal and navigate to the root directory of the project.
2. Run the following command to start the Spring Boot server:
   ```bash
   ./mvnw spring-boot:run
   ```
   *(The backend should now be running, typically on port 8080).*

### 3. Run the Frontend (React)

1. Open a **new** terminal window.
2. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
3. Install all the required dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *(The frontend should now be accessible in your web browser, usually at `http://localhost:5173`).*

## 💡 How to Use

1. Open the frontend URL in your browser.
2. Click **Register** to create a new account.
3. **Login** with your new credentials.
4. Go to the **My Tasks** dashboard to start adding and managing your tasks!

---
*Created as a learning project to master Full-Stack Development with Spring Boot and React!*
