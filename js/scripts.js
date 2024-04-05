// Define Pokemon data to display from an array of objects inside of an IIFE
let pokemonRepository = (function () {
  // Initialize an array to store Pokemon data
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Function to add a new Pokemon to the pokemonList array
  function add(pokemon) {
    // Check if parameter is an object
    if (typeof pokemon === "object" && pokemon !== null) {
      // If an object, push it to the pokemonList array
      pokemonList.push(pokemon);
    } else {
      // If not an object, log an error message
      console.error("Error: Parameter of add() must be an object");
    }
  }

  // Function to retrieve all Pokemon data from the pokemonList array
  function getAll() {
    return pokemonList;
  }

  // Function to log Pokemon details to the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon.name);
    });
  }

  // Function that adds Pokemon from the pokemonList array
  function addListItem(pokemon) {
    // Assign pokemonList to ul element in html
    let pokemonList = document.querySelector(".pokemon-list");

    // Create list item element in DOM
    let listItem = document.createElement("li");

    // Create button element in DOM
    let button = document.createElement("button");

    // Set the inner text of the button to be Pokemon's name
    button.innerText = pokemon.name;

    // Add a pokemonButton class to the button for styling
    button.classList.add("pokemonButton");

    // Append button to listItem as child
    listItem.appendChild(button);

    // Append listItem to pokemonList as child
    pokemonList.appendChild(listItem);

    // Log Pokemon details to console on button click
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  // Function to load the list of Pokemon from an API
  function loadList() {
    // Fetch data from API
    return (
      fetch(apiUrl)
        // Parse response as JSON
        .then(function (response) {
          return response.json();
        })
        // Process JSON data
        .then(function (json) {
          // Iterate through each item in the JSON results
          json.results.forEach(function (item) {
            // Create a Pokemon object with name and details URL
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            // Add the Pokemon Object to the pokemonList array
            add(pokemon);
          });
        })
        // Handle errors
        .catch(function (e) {
          console.error(e);
        })
    );
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Return an object with 3 public functions assigned as keys
  return {
    add: add, // Expose the add function
    getAll: getAll, // Expose the getAll function
    addListItem: addListItem, // Expose the addListItem function
    loadList: loadList, // Expose the loadList function
    loadDetails: loadDetails, // Expose the loadDetails function
  };
})();

// Load the list of Pokemon from the API and add them to the page
pokemonRepository.loadList().then(function () {
  // Iterate through each Pokemon in the pokemonList array
  pokemonRepository.getAll().forEach(function (pokemon) {
    // Add each Pokemon to the list
    pokemonRepository.addListItem(pokemon);
  });
});

// Get the Pokemon list using getAll() function
let pokemonDetails = pokemonRepository.getAll();

// Loop through each Pokemon in the pokemonList array
pokemonDetails.forEach(function (pokemon) {
  // Add each Pokemon to the list
  pokemonRepository.addListItem(pokemon);
});

// Create Pokedex container wrapper for styling
document.write(`<div class="pokedex-container-wrapper">`);

// Create Pokedex container for styling
document.write(`<div class="pokedex-container">`);
