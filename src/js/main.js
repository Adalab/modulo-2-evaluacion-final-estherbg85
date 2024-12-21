"use strict";
// SECCIÓN QUERY SELECTOR

const charactersUl = document.querySelector(".js_charactersUl");

const favoritesUl = document.querySelector(".js_favoritesUl");

// ARRAYS

let allCharacters = [];
let favorites = [];

// SECCIÓN DE LAS FUNCIONES

const renderOneCharacters = (charactersObj) => {
  const html = `
        <li class="js_characters_item characters_item" id="${charactersObj._id}">
            <img src="${charactersObj.imageUrl}"/>
            <h4>${charactersObj.name}</h4>
        </li>`;

  return html;
};

const renderAllCharacters = () => {
  let html = "";
  for (const charactersObj of allCharacters) {
    html += renderOneCharacters(charactersObj);
  }
  charactersUl.innerHTML = html;

  const allCharactersLi = document.querySelectorAll(".js_characters_item");

  for (const li of allCharactersLi) {
    li.addEventListener("click", handleFavorite);
  }
};

const renderFavorites = () => {
  let html = "";
  for (const charactersObj of favorites) {
    html += renderOneCharacters(charactersObj);
  }
  favoritesUl.innerHTML = html;
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
};

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

    renderAllCharacters();
  });
