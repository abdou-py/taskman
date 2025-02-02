This project is a task management web application built using Next.js,
Redux, and FastAPI, with a MySQL database. The front-end is based on the
Spike Next.js Free Admin Template
(https://www.wrappixel.com/templates/spike-next-js-free-admin-template/).

# Project Overview

## Front-End (Next.js & Redux)

-   **Task List:** View, add, edit, and delete tasks.

-   **Multi-select and delete tasks.**

-   **Dashboard:** View task statistics (total tasks, modified tasks,
    deleted tasks).

## Back-End (FastAPI & SQLAlchemy)

-   **Database:** MySQL

-   **Database Management:** Aerich for migrations

-   **No Raw SQL:** Uses SQLAlchemy for database interactions

# Getting Started

To run the task management app locally, follow these steps:

## Prerequisites

-   **Node.js & npm/yarn** - Download from Node.js
    (https://nodejs.org/).

-   **Python 3.8+** with pymysql, Alembic, and FastAPI. Install the
    necessary Python dependencies:

    `pip install pymysql alembic fastapi`

-   **MySQL** - Make sure MySQL is installed. Download from MySQL
    Downloads (https://dev.mysql.com/downloads/).

## Clone the Repository

Clone the repository to your local machine:

    git clone <repository_url>

## Install Front-End Dependencies

In the project directory, install the required JavaScript dependencies:

    cd <project_directory>
    npm install

or if you use yarn

    yarn install

## Set Up the Database

### Create the Database:

Open your MySQL shell or use a GUI and run the following SQL commands to
create the database:

    CREATE DATABASE my_database;

### Create a MySQL User (Optional):

If you don't have a database user, run the following:

    CREATE USER 'root'@'localhost' IDENTIFIED BY 'your_password';
    GRANT ALL PRIVILEGES ON my_database.* TO 'root'@'localhost';
    FLUSH PRIVILEGES;

### Configure the Database Connection

Create a `.env` file in the root of your project and add your MySQL
credentials:

    MYSQL_HOST=localhost
    MYSQL_USER=root
    MYSQL_PASSWORD=your_password
    MYSQL_DATABASE=my_database

## Run Migrations

### Initialize Alembic Migrations:

First, generate the migration script based on the models:

    alembic revision --autogenerate -m "Initial migration"

### Apply Migrations:

After the migration script is generated, apply it to the database:

    alembic upgrade head

## Run the Application

### Start the Development Server:

    npm run dev

or

    yarn dev

Open your web browser and navigate to http://localhost:3000 to view the
app.

Congratulations! You've successfully set up the Task Management App.
