const { Router } = require("express");
const { signup, login, allUser, delete_A_User, update_A_User, profileupdate } = require("../controller/userController");
const authMW = require("../errorMiddleware/authMW");


const router = Router()
  .post('/user/signup', signup)
  .post('/user/login', login)
  .get('/users', allUser)
  .delete('/user/delete/:id', authMW, delete_A_User)
  .put('/user/update/:id', authMW, update_A_User)
  .put('user/profile/:id', authMW, profileupdate)

  module.exports = router


