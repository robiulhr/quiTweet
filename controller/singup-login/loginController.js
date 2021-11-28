const express = require('express')
const app = express()
const userModel = require('../../db/userSchema')
const bcrypt = require('bcrypt');
class loginController {
    //---------handling get request to login route
    static getloginpage(req, res) {
        res.render('login')
    }
    //---------handling post request to login route
    static async loginuser(req, res) {
        if (req.body.username.trim() != '' && req.body.password != '') {
            let { username, password } = req.body
            //
            let finduser = await userModel.find({ username: username })
            //--------- checking the user exist or not
            if (finduser.length != 0) {
                //--------- checking the user's password
                bcrypt.compare(password, finduser[0].password, function (err, result) {
                    if (!err) {
                        if (result === true) {
                            //-------creating login sesion
                            const Logedinuser = { userid: finduser[0].id, username: finduser[0].name, useremail: finduser[0].email }
                            req.session.Logedinuser = Logedinuser
                            res.redirect('/')
                        } else {
                            res.render('login', { passwordEncorrect: "You entered a incorrect password" })
                        }
                    }
                })
            } else {
                res.render('login', { UsernotExist: "This user not exist" })
            }
        } else {
            res.render('login', { enterValidProperty: "Please enter valid property" })
        }
    }
}
module.exports = loginController