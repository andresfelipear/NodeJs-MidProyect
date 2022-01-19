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
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use(adminRoute)
app.use(authRoute)

// //page 404
// app.use((req,res,next)=>{
//     res.status(404).render('404', {titlePage:'Page Not Found'})
// })

const PORT = process.env.PORT || 8000

mongoose.connect(process.env.MONGODB_URL, ()=>{
    app.listen(PORT)
    console.log(`listen PORT ${PORT}`);
})