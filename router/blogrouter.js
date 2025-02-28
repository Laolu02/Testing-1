const { Router} = require('express')
const authMW = require('../errorMiddleware/authMW')
const {post_A_blog, get_A_blog, get_A_User_blog, get_All_blogs, get_blogs_by_query} = require('../controller/blogContoller')

const router = Router()
    .post('/blog', authMW, post_A_blog)
    .get('/blog',get_A_blog)
    .get('/user/blog/:id', authMW, get_A_User_blog)
    .get('/blogs', get_All_blogs)
    .get('/blog/query', get_blogs_by_query)


module.exports = router