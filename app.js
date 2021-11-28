const express = require('express')
const app = express()

// port number 
const PORT = process.env.PORT || 3000
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/twetter_clone'
//------------ tamplate engine
app.set('view engine', 'ejs');
//--------serve static file
app.use(express.static('public'))
// access form data
app.use(express.urlencoded({ extended: false }));
//------- session setup  
const cookieParser = require('cookie-parser');
const session = require('express-session')
const LOGIN_SEASION_SECRET = process.env.SEASION_SECRET || 'voihasdjkgnsdgoiuafpujhasdjklbaiogujasioghah'
app.use(cookieParser());
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: LOGIN_SEASION_SECRET,
    resave: false,
    saveUninitialized: true
}))
//import database connection function
const dbconnection = require('./db/mongodbConnect')
dbconnection(DB_URL)

//------ import all routes
const homeRoutes = require('./routes/home/homeroutes')
const loginRoutes = require('./routes/singup-login/loginroutes')
const signupRoutes = require('./routes/singup-login/signuproutes')
//------all routes

app.use('/', homeRoutes)
// ----- login routes
app.use('/login', loginRoutes)
// ----- signup routes

app.use('/signup', signupRoutes)


app.listen(PORT, () => {
    console.log("server is running in port " + PORT);
})
