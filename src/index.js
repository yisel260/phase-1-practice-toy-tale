let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


document.addEventListener('DOMContentLoaded', function (){
  getToys();

  //render all toys to DOM 
function getToys(){
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toyData => {
      let toyCollection = document.getElementById('toy-collection');
      for (const toy of toyData) {
        let card = document.createElement('div');
        card.classList.add('card');
        renderOneToy(card, toy);
        toyCollection.appendChild(card);
      }
      initializeLikeButtons();
    });
}

function renderOneToy(card, toy){
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `;
  card.id = toy.id;
}

// Add a toy using the form 

const addToyButton =document.querySelector(".add-toy-form")
addToyButton.addEventListener('submit', function(event){
  event.preventDefault()
  handleSubmit()
})


function handleSubmit() {
 
  const name = document.querySelector('input[name ="name"').value;
  const image = document.querySelector('input[name="image"').value;
  const toy = {
    name: name,
    image: image,
    likes: 0
  };

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
    .then(res => res.json())
    .then(newToy => {
      let card = document.createElement('div');
      card.classList.add('card');
      renderOneToy(card, newToy);
      document.getElementById('toy-collection').appendChild(card);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


//Update Toy likes 

//Add event listener to buttons 

function initializeLikeButtons() {
  const likeButtons = document.querySelectorAll(".like-btn")
  
  likeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const toyID = button.id;
      const pElement = button.previousSibling.previousSibling.textContent
      const toy = {id:toyID,
      likes : parseInt(pElement)}
      updateLikes(toy);
    });
  });
}




function updateLikes(toy) {
  toy.likes += 1
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
    .then(res => res.json())
    .then(updatedToy => {
      const toyElement = document.getElementById(updatedToy.id);
      const likesElement = toyElement.querySelector("p");
      likesElement.textContent = `${updatedToy.likes} Likes`;
    })
    .catch(error => {
      console.error('Error:', error);;

    })
  }
})
    