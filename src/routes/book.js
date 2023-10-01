const router = require('express').Router()
const verifyToken = require("../middleware/authJWT.middleware.js").verifyToken

const  { 
    getBooks,
    getBook,
    createBook
} = require('../controllers/books.controller.js')

// Get Specific Book using ID
router.get('/getBook/:bookID', verifyToken, getBook)

// Get All Books
router.get('/getBook', verifyToken, getBooks)

// Create Book
router.post("/createBook",  verifyToken, createBook)
// Exporting the routes
module.exports = router