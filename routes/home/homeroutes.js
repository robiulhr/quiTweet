const express = require('express')
const router = express.Router()
const homeController = require('../../controller/home/homeController')
// ------ import all midllewares
const allmiddlewares = require('../../middlewares/allmiddleware')


router.get('/', allmiddlewares.loginrequired, homeController.home)

module.exports = router