// Author: Muhammad Hassaan Bashir
// Dated: 30-Sept-2023
// Description: JWT Based Authentication mechanism

// Importing required Libraries
const express = require('express'),
      app = express(),
      userRoutes = require("./routes/users.js"),
      booksRoutes = require("./routes/book.js"),
      signupRoutes = require("./routes/signup.js"),
      loginRoutes = require("./routes/login.js")

const verifyToken = require("./middleware/authJWT.middleware.js").verifyToken


const config = require('dotenv').config().parsed;
var cookieParser = require('cookie-parser')
const server_port = config.PORT;

app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
    console.log("CALLED")
});


// Initiate DB Instance
const db = require("./models");
db.sequelize.sync();

// App listening to port setup on config
app.listen(server_port, () => {
    console.log(`server is listening on port ${server_port}`)
});

// Register User route
app.use(signupRoutes)

// using user route
// app.use(userRoutes);

// Using login Route
app.use(loginRoutes)

// Using Books Route
app.use(verifyToken, booksRoutes);