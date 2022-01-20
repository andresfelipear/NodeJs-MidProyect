require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')


//routes imports
const adminRoute = require('./routes/admin.route')
const authRoute = require('./routes/auth.route')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//session
app.use(session({
    secret: 'thisIsaSuperSecretString',
    resave: false,
    saveUninitialized: false,
}))

//middleware
app.use('/admin/', (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/')
    }
    else {
        next();
    }
})

//routes
app.use((req, res, next) => {
    res.locals.isAuth = req.session.isLoggedIn
    next()
})
app.use('/admin', adminRoute)
app.use(authRoute)


//page 404
app.use((req, res, next) => {
    res.status(404).render('404', { titlePage: 'Page Not Found', session: req.session.hasOwnProperty('user') ? req.session : false })
})

const PORT = process.env.PORT || 8000

mongoose.connect(process.env.MONGODB_URL, () => {
    app.listen(PORT)
    console.log(`listen PORT ${PORT}`);
})
