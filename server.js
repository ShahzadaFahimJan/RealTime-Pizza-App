// require('dotenv').config()
// const express = require("express")
// const app = express();
// const path = require("path")
// const ejs = require("ejs");
// const expressLayout = require("express-ejs-layouts")
// const webRoute = require("./routes/web")
// const session = require("express-session")
// const flash = require("express-flash")
// const MongoDbStore = require("connect-mongo")
// const mongoose = require("mongoose")
// const passport = require("passport")
// //database connection 
//  const dbconnection=require('./db/conn')
// // passport configuration


// const passPortInit = require('./app/config/passport')
// passPortInit(passport)
// app.use(passport.initialize())
// app.use(passport.session())
// const store = MongoDbStore.create({
//     mongoUrl: 'mongodb://localhost/pizza',
//     crypto: {
//       secret: 'squirrel'
//     }
//   })

// //middleware session 
// app.use(session({
//     secret: 'secretkey',
//     resave: false, 
//     store: store,
//     saveUninitialized: false,
//     cookie: { maxAge: 1000 * 60 * 60 *24 }
// }));
// //global middleware 
// app.use((req,res,next)=>{
//   res.locals.session = req.session;
//   next();
//   })
// app.use(flash());
// app.use(expressLayout)
// app.use(express.urlencoded({extended: false}))
// app.use(express.json())
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, './resources/views'))
// app.use(express.static('public'))

// //routes 
// app.use("/",webRoute)
// // app.get('/', (req,res)=>{
// //     res.render("home")
// // })







// // ... (rest of your code)


// const PORT = process.env.PORT || 8000;
// app.listen(PORT,()=>{
//     console.log(`server is running at ${PORT}`)
// })
require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const webRoute = require("./routes/web");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");
const mongoose = require("mongoose");
const passport = require("passport");

// Database connection
const dbconnection = require('./db/conn');

// Passport configuration
const passPortInit = require('./app/config/passport');
passPortInit(passport);

// Setup express-session middleware
const store = MongoDbStore.create({
    mongoUrl: 'mongodb://localhost/pizza',
    crypto: {
        secret: 'squirrel'
    }
});

app.use(session({
    secret: 'secretkey',
    resave: false,
    store: store,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Initialize Passport.js after session middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(expressLayout);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, './resources/views'));
app.use(express.static('public'));

// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

// Routes
app.use("/", webRoute);

// ... (rest of your code)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
