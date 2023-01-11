import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
const orderDetail = document.getElementById('order-details')
const paymentForm = document.getElementById('payment-form')
const modal = document.getElementById('modal-payment-form')
const payBtn = document.getElementById('pay-btn')
let total = 0
let ordersArray =[]


document.addEventListener('click',function(e){
    if(e.target.dataset.addbtn){
        handelAddItemClick(e.target.dataset.addbtn)
    }else if (e.target.dataset.remove){
        handelRemoveItemClick(e.target.dataset.remove)
    }else if (e.target.dataset.complete){
        handelCompleteOrderClick()
    }else if(e.target.dataset.rate){
        handleRateService()
    }
})

function handleRateService(){
    document.getElementById('modal-confirmation-order').style.display = 'none'
}

function handelCompleteOrderClick(){
    modal.style.display = 'inline'
}

payBtn.addEventListener('click', function(){
    const paymentFormData = new FormData(paymentForm)
    const fullName = paymentFormData.get('fullName')
    bringFinalMsg()
    document.getElementById('confirmation-msg').textContent = "Thanks, "+ fullName +" your order is on it´s way"
})

function bringFinalMsg(){
    modal.style.display = 'none'
    document.getElementById('modal-confirmation-order').style.display = 'inline'
}

function handelAddItemClick(selectedItemId){
    /*let selectedItem = ''*/
    const targetItemObj = menuArray.filter(function(item){
        return item.id === parseInt(selectedItemId)
    })[0]

    const orderObj = {
        name: targetItemObj.name,
        price: targetItemObj.price,
        id: uuidv4()
    }
    ordersArray.push(orderObj)
   
   getOrderHtml()
   renderOrder()
}

function getOrderHtml(){
    let price = 0
    let selectedItem = ''
    ordersArray.forEach(function(order){
        price += order.price
        selectedItem +=`
        <div>
            <div class="selected-item">
                <div class="item-remove-container">
                    <p class="selected-item-name">${order.name}</p>
                    <button class="remove-btn" data-remove=${order.id}>remove</button>
                </div>
                <p class="selected-item-price">$ ${order.price}</p>
            </div>
        </div>
    `
    })
    total = price
    return selectedItem
}


function handelRemoveItemClick(removeId){
    const targetItemObj = ordersArray.filter(function(item){
        return item.id === removeId
    })[0]
    const deletedObj = ordersArray.indexOf(targetItemObj)
    delete ordersArray[deletedObj]
    renderOrder()
}

function renderOrder(){    
    orderDetail.innerHTML = getOrderHtml()
    document.getElementById('final-price').innerText = '$'+total
}




function getFeedHtml(){
    let feedHtml = ''
    menuArray.forEach(function(menuItem){
        feedHtml += `
        <div class="item-container">
            <div class="emoji-container">
                <p class="item-emoji">${menuItem.emoji}</p>
            </div>
            <div class="item-detail">
                <p class="item-name">${menuItem.name}</p>
                <p class="item-ingredients">${menuItem.ingredients}</p>
                <p class="item-price">${menuItem.price}</p>
            </div>
            <div class="btn-container">
                <button class="add-btn" data-addbtn="${menuItem.id}">+</button>
            </div>
        </div>
        `
    })

    return feedHtml
}

function render(){
    document.getElementById('items-feed').innerHTML = getFeedHtml()
}

render()