# Node.js Backend for Counter App

This is a simple backend built with Node.js for a counter app. Each time you click to increase the counter value, it is saved in a local SQLite database.

---

## Features

- **SQLite Database**: Lightweight and easy-to-setup database for storing the counter value.
- **Express Framework**: Minimal web framework for building RESTful APIs.
- **CORS Support**: Cross-Origin Resource Sharing (CORS) is enabled for interaction with frontend apps.

---

## Endpoints

### 1. Get Current Counter

- **Endpoint**: `GET /counter`
- **Description**: Fetches the current counter value.
- **Response**:
  ```json
  {
    "counter": 0
  }
  ```

2. Increment Counter
   POST /increment

Increments the current counter value by 1.

Response:

{
"counter": 1
}

Setup
Follow these steps to set up and run the Node.js backend on your local machine.

1. Prerequisites
   Make sure you have the following installed:

Node.js: Download Node.js (Tips: download NVM first)
npm: Comes bundled with Node.js 2. Installation
Clone the repository or download the code.

npm install 3. Usage
Run the server.

node server.js
Alternatively, use nodemon for automatic restarts during development:
nodemon server.js

By default, the server runs on http://localhost:3000.

Use tools like Postman, Curl, or a web browser to interact with the API endpoints:

GET /counter
POST /increment

Deployment
To deploy the backend to a cloud platform, follow the respective documentation for:

Heroku
AWS
Vercel

Development Notes

CORS Setup: CORS is enabled to allow requests from frontend applications running on different origins (e.g., localhost on a different port).
SQLite Database:
The database is initialized automatically when the server starts.
A table named counters is created if it doesn't exist.
A default counter value of 0 is inserted if no rows exist.
