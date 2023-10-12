const express = require("express")
const app = express();
const path = require("path")
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts")
const webRoute = require("./routes/web")
// app.use(expressLayout)
app.use("/",webRoute)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, './resources/views'))

// app.get('/', (req,res)=>{
//     res.render("home")
// })


const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})