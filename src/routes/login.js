// Importing required items
const express = require('express')

// Router Initialization
const router = express.Router()

// Importing functions from logincontroller
const {
    loginUser
} = require("../controllers/login.controller.js")

const refreshToken = require("../middleware/authJWT.middleware.js").refreshToken

// Login API Route
router.post('/login', loginUser)

// Refresh Token API
router.post('/refresh', refreshToken)

module.exports = router