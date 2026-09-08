# JobTrack

A full-stack web application for organizing and tracking job applications, built with PHP, MySQL, and vanilla JavaScript.
## Live Demo

[Try JobTrack Live](https://jobtrack-konstantina.infinityfreeapp.com/welcome.html)

Explore the application without creating an account. Each browser receives an isolated demo session, so your applications remain separate from other visitors.

## Features

* **Application Management:** Add, edit, and delete job applications.
* **Dashboard:** View application totals and status statistics.
* **Search & Filtering:** Search by company or position and filter applications by status.
* **Kanban Board:** Drag and drop application cards between Applied, Interview, Offer, and Rejected columns.
* **Demo Sessions:** Each browser receives an isolated demo session, keeping application data separate from other visitors.
* **Persistent Data:** Applications and status changes are stored in MySQL.

## Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Backend:** PHP 8 with PDO
* **Database:** MySQL / MariaDB
* **Development Environment:** XAMPP
* **Version Control:** Git & GitHub

## How It Works

JobTrack uses a PHP backend to handle application CRUD operations and communicate with a MySQL database. The frontend uses the Fetch API to load and update data asynchronously. The Kanban board updates application statuses through drag-and-drop interactions, with changes persisted in the database.

Demo sessions use secure random tokens stored as hashes in the database. A browser cookie identifies the session, and database queries are scoped to the corresponding session ID. Sessions expire after seven days of inactivity.

## Local Setup

1. Install XAMPP and start Apache and MySQL.
2. Copy the project into `C:\xampp\htdocs\jobtrack`.
3. Create a MySQL database named `jobtrack`.
4. Create the required database tables using the project schema.
5. Create a local `config.php` file with your database credentials.
6. Open `http://localhost/jobtrack/welcome.html` in your browser.

The local configuration file is excluded from version control.

## Project Status

JobTrack is a personal portfolio project developed to practice full-stack web development, database integration, and interactive user interfaces. The application is publicly hosted with isolated demo sessions, allowing visitors to explore its features without creating an account.

## Future Improvements

* Automated cleanup of expired demo sessions.
* Additional input validation and security hardening.
* Responsive UI refinements.
* Optional user authentication.

## Author

Developed by Konstantina Aikaterini Vasileiadi.
