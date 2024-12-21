"use strict";
// SECCIÓN QUERY SELECTOR

const charactersUl = document.querySelector(".js_charactersUl");

let allCharacters = [];

// SECCIÓN DE LAS FUNCIONES

const renderOneCharacters = (charactersObj) => {
  const html = `
        <li class="js_characters_item characters_item">
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
  console.log("favoritas");
  console.log(ev.currentTarget);

  ev.currentTarget.classList.toggle("favorite");
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
