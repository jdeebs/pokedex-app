// Define Pokemon data to display from an array of objects inside of an IIFE
let pokemonRepository = (function () {
  // Initialize an array to store Pokemon data
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 0.7,
      types: ["grass", "poison"],
      abilities: ["chlorophyll", "overgrow"],
    },
    {
      name: "Charizard",
      height: 1.7,
      types: ["fire", "flying"],
      abilities: ["blaze", "solar-power"],
    },
    {
      name: "Pikachu",
      height: 0.4,
      types: "electric",
      abilities: ["static", "lightningrod"],
    },
    {
      name: "Gyarados",
      height: 6.5,
      types: ["water", "flying"],
      abilities: ["intimidate", "moxie"],
    },
  ];

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

  // Return an object with 2 public functions assigned as keys
  return {
    add: add, // Expose the add function
    getAll: getAll, // Expose the getAll function
  };
})();

// Get the Pokemon list using getAll() function
let pokemonDetails = pokemonRepository.getAll();

// Call pokemonList loop function
pokemonDetails.forEach(pokemonListLoop);

// Create Pokedex container wrapper for styling
document.write(`<div class="pokedex-container-wrapper">`);

// Create Pokedex container for styling
document.write(`<div class="pokedex-container">`);

// Loop through each Pokemon in the pokemonList array
function pokemonListLoop(pokemonDetails) {
  // Start a new div section for each Pokemon
  document.write(`<div class="pokemon">`);

  // Write a message with the current Pokemon name and height
  document.write(`<div class="pokemon-info">`);
  document.write(
    `${pokemonDetails.name} (height: ${pokemonDetails.height}m)
    `
  );
  document.write(`</div>`);

  // Check if the height of the current Pokemon is between 1-2 meters
  document.write(`<div class="height-info">`);
  if (pokemonDetails.height > 1 && pokemonDetails.height < 2) {
    // If height of current Pokemon is between 1-2 meters, write a message indicating the Pokemon is taller than 1 meter
    document.write(
      `${pokemonDetails.name} is taller than 1 meter!
      `
    );
  } else if (pokemonDetails.height < 1.0) {
    // If height of current Pokemon is less than 1 meter, write a message indicating the Pokemon is shorter than 1 meter
    document.write(
      `${pokemonDetails.name} is shorter than 1 meter!
      `
    );
  } else {
    // If height of current Pokemon is taller than 2 meters, write a message indicating it's big
    document.write("Wow, that's big!");
    return pokemonDetails;
  }
  document.write(`</div>`); // Close the height-info div
  document.write(`</div>`); // Close the pokemon div
}

// Close the Pokedex container
document.write(`</div>`);
