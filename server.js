require('dotenv').config()
const express = require("express")
const app = express();
const path = require("path")
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts")
const webRoute = require("./routes/web")
const session = require("express-session")
const flash = require("express-flash")

//database connection 
 require('./db/conn')



//middleware session 
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(flash());
app.use(expressLayout)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, './resources/views'))
app.use(express.static('public'))
//routes 
app.use("/",webRoute)
// app.get('/', (req,res)=>{
//     res.render("home")
// })



const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})