const model = require("../models")
const sequelize = model.sequelize
const Books = model.books

// Get All Books
const getBooks = (async(req, res) => {
    data = await Books.findAll()
    res.status(200).json({
        status: 200,
        data: data
    })
})


// Get Book
const getBook = (async(req, res) => {
    try {
        console.log(req.params)
        const id = Number(req.params.bookID)
        const book = await Books.findOne({
            where: {
                id
            }
        })
        if (!book) {
            return res.status(404).json({
                statu: 404,
                message: 'Book not found'
            })
        }
        res.status(200).json({
            statu: 200, 
            data: book
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json(error);
    }
})

// CreateBook function
const createBook = (async(req, res) => {
    try {
        const title = req.body.title
        const author = req.body.author

        if (!title && !author) {
            return res.status(400).json({
                status: 400,
                message: "Please pass both title and author of Book"
            });
        }

        const book = await Books.findOne({
            where: {
                title,
                author
            }
        })

        if (!book) {
            const result = await sequelize.transaction(async (t) => {
                const bookData = await Books.create({
                    title: title, 
                    author: author
                }, { transaction: t });
                return bookData;        
            });
            
            return res.status(200).json({
                status: 200,
                message: `Book ${result.dataValues.title} created Successfully`,
                book: result
            });
        } else {
            return res.status(409).json({
                status: 409,
                message: `Book already existed`,
                book: book
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
})
// Exporting functions
module.exports = {
    getBooks,
    getBook,
    createBook
}