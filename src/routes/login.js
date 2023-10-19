// Importing required items
const express = require('express')

// Router Initialization
const router = express.Router()

const token_middleware = require('../middleware/tokenValidator.middleware.js')

// Importing functions from logincontroller
const {
    loginUser
} = require("../controllers/login.controller.js")

const refreshToken = require("../middleware/authJWT.middleware.js").refreshToken
// const redis_client = require("../middleware/tokenBlValidator.middleware.js").setCacheData

// Login API Route
router.post('/login', loginUser)

// Refresh Token API
router.post('/refresh', token_middleware.getTokenFromDB, token_middleware.setTokenInDB, refreshToken)

module.exports = router