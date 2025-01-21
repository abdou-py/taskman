## Task Management App with Next.js, Redux, and FastAPI

This document details the development of a task management web application using Next.js, Redux, and FastAPI. The provided template ([https://www.wrappixel.com/templates/spike-next-js-free-admin-template/](https://www.wrappixel.com/templates/spike-next-js-free-admin-template/)) will be used for the front-end design.

### Project Requirements

**Front-End (Next.js & Redux):**

* **Pages:**
    * Task List:
        * View existing tasks.
        * Add new tasks.
        * Edit existing tasks.
        * Delete tasks.
        * Multi-select and delete tasks.
    * Dashboard:
        * Display total number of tasks.
        * Display number of modified tasks.
        * Display number of deleted tasks.
* **Template:** Spike Next.js Free Admin Template ([https://www.wrappixel.com/templates/spike-next-js-free-admin-template/](https://www.wrappixel.com/templates/spike-next-js-free-admin-template/))

**Back-End (FastAPI & SQLAlchemy):**

* **Database:** MySQL
* **Database Management:** Aerich for migrations
* **Project Structure:** Models, Services, Routes, DB
* **No Raw SQL:** Use SQLAlchemy for database interactions

**General Best Practices:**

* Version control with a GitHub repository.
* Clear and informative commit messages.
* Function documentation for code clarity.

### Deliverables

* GitHub repository link containing the project source code.
* Local execution instructions, including dependency installation and commands.
* A README.md file with:
    * Project description
    * Implemented functionalities
    * Configuration and execution steps

### Evaluation Criteria

* Adherence to technical and functional specifications.
* Code quality: readability, modularity, organization.
* Clear and concise documentation.
* Proper Git practices (clear and meaningful commits).
* User-friendly and functional design.

**Note:** This project description is tailored to the recruitment task details you provided in Arabic and French.

Here's a breakdown of how we can approach this project:

1. **Front-End Development (Next.js & Redux):**
   - Set up a Next.js project using the provided template.
   - Design the Task List and Dashboard pages using the template components.
   - Implement task management functionalities using Redux for state management.
   - Create components for adding, editing, deleting, and displaying tasks.
   - Integrate multi-select functionality for deleting multiple tasks.
   - Develop the Dashboard to display task counts using Redux state.

2. **Back-End Development (FastAPI & SQLAlchemy):**
   - Set up a FastAPI project.
   - Define data models for tasks using SQLAlchemy.
   - Create database tables using Aerich for migrations.
   - Implement API endpoints for CRUD (Create, Read, Update, Delete) operations on tasks.
   - Ensure all database interactions use SQLAlchemy, not raw SQL.

3. **Deployment and Documentation:**
   - Push the code to a GitHub repository.
   - Create a README.md file with detailed instructions for:
      - Installing dependencies
      - Running the application locally
      - Configuring the database connection 
   - Document the code using comments and docstrings for better understanding.

## Running the Task Management Application

This document provides instructions on how to run the task management application locally.

**Prerequisites:**

* **Node.js and npm (or yarn):** Make sure you have Node.js and npm (or yarn) installed on your system. You can download and install them from the official Node.js website: https://nodejs.org/

**Steps:**

1. **Clone the repository:**
   - Clone the repository from GitHub using the following command:
     ```bash
     git clone <repository_url>
     ```
   - Replace `<repository_url>` with the actual URL of the repository.

2. **Navigate to the project directory:**
   - Open your terminal or command prompt and navigate to the project directory:
     ```bash
     cd <project_directory>
     ```
   - Replace `<project_directory>` with the actual path to the directory.

3. **Install dependencies:**
   - Install the required dependencies using npm or yarn:
     ```bash
     npm install
     ```
     or
     ```bash
     yarn install
     ```

4. **Start the development server:**
   - Start the development server using the following command:
     ```bash
     npm run dev
     ```
     or
     ```bash
     yarn dev
     ```

5. **Access the application:**
   - Open your web browser and navigate to `http://localhost:3000` to access the application.

**Additional Notes:**

* This assumes that the project is configured to run on port 3000. If the port is different, please adjust the URL accordingly.
* If you encounter any issues, please refer to the project's README file or the documentation for more information.

**Congratulations!** You have successfully run the task management application locally.

**Additional Notes:**

* This is a high-level overview. Specific implementation details will depend on your chosen libraries and frameworks.
* Consider using a UI library like Material-UI for a consistent and user-friendly interface.
* Explore authentication and authorization mechanisms if you want to secure user data.

By following these steps and adhering to the best practices mentioned, you can develop a functional and well-structured task management application.

