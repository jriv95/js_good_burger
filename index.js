document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector('#burger-menu')
  const orderList = document.querySelector('#order-list')
  const customBurger = document.querySelector('#custom-burger')

  fetch('http://localhost:3000/burgers')
  .then(res => res.json())
  .then(burgers => burgers.forEach(burger => showBurger(burger)))

  const showBurger = (burger) => {
    burgerMenu.innerHTML += `<div class="burger" data-id="${burger.id}">
      <h3 class="burger_title">${burger.name}</h3>
        <img src=${burger.image}>
        <p class="burger_description">
          ${burger.description}
        </p>
        <button class="button" id="button-id">Add to Order</button>
    </div>`
  }

burgerMenu.addEventListener("click", e => {
  if(e.target.classList.contains('button')){
    const burgerId = e.target.parentNode.getAttribute("data-id")
    const id = parseInt(burgerId)
  fetch(`http://localhost:3000/burgers/${id}`)
  .then(res => res.json())
  .then(burger => showOrder(burger))

  }
})

const showOrder = (burger) => {
  orderList.innerHTML += `<li>${burger.name}</li>`
}

customBurger.addEventListener("submit", e => {
  e.preventDefault()
  const burgerName = document.querySelector('#burger-name').value
  const burgerDescription = document.querySelector('#burger-description').value
  const burgerImage = document.querySelector('#burger-image').value

  const burgerData = {
    name: burgerName,
    description: burgerDescription,
    image: burgerImage
  }

  fetch(`http://localhost:3000/burgers`, {
    method: 'POST',
    body: JSON.stringify(burgerData),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(burger => showBurger(burger))

})


}) // END OF DCL
