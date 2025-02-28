const err = require('../errorMiddleware/errorMW')
const bookModel = require('../model/bookModel')
const userModel = require('../model/userModel')

const publish_A_book = async (req, res, next) => {
    const username = req.user
    try {
        const user = await userModel.findById(username)
        if (!user) {
            return res.status(404).json({message: 'user not found'})
        }
        const newBook = new bookModel({...req.body, userId: username})
        const createdBookwithuserId = await newBook.save();
        user.publications.push[createdBookwithuserId._id]
        await user.save()
        res.status(200).json({createdBookwithuserId})
    } catch (error) {
        next(err)
        console.log(error);

        
    }
    
}

const get_All_book = async (req, res) => {
    const author = req.author
    try {
        const books = await bookModel.find(author)
        res.status(200).json(books)
    } catch (error) {
        console.log(error);
          
    }
}

const get_A_book = async (req, res) => {
    const {id} = req.params
    try {
        const book = await bookModel.findById(id)
        if (!book) {
            return res.json({Message : " Book not found"}).status(404)
        }
        res.json(book).status(200)
    } catch (error) {
        console.log(error);
        
    }
    
}

const update_A_book = async (req, res, next) => {
    const updates = req.body
    const {id} = req.params
    const userId = req.user
    
    try {
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({message: 'User not found'}) 
        }
        const book = await bookModel.findById(id)
        if (!book) {
            return res. status(404).json({message: ' Book not found'})
        }
        if (!userId || !id) {
            return res.status(401).json({message: 'Unauthorized action'})
        }
        if (!book.userId || !userId._id) {
            return res.status(403).json({message: 'Book not found'})
        }
        const updateBook = await bookModel.findByIdAndUpdate(id, updates, {new: true, runValidators: true})
        if (!updateBook) {
            return res.json({Message : ' Update not done'}).status(404)
        }
        await updateBook.save()
        res.json(updateBook).status(200)
    } catch (error) {
        next(error)
        console.log(error);
        
        
    }
    
}


const delete_A_book = async (req, res, next) => {
    const {id} = req.params
    const requestUserId = req.user
    try {
        const user = await userModel.findById(requestUserId)
        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }
        const book = await bookModel.findById(id)
        if (!book) {
            return res. status(404).json({message: ' Book not found'})
        }

        if (!book.userId || book.userId.toString() !== requestUserId.id) {
            return res.status(403).json({message: 'Unauthorized action'})
        }
        const deleteBook = await bookModel.findByIdAndDelete(id)
        if (!deleteBook) {
            return res.status(404).json({Message : ' Book not found'})
            
        }
        res.json(bookModel).status(200)
    } catch (error) {
        next(error)
        console.log(error);
        
    }
    
}

/*function (req, res) {
    const{ booksName, author, price, YearofPublication,} = req.body
    const generateId= bookshelf.length +1

    const newBook = { id: generateId, booksName, author, price, YearofPublication}
    bookshelf.push(newBook)
    res.status(200).json(bookshelf)
    
    
}*/
module.exports = {publish_A_book, get_All_book, get_A_book, update_A_book, delete_A_book}