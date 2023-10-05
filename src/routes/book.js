const router = require('express').Router()

const  { 
    getBooks,
    getBook,
    createBook
} = require('../controllers/books.controller.js')

// Get Specific Book using ID
router.get('/getBook/:bookID', getBook)

// Get All Books
router.get('/getBook', getBooks)

// Create Book
router.post("/createBook", createBook)
// Exporting the routes
module.exports = router