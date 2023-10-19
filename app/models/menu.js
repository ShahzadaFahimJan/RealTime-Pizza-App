const mongoose = require("mongoose");
const MenuShema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    size:{
        type: String,
        required: true,
    }
})
const Menu = mongoose.model('Menu',MenuShema);
module.exports = Menu;