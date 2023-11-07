let addToCard = document.querySelectorAll('.add-to-cart');
import axios from 'axios';
import Noty from "noty";
import {initAdmin} from './admin'
import {initStripe} from './stripe'
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




// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}

updateStatus(order);

//Ajax call
initStripe();


let socket = io('http://localhost:8000', {
    transports: ['websocket'],
});
initAdmin(socket)
socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
});

socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
});

// Join
if(order) {
    socket.emit('join', `order_${order._id}`)
}
let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')) {
    initAdmin(socket)
    socket.emit('join', 'adminRoom')
}


socket.on('orderUpdated', (data) => {
    console.log(data)
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
    }).show();
})