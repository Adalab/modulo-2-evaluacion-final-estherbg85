"use strict";

const charactersUl = document.querySelector(".js_charactersUl");

let allCharacters = [];

const renderOneCharacters = (charactersObj) => {
  const html = `
        <li class="js_characters_item characters_item favorite">
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

  const allCharactersLi = document.querySelector(".js_characters_item");

  for (const li of allCharactersLi) {
    li.addEventListener("click", handleFavorite);
  }
};

const handleFavorite = (ev) => {
  console.log("favoritas");
};

fetch("https://api.disneyapi.dev/character?pageSize=50")
  .then((response) => response.json())
  .then((data) => {
    allCharacters = data.data;

    renderAllCharacters();
  });
