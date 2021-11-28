const userModel = require('../../db/userSchema')
const bcrypt = require('bcrypt');

class signupController {
    //-------------- hendle get request on signup route 
    static getsignuppage(req, res) {
        res.render('signup')
    }
    //-------------- hendle post request on signup route 
    static async createUser(req, res) {

        // -------- checking two password feild match or not
        if (req.body.createpassword === req.body.conformpassword) {
            //--------------cheking all feild value validity
            if (req.body.name.trim() != '' && req.body.email.trim() != '' && req.body.username.trim() != '' && req.body.createpassword != '' && req.body.conformpassword != '') {
                // encrypting password
                bcrypt.hash(req.body.createpassword, 12, async (err, hashedpassword) => {
                    // destructuring all data
                    let [name, username, email, password] = [req.body.name.trim(), req.body.username.trim(), req.body.email.trim(), hashedpassword]
                    // ---- create new user 
                    let userExist = await userModel.find({
                        $or: [
                            { username: username },
                            { email: email }
                        ]
                    })
                    //----------checking this user already exist or not
                    if (userExist.length !== 0) {
                        res.render('signup', { userExist: "Your email and username must be Unique" })
                    } else {
                        let newUser = new userModel({
                            name: name,
                            username: username,
                            email: email,
                            password: password
                        })
                        // ---- save new user
                        newUser.save((err) => {
                            if (err) console.log(err)
                        })
                        // ------- redirect to login page
                        res.redirect('/login')
                    }
                });


            } else {
                res.render('signup', { enterValidProperty: "Please enter valid property" })
            }
        } else {
            res.render('signup', { PasswordFeilsdmatching: "Please provide same password two times" })
        }



    }
}

module.exports = signupController