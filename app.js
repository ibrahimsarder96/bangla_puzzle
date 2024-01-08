const cardIcon = document.querySelector('.icon-cart');
const cardClose = document.querySelector('.close');
const body = document.querySelector('body');
const addCart = document.querySelector('.addCart');
const listFoodHTML = document.querySelector('.listFood');
const listCartHTML = document.querySelector('.listCart');
const listSingleCartHTML = document.querySelector('.singleCart');
const iconCartSpan = document.querySelector('.icon-cart span');
const foodItem = document.querySelector('.foodItem');

let listFoods = [];
let carts = [];

cardIcon.addEventListener('click', () =>{
  body.classList.toggle('showCart');
});
cardClose.addEventListener('click', () =>{
  body.classList.toggle('showCart');
});

// add food HTML
const addDataToHTML = () =>{
  listFoodHTML.innerHTML = '';
  if(listFoods.length > 0){
    listFoods.forEach(food =>{
      let newFood = document.createElement('div')
      newFood.classList.add('item');
      newFood.dataset.id = food.id;
      newFood.innerHTML = `
      <img class="w-64 h-44" src="${food.image}" alt="">
      <div>
        <h1 class="text-xl font-medium">${food.name}</h1>
        <p class="my-2">$ ${food.price}</p>
        <p>${food.des}</p>
      </div>
      <button class="addCart py-3 mx-auto w-full bg-red-500 text-white text-xl font-medium my-4">Add to Order</button>
      <button class="py-3 mx-auto w-full border-2 border-red-500 text-red-500 text-xl font-medium">Add to Order</button>
      `
      listFoodHTML.appendChild(newFood);
    })
  }
}
listFoodHTML.addEventListener('click', (event) =>{
  let positionClick = event.target;
  if(positionClick.classList.contains('addCart')){
    let food_id = positionClick.parentElement.dataset.id;
    console.log(event);
    addToCart(food_id);
  }              
})

const addToCart = (food_id) =>{
  let positionThisFoodInCart = carts.findIndex((value) => value.food_id == food_id);
  if(carts.length <= 0){
    carts = [{
      food_id: food_id,
      quantity: 1
    }]
  }else if(positionThisFoodInCart < 0){
    carts.push({
      food_id: food_id,
      quantity: 1
    })
  }else{
    carts[positionThisFoodInCart].quantity = carts[positionThisFoodInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
}

const addCartToMemory = () =>{
  localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () =>{
  listSingleCartHTML.innerHTML = '';
  let totalQuantity = 0;
  if(carts.length > 0){
    carts.forEach(cart => {
      totalQuantity = totalQuantity + cart.quantity;
      let newCart = document.createElement('div');
      newCart.classList.add('singleCart');
      newCart.dataset.id = cart.food_id;
      let positionFood = listFoods.findIndex((value) => value.id == cart.food_id);
      let info = listFoods[positionFood];
      newCart.innerHTML = `
      <div class=" relative mt-14 mx-5 flex items-center space-x-4 border-2 border-white rounded-md">
      <div>
        <img class="w-20 h-36 ml-2" src="images/food/img1.jpg" alt="">
      </div>
      <div class="my-4">
        <h1 class="text-white text-xl">${info.name}</h1>
        <p class="text-white mb-2">${info.price * cart.quantity}</p>
        <div class="flex">
          <button>
            <span class="minus bg-gray-200 px-2 py-1 text-xl">-</span>
            </button>
            <span class="bg-white py-1 px-4"></span>
            <button>
              <span class="plus bg-gray-200 px-2 py-1 text-xl">+</span>
              </button>
        </div>
        <p class="ml-16 mt-3 text-white">${info.price}</p>
      </div>
      <i class="fa fa-trash-o mr-8 p-2 rounded-md bg-white text-red-500 absolute -right-4 -top-4" style="font-size:26px"></i>
</div>
      `;
      listCartHTML.appendChild(newCart);
    })
  }
  iconCartSpan.innerText = totalQuantity;
  foodItem.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event)=>{
  let positionClick = event.target;
  if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
    let food_id = positionClick.parentElement.dataset.id;
    let type = 'minus';
    if(positionClick.classList.contains('plus')){
      type = 'plus';
    }
    changeQuantity(food_id, type);
  }
})
const changeQuantity = (food_id, type) =>{
  let positionItemInCart = carts.findIndex((value) => value.food_id == food_id);
  if(positionItemInCart >= 0){
    switch(type){
      case 'plus':
        carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
        break;
        default:
          let valueChange = carts[positionItemInCart].quantity - 1;
          if(valueChange > 0){
            carts[positionItemInCart].quantity = valueChange;
          }else{
            carts.splice(positionItemInCart, 1)
          }
          break;
    }
  }
  addCartToMemory();
  addCartToHTML();
}

const initApp = () =>{
  // get data fetch json
  fetch('foods.json')
  .then(res => res.json())
  .then(data => {
    listFoods = data;
    addDataToHTML(); 
    
    // get data local storage
    if(localStorage.getItem('cart')){
      carts = JSON.parse(localStorage.getItem("cart"))
      addCartToHTML();
    }
  })
}
initApp();