// // server.js
// const express = require('express');
// const sqlite3 = require('sqlite3').verbose();
// const app = express();
// const port = 3000;

// https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/

import cors from 'cors';
import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Enable CORS for web
app.use(cors());

// Enable verbose mode for sqlite3, helpful for debugging
sqlite3.verbose();

// Determine the directory of this script to store the SQLite file in the same folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'database.db');

// Initialize the database
// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    
    // Create a table named "counters" to store our counter value
    db.run(`
      CREATE TABLE IF NOT EXISTS counters (
        id INTEGER PRIMARY KEY,
        value INTEGER
      )
    `, () => {
      // Check if the row with ID 1 exists, insert if not
      db.get(`SELECT id FROM counters WHERE id = 1`, (err, row) => {
        if (!row) {
          db.run(`INSERT INTO counters (id, value) VALUES (1, 0)`);
        }
      });
    });
  }
});
  
// Middleware to parse JSON
app.use(express.json());

// Endpoint to get the current counter value
app.get('/counter', (req, res) => {
  db.get(`SELECT value FROM counters WHERE id = 1`, (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      // Respond with the current counter value or 0 if no row exists
      res.json({ counter: row ? row.value : 0 });
    }
  });
});

//* belowe code is another way 
// db.get(`SELECT COUNT(*) as count FROM counters`, (err, row) => {
//   if (row.count === 0) {
//     db.run(`INSERT INTO counters (value) VALUES (0)`);
//   }
// });
// This query checks if the table is empty by counting the rows.
// If the result (row.count) is 0, it means no rows exist, so a new row is inserted with the value 0.

//SELECT COUNT(*) as count FROM counters
// This query is asking: "How many rows exist in the counters table?"
// The * means "all columns" — it counts all rows regardless of the specific column.


// Endpoint to increment the counter
app.post('/increment', (req, res) => {
  db.run(`UPDATE counters SET value = value + 1 WHERE id = 1`, function (err) {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      db.get(`SELECT value FROM counters WHERE id = 1`, (err, row) => {
        if (err) {
          res.status(500).json({ error: 'Database error' });
        } else {

// Why counter Can Be Used Without Quotes
// In JavaScript, when creating objects (like the one in your code), the keys don't need to be quoted if they follow these rules:

// The key is a valid JavaScript identifier:

// It consists of only letters, digits, $, or _.
// It doesn’t start with a digit.
// It’s not a reserved keyword in JavaScript.
// For example:

// javascript
// const obj = { counter: 42 }; // Valid, no quotes needed.
// console.log(obj.counter); // Accesses the value (42)
// Quotes are required if the key includes special characters or spaces: For example:
// const obj = { "counter-value": 42 }; // Quotes are needed
// console.log(obj["counter-value"]); // Accesses the value (42)
          res.json({ counter: row.value });
        }
      });
    }
  });
});

// Start the server, run node server.js or nodemon server.js
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//copy and paste this " curl http://localhost:3000/counter "in terminal or "http://localhost:3000/counter" in browser to get the current counter value
//backend server should now be running on http://localhost:3000, with two endpoints:

// GET /counter: Returns the current counter value.
// POST /increment: Increments the counter and returns the updated value.

//For Android Emulator, use http://10.0.2.2:3000. This is a special IP address that allows the emulator to access the host machine's localhost.

//For iOS Simulator, localhost should work, but if it doesn’t, try using your machine’s IP address. You can find your IP address by running ifconfig on macOS or ipconfig on Windows.

//For Web, we need to Enable CORS.
//* study notes:
// Localhost and Port: http://localhost:${port} is a URL format where localhost refers to your local machine, and ${port} is the port number your server is running on. This lets your machine access the server via a unique address (combination of localhost and port)

//When you run a Flutter app with a backend server:

// Web: When you see a URL like http://localhost:xxxx in the browser, it’s simply the web address for your Flutter web application running locally. This URL is just for the web app itself and does not connect to a backend server unless you explicitly set up and connect to one.
// Mobile App: A Flutter mobile app doesn’t need a URL to function on a device. It runs locally and uses the device’s resources without an external connection unless you add one (e.g., by calling an API). For basic functionality (like UI elements and animations), no backend server is required.

//In a real deployment:

// Server Hosting: You’d host your backend server on a cloud provider or server hosting service (like AWS, DigitalOcean, or Heroku).
// Public URL: Your server would have a public URL, like https://api.flutter_counter.com. When deployed, you won’t use localhost:3000; instead, you’ll use this public domain for API calls.
// Endpoints: You’d define endpoints such as https://api.flutter_counter.com/counter and https://api.flutter_counter.com/increment.
// These endpoints are set up on the backend to handle specific functions (e.g., fetching and updating data).
// Domain Setup: Yes, you’d register a domain for your project if needed, such as flutter_counter.com, and configure subdomains like api.flutter_counter.com for your backend.

//Runing on web:

// Flutter web app is served on one port (e.g., http://localhost:51726), and your backend is running on another port (http://localhost:3000). This is where CORS (Cross-Origin Resource Sharing) comes into play.
// 1. How the URLs Work
// Frontend (Flutter Web App):

// The Flutter web app is hosted by a development server (using flutter run -d chrome) on a random port, like http://localhost:51726.
// This server only serves your frontend files (HTML, CSS, JavaScript).
// Backend (Node.js Server):

// Your backend server is running separately on http://localhost:3000.
// It handles API requests (e.g., /counter or /increment).
// The two servers (51726 and 3000) have different origins (different ports), and the browser considers them as separate domains.

// 2. Why CORS Blocks It
// The browser blocks requests from http://localhost:51726 to http://localhost:3000 because:

// Same-Origin Policy: For security, browsers prevent frontend code from accessing resources on a different origin unless the backend explicitly allows it.
// A different origin is defined by having a different protocol, domain, or port. Even though both use localhost, their ports (51726 vs. 3000) are different, so the browser enforces CORS.

//npm install cors

//1. For Local Development
// If you are running the backend on your local machine:
// For the same machine (localhost): Use http://127.0.0.1:3000 or http://localhost:3000.

// Example: When testing your app from your local browser or emulator.
// For Android Emulator: Use http://10.0.2.2:3000 because 10.0.2.2 is a special IP address that the Android emulator uses to access the host machine.

// For iOS Simulator: Use http://localhost:3000. The iOS simulator can access your machine's localhost directly.

// For Other Devices on the Same Network: Find your local IP address:

// On macOS: Run ifconfig in the terminal, and look for inet under en0 (your active network interface).
// On Windows: Run ipconfig in the Command Prompt.
// Example IP: http://192.168.1.66:3000.
// Use the IP address from the above step as the backend URL if testing from another device.

// 2. For Deployed Servers
// If your backend is deployed to a cloud hosting provider or a server (e.g., AWS, Heroku, Vercel):
// Your backend will have a public domain or IP address.
// Example:
// AWS: https://your-backend-app.amazonaws.com
// Heroku: https://your-backend-app.herokuapp.com
// Vercel: https://your-backend-app.vercel.app
// Replace http://127.0.0.1:3000 with the deployed backend URL.
