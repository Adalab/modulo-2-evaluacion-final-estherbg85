"use strict";

const charactersUl = document.querySelector(".js_charactersUl");
const charactersObj = {
  id: 18,
  films: ["The Fox and the Hound", "The Fox and the Hound 2"],
  shortFilms: [],
  tvShows: [],
  videoGames: [],
  parkAttractions: [],
  allies: [],
  enemies: [],
  sourceUrl: "https://disney.fandom.com/wiki/Abigail_the_Cow",
  name: "Abigail the Cow",
  imageUrl:
    "https://static.wikia.nocookie.net/disney/images/0/05/Fox-disneyscreencaps_com-901.jpg",
  createdAt: "2021-04-12T01:26:03.413Z",
  updatedAt: "2021-12-20T20:39:18.032Z",
  url: "https://api.disneyapi.dev/characters/18",
  v: 0,
};

const renderOneCharacters = () => {
  charactersUl.innerHTML = `
    <li class="characters_item">
        <img src="${charactersObj.imageUrl}"/>
        <h4>${charactersObj.name}</h4>
    </li>`;
};

renderOneCharacters();
