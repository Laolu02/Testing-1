const {Router} = require('express')
const authMW = require('../errorMiddleware/authMW')
const { post_comment, get_A_blog_comment } = require('../controller/commentController')


const router = Router()
    .post('/blog/comment/:id', authMW, post_comment)
    .get('/blog/comment/:id', authMW, get_A_blog_comment)


module.exports = router    