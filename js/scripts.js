// Define Pokemon data to display from an array of objects
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
];

// Loop through each Pokemon in the pokemonList array
for (let i = 0; i < pokemonList.length; i++) {
  // Write a message with the current Pokemon name and height
  document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}m)`);
  // Check if the height of the current Pokemon is between 1-2 meters
  if (pokemonList[i].height > 1 && pokemonList[i].height < 2) {
    // If height of current Pokemon is between 1-2 meters, write a message indicating the Pokemon is taller than 1 meter
    document.write(pokemonList[i].name + " is taller than 1 meter!");
  } else if (pokemonList[i].height < 1.0) {
    // If height of current Pokemon is less than 1 meter, write a message indicating the Pokemon is shorter than 1 meter
    document.write(pokemonList[i].name + " is shorter than 1 meter!");
  } else {
    // If height of current Pokemon is taller than 2 meters, write a message indicating so
    document.write(pokemonList[i].name + " is taller than 2 meters!");
  }
}
