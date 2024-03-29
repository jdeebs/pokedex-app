//Contains Pokemon data to display from an array of objects
let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'], abilities: ['chlorophyll', 'overgrow']},
    {name: 'Charizard', height: 1.7, types: ['fire', 'flying'], abilities: ['blaze', 'solar-power']},
    {name: 'Pikachu', height: 0.4, types: 'electric', abilities: ['static', 'lightningrod']}
];

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1 && pokemonList[i].height < 2) {
        document.write(pokemonList[i].name + ' is taller than 1 meter!');
    } else if (pokemonList[i].height < 1.0) {
        document.write(pokemonList[i].name + ' is shorter than 1 meter!');
    } else {
        document.write(pokemonList[i].name + ' is taller than 2 meters!');
    }
};