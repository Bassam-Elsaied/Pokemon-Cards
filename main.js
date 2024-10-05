let offset = 0;
const limit = 20;

const pokemonContainer = document.getElementById("pokemon-container");
const loadMoreButton = document.getElementById("load-more");

loadMoreButton.addEventListener("click", loadMorePokemon);

function loadMorePokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((pokemon) => {
        createPokemonCard(pokemon);
      });
      offset += limit;
    });
}

function createPokemonCard(pokemon) {
  fetch(pokemon.url)
    .then((response) => response.json())
    .then((data) => {
      const card = document.createElement("div");
      card.classList.add("pokemon-card");
      card.innerHTML = `
                <img src="${
                  data.sprites.other["official-artwork"].front_default ||
                  data.sprites.front_default
                }" alt="${data.name}">
                <h2>${
                  data.name.charAt(0).toUpperCase() + data.name.slice(1)
                }</h2>
            `;
      card.addEventListener("click", () => {
        window.location.href = `details.html?id=${data.id}`;
      });
      pokemonContainer.appendChild(card);
    });
}

loadMorePokemon();
