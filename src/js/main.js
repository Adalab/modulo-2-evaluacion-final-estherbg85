"use strict";

// SECCIÓN QUERY SELECTOR

const charactersUl = document.querySelector(".js_charactersUl");

const favoritesUl = document.querySelector(".js_favoritesUl");

const btnSearch = document.querySelector(".js_btnSearch");

const searchInput = document.querySelector(".js_searchInput");

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
  const btnDelete = document.querySelector(".js_btndelete");

  if (favorites.length === 0) {
    btnDelete.classList.add("hidden");
  } else {
    btnDelete.classList.remove("hidden");
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
/*btnSearch.addEventListener("click", (ev) => {
  ev.preventDefault();
  const filteredAllCharacters = allCharacters
    .filter((charactersObj) =>
      charactersObj.name.toLowerCase().includes(searchInput.value.toLowerCase())
    )
    .slice();

  renderAllCharacters(filteredAllCharacters);
});*/

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
