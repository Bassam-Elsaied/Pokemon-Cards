const pokemonDetails = document.getElementById("pokemon-details");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

let currentPokemonId;

const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

function loadPokemonDetails(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => {
      displayPokemonDetails(data);
      currentPokemonId = data.id;
      updateNavigationButtons();
    });
}

function displayPokemonDetails(pokemon) {
  const pokemonDetails = document.getElementById("pokemon-details");
  const mainType = pokemon.types[0].type.name;
  const backgroundColor = typeColors[mainType];

  // Set the background color of the body
  document.body.style.backgroundColor = backgroundColor;

  const types = pokemon.types
    .map((type) => {
      const typeName = type.type.name;
      return `<span class="type-badge" style="background-color: ${typeColors[typeName]};">${typeName}</span>`;
    })
    .join("");

  const stats = pokemon.stats
    .map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
    .join("");

  pokemonDetails.innerHTML = `
        <img src="${
          pokemon.sprites.other["official-artwork"].front_default ||
          pokemon.sprites.front_default
        }" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <p>ID: #${pokemon.id.toString().padStart(3, "0")}</p>
        <p>${types}</p>
        <p>Height: ${pokemon.height / 10} m | Weight: ${
    pokemon.weight / 10
  } kg</p>
        <h3>Top Stats</h3>
        <ul>${stats}</ul>
    `;
}

function updateNavigationButtons() {
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  prevButton.disabled = currentPokemonId === 1;
  nextButton.disabled = currentPokemonId === 898; // Assuming 898 is the highest Pokémon ID
}

function setupEventListeners() {
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  prevButton.addEventListener("click", () => {
    if (currentPokemonId > 1) {
      loadPokemonDetails(currentPokemonId - 1);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPokemonId < 898) {
      loadPokemonDetails(currentPokemonId + 1);
    }
  });
}

function initializeDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialPokemonId = urlParams.get("id") || 1;
  loadPokemonDetails(initialPokemonId);
  setupEventListeners();
}

// Wait for the DOM to be fully loaded before initializing the page
document.addEventListener("DOMContentLoaded", initializeDetailsPage);
