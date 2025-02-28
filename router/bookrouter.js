const { Router } = require('express')
const authMW = require('../errorMiddleware/authMW');

const{
    get_All_book, 
    get_A_book, 
    publish_A_book, 
    update_A_book, 
    delete_A_book
} = require ('../controller/bookController');

const router = Router()
.post('/book', authMW, publish_A_book)
.get('/books', authMW, get_All_book)
.get('/book/:id', authMW, get_A_book)
.put('/book/:id', authMW, update_A_book)
.delete('/book/:id', authMW, delete_A_book)
module.exports = router
 
