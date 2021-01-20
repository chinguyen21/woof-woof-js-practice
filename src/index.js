

document.addEventListener("DOMContentLoaded", () => {
  const filter = document.querySelector("#good-dog-filter")
  getPups();
  filter.addEventListener('click', () => showGoodDog(filter))
})

const showGoodDog = (filter) => {
  console.log(filter)
  if (filter.innerText === "Filter good dogs: OFF") {
    filter.innerText = "Filter good dogs: ON"
    document.querySelector("#dog-bar").childNodes.forEach(child => {
      if (child.id === "bad") {
        child.style.display = "none"
      }
    })
  } else {
    filter.innerText = "Filter good dogs: OFF"
    document.querySelector("#dog-bar").childNodes.forEach(child => {
      if (child.id === "bad") {
        child.style.display = "flex"
      }
    })
  } 
}

const getPups = async () => {
  const res = await fetch("http://localhost:3000/pups");
  const pups = await res.json();
  pups.forEach(pup => renderPup(pup));
}

const renderPup = (pup) => {
  let div = document.querySelector("#dog-info");

  let img = document.createElement('img');
  img.src = pup.image;
  img.style.display = "none"

  let h2 = document.createElement('h2');
  h2.innerText = pup.name;
  h2.style.display = "none"
  
  let button = document.createElement('button')
  button.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"
  button.style.display = "none"
  
  div.append(img, h2, button)

  
  let div1 = document.querySelector("#dog-bar");

  let span = document.createElement('span')
  span.id = pup.isGoodDog ? "good" : "bad"
  span.innerText = pup.name
  span.style.display = "flex"
  span.addEventListener('click', () => {
      for (let i = 1; i < div.childNodes.length; i++) {
        div.childNodes[i].style.display = "none"
      }
    img.style.display = "block"
    h2.style.display = "block"
    button.style.display = "block"
    
    button.addEventListener('click', () => {
      if (button.innerText === "Good Dog!"){
        button.innerText = "Bad Dog!"
        span.id = "bad"
        span.style.display = "none"
        let g_b = false
        toggleDog(pup, g_b)
      } else {
        button.innerText = "Good Dog!"
        span.id = "good"
        span.style.display = "flex"
        let g_b = true
        toggleDog(pup, g_b)
      }
    })

  })
  div1.appendChild(span)
}


const toggleDog = (pup, g_b) => {
  updateDog = {
    isGoodDog: g_b
  }

  let reqPackage = {
    headers: {"Content-Type": "application/json"},
    method: "PATCH",
    body: JSON.stringify(updateDog)
  }

  fetch(`http://localhost:3000/pups/${pup.id}`, reqPackage)
  .then(req => req.json())
  .then()

}
