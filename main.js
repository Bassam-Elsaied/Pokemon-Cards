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

// Add these variables at the top of your file
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Add this function to handle the search
function searchPokemon() {
  const searchTerm = searchInput.value.toLowerCase();
  const pokemonCards = document.querySelectorAll(".pokemon-card");

  pokemonCards.forEach((card) => {
    const pokemonName = card.querySelector("h2").textContent.toLowerCase();
    if (pokemonName.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Add event listeners for search
searchButton.addEventListener("click", searchPokemon);
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchPokemon();
  }
});
