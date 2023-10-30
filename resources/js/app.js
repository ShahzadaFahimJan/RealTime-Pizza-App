let addToCard = document.querySelectorAll('.add-to-cart');
import axios from 'axios';
import Noty from "noty";
import {initAdmin} from './admin'
let cartCounter = document.querySelector('.cartCounter')
function updateCard(pizza){
axios.post('/update-card',pizza).then(res =>{
    // console.log('card updated ')
    console.log(pizza)
    cartCounter.innerText = res.data.totalQty;
    console.log(res.data.totalQty)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: "New items have been added",
        progressBar: false,
      }).show();
    
}).catch(err=>{
    new Noty({
        type: 'error',
        timeout: 1000,
        text: "Something went wrong",
        progressBar: false,
      }).show();
})
}
addToCard.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        
        let pizza = JSON.parse(btn.dataset.pizza);
        //console.log(pizza)
        updateCard(pizza)


    })
})

const alertMsg = document.querySelector('#success-alert')
{
    if(alertMsg){
        setTimeout(()=>{
            alertMsg.remove();
        },2000)
    }
}
initAdmin()