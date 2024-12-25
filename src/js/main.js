"use strict";

// SECCIÓN QUERY SELECTOR

const charactersUl = document.querySelector(".js_charactersUl");

const favoritesUl = document.querySelector(".js_favoritesUl");

const btnSearch = document.querySelector(".js_btnSearch");

const searchInput = document.querySelector(".js_searchInput");

const charactersFav = document.querySelector(".js_favorites_characters");

const characters = document.querySelector(".js_characters");

const btnDelete = document.querySelector(".js_btndelete");

// Implementar Dom Avanzado

const header = document.querySelector(".js_header");

const image = document.createElement("img");

image.className = "header_img";
image.src = "./images/castillo-de-disneyland-q1m7w5s7yhgo7r1d.jpg";
image.alt = "castillo disney de noche";
image.id = "image01";
image.dataset.invent = "imagen001";

header.appendChild(image);

// ARRAYS

let allCharacters = [];
let favorites = [];

// SECCIÓN DE LAS FUNCIONES

const renderOneCharacters = (charactersObj, classFavorite) => {
  const html = `
        <li class="js_characters_item characters_item ${classFavorite}" id="${charactersObj._id}">
            <img class="characters_img" src="${charactersObj.imageUrl}"/>
            <h2 class="characters_name">${charactersObj.name}</h2>
        </li>`;

  return html;
};

const renderAllCharacters = (dataCharacters) => {
  let html = "";
  for (const character of dataCharacters) {
    const favoritesIdx = favorites.find(
      (eachFavorite) => eachFavorite._id === character._id
    );

    if (favoritesIdx === undefined) {
      html += renderOneCharacters(character, "");
    } else {
      html += renderOneCharacters(character, "favorite");
    }
  }
  charactersUl.innerHTML = html;

  const allCharactersLi = document.querySelectorAll(".js_characters_item");

  for (const li of allCharactersLi) {
    li.addEventListener("click", handleFavorite);
  }
};

const renderFavorites = () => {
  let html = "";
  for (const favorite of favorites) {
    html += renderOneCharacters(favorite, "favorite");
  }
  favoritesUl.innerHTML = html;

  showFavorites();
};

const showFavorites = () => {
  if (favorites.length === 0) {
    charactersFav.classList.add("display");
    characters.classList.add("without_favorites");
    charactersUl.classList.add("favoritesul");
  } else {
    charactersFav.classList.remove("display");
    characters.classList.remove("without_favorites");
    charactersUl.classList.remove("favoritesul");
  }
};

const handleFavorite = (ev) => {
  ev.currentTarget.classList.toggle("favorite");

  //Obtenemos el objeto del personaje pulsado

  const clickedId = parseInt(ev.currentTarget.id);

  // Buscamos en el de todos

  const clickedCharactersObj = allCharacters.find(
    (eachCharacters) => eachCharacters._id === clickedId
  );

  //Buscamos en el de favoritos

  const favoritesIdx = favorites.findIndex(
    (eachCharacters) => eachCharacters._id === clickedId
  );
  // Si dentro del array de favoritos nos devuelve -1 es que ese personaje no esta en el array de favoritos
  if (favoritesIdx === -1) {
    // Añadimos el <li> del personaje favorito al HTML

    favorites.push(clickedCharactersObj); // añadimos el personaje a favoritos
    renderFavorites();
  } else {
    // Quitar del array de favoritos

    favorites.splice(favoritesIdx, 1);

    // Quitar del HTML

    renderFavorites();
  }
  localStorage.setItem("charactersFavs", JSON.stringify(favorites));
};

//EVENTO

btnSearch.addEventListener("click", (ev) => {
  ev.preventDefault();
  fetch(
    "https://api.disneyapi.dev/character?" +
      new URLSearchParams({
        pageSize: "50",
        name: searchInput.value,
      })
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.info.count);
      const countCharacters = data.info.count;

      if (countCharacters === 1) {
        allCharacters = [];
        allCharacters.push(data.data);
      } else {
        allCharacters = data.data;
      }
      console.log(data);
      allCharacters.forEach((element) => {
        if (element.imageUrl === undefined) {
          element.imageUrl =
            "https://placehold.co/400x400/ffffff/555555?text=Disney";
        }
      });
      renderAllCharacters(allCharacters);
    });
  searchInput.value = "";
});

btnDelete.addEventListener("click", (ev) => {
  ev.preventDefault();
  favorites = [];
  renderFavorites();
  renderAllCharacters(allCharacters);
});
// CUANDO CARGA LA PÁGINA

fetch("https://api.disneyapi.dev/character?pageSize=50")
  .then((response) => response.json())
  .then((data) => {
    allCharacters = data.data;
    allCharacters.forEach((element) => {
      if (element.imageUrl === undefined) {
        element.imageUrl =
          "https://placehold.co/400x400/ffffff/555555?text=Disney";
      }
    });

    renderAllCharacters(allCharacters);
  });

if (localStorage.getItem("charactersFavs") !== null) {
  favorites = JSON.parse(localStorage.getItem("charactersFavs"));
  renderFavorites();
}

document.getElementById("agregarGifBtn").addEventListener("click", function () {
  // Crear un nuevo elemento de imagen
  var gif = document.createElement("img");

  // Establecer la fuente del GIF (puedes poner cualquier URL de un GIF)
  gif.src = "https://media.giphy.com/media/3o7aD2saalLXpKm6Jy/giphy.gif"; // Cambia esta URL a tu GIF deseado

  // Agregar el GIF al contenedor
  document.getElementById("gifContainer").appendChild(gif);
});
