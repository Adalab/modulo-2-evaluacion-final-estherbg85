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

const handleFavorite = (ev) => {
  ev.currentTarget.classList.toggle("favorite");

  //Obtenemos el objeto del personaje pulsado

  const clickedId = parseInt(ev.currentTarget.id);

  // Buscamos en el de todos

  const clickedCharactersObj = allCharacters.find(
    (eachCharacters) => eachCharacters._id === clickedId
  );

  //Buscamos en el de favoritos

  const favoritesObj = favorites.find(
    (eachCharacters) => eachCharacters._id === clickedId
  );

  if (favoritesObj === undefined) {
    // Añadimos el <li> del personaje favorito al HTML

    const liFavorite = renderOneCharacters(clickedCharactersObj);

    favoritesUl.innerHTML += liFavorite;

    favorites.push(clickedCharactersObj);
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
