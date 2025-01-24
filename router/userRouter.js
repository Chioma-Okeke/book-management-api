const {Router} = require('express')
const { signup, login } = require('../controller/userController')

const router = Router()

.post("/user/signup", signup)
.post("/user/login", login)

module.exports = router