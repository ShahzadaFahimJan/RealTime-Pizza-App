const Menu = require('../../models/menu');
function homeController(){
   
    return{
        async index(req,res){
            // res.render('home')
            const pizzas = await Menu.find();
          //  Menu.find().then((pizzas)=>{
               // console.log(pizzas)
                res.render('home',{pizzas: pizzas})
             //  })
        }
    }
}
module.exports = homeController