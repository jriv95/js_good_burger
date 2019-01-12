document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here

  fetch('http://localhost:3000/burgers')
  .then(responseObject => responseObject.json())
  .then(burgersArray => {
    burgersArrayToDom(burgersArray)
  })

// Same as line 5
  // .then(responseObject => {
  //   return responseObject.json();
  // })

// Four steps of adding event delegation
  // class of menu is stable parent
  // menu.addEventListener('click')
  // conditional to make sure that each burger is chosen separately
  // show in order class
  const burgerMenuDiv = document.querySelector('#burger-menu')
  burgerMenuDiv.addEventListener('click', event => {
    if(event.target.classList.contains("button")){
      const burgerDiv = event.target.parentNode
      const id = burgerDiv.getAttribute("data-id")
      // // Fetching a Single Burger
      getSingleBurger(id)

      // // Using DOM Manipulation
      // getBurgerName(burgerDiv)
    }
  })

// Above is the Heart of Event Delegation


const burgerForm = document.querySelector('#custom-burger')
burgerForm.addEventListener('submit', e => {
    e.preventDefault();
  // console.log(e.target)
    const nameInputValue =  e.target.querySelector('#burger-name').value
    const descInputValue = e.target.querySelector('#burger-description').value
    const urlInputValue = e.target.querySelector('#burger-image').value
    

    const burgerObject = {
      name: nameInputValue,
      description: descInputValue,
      image: urlInputValue
    }
    // // OPTIMISTIC RENDERING
    // burgerMenuDiv.innerHTML += renderBurger(burgerObject)
    fetch(`http://localhost:3000/burgers`, {
      method: "POST",
      body: JSON.stringify(burgerObject),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(jsonResponse => burgerMenuDiv.innerHTML += renderBurger(jsonResponse))
  })

})






// DOM Manipulation
const getBurgerName = (nodeElement) => {
  const burgerTitle = nodeElement.querySelector(".burger_title")
  const li = document.createElement('li')
  li.innerText = burgerTitle.innerText
  document.querySelector('#order-list').append(li)
}

// Fetching a Single Burger
const getSingleBurger = (id) => {
  fetch(`http://localhost:3000/burgers/${id}`)
  .then(responseObject => responseObject.json())
  .then(burgerObject => {
    const li = document.createElement('li')
    li.innerText = burgerObject.name
    document.querySelector('#order-list').append(li)
    // render burgerDiv inside <ul> of order-list
  })
}

const burgersArrayToDom = (burgersArray) => {
  const burgerMenuDiv = document.querySelector('#burger-menu')
  burgersArray.forEach(burger => {
    burgerMenuDiv.innerHTML += renderBurger(burger)
  })
}

const renderBurger = (burger) => {
  return (`<div class="burger" data-id='${burger.id}'>
    <h3 class="burger_title">${burger.name}</h3>
      <img src=${burger.image}>
      <p class="burger_description">
        ${burger.description}
      </p>
      <button class="button">Add to Order</button>
  </div>`)
}
