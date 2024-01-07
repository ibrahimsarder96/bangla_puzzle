const cardIcon = document.querySelector('.icon-cart');
const cardClose = document.querySelector('.close');
const body = document.querySelector('body');
const addCart = document.querySelector('.addCart');
const listFoodHTML = document.querySelector('.listFood');
const listCartHTML = document.querySelector('.listCart');
const iconCartSpan = document.querySelector('.icon-cart span');

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
      <img class="w-64" src="${food.image}" alt="">
      <div>
        <h1 class="text-xl font-medium">${food.name}</h1>
        <p class="my-2">${food.price}</p>
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
  console.log(carts);
}

const initApp = () =>{
  // get data fetch json
  fetch('foods.json')
  .then(res => res.json())
  .then(data => {
    listFoods = data;
    addDataToHTML();  
  })
}
initApp();