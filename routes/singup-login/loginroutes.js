const express = require('express')
const router = express.Router()
const loginController = require('../../controller/singup-login/loginController')
const allmiddlewares = require('../../middlewares/allmiddleware')

router.get('/', allmiddlewares.userLogedin, loginController.getloginpage)
router.post('/', loginController.loginuser)

module.exports = router