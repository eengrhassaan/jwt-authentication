// Importing required items
const express = require('express')

// Router Initialization
const router = express.Router()

// Importing functions from logincontroller
const {
    registerUser
} = require("../controllers/signup.controller")

// Register user API Route
router.post('/register', registerUser)

// Exporting Router
module.exports = router