
const express = require('express')
const router = express.Router()
const signupController = require('../../controller/singup-login/singupController')
const allmiddlewares = require('../../middlewares/allmiddleware')


router.get('/', allmiddlewares.userLogedin, signupController.getsignuppage)
router.post('/', signupController.createUser)
module.exports = router