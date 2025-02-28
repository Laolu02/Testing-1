
const express = require('express')
const bookRouter = require('./router/bookrouter')
const userRouter = require('./router/userrouter')
const blogRouter = require('./router/blogrouter')
const commentRouter = require('./router/commentrouter')
const connectdb = require("./db/dbcontroller")
const err = require('./errorMiddleware/errorMW')
const cookieParser = require('cookie-parser')

const app = express()

require('dotenv').config();
const port = process.env.PORT;
connectdb()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api', bookRouter) 
app.use('/api', userRouter)
app.use('/api', blogRouter)
app.use('/api', commentRouter)


app.use(err)   
app.listen(port )

console.log(err);
