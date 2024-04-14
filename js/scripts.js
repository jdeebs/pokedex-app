// Define Pokemon data to display from an array of objects inside of an IIFE
let pokemonRepository = (function () {
  // Initialize an array to store Pokemon data
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Select the modal from the DOM
  let modal = document.querySelector(".modal");

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

  // Function that adds Pokemon from the pokemonList array
  function addListItem(pokemon) {
    // Assign pokemonList to ul element in html
    let pokemonListElement = document.querySelector(".pokemon-list");

    // Create list item element in DOM
    let listItem = document.createElement("li");

    // Create button element in DOM
    let button = document.createElement("button");

    // Capitalize the first letter of the Pokemon's name
    let pokemonName =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    // Set the inner text of the button to be Pokemon's name capitalized
    button.innerText = pokemonName;

    // Add a pokemonButton class to the button for styling
    button.classList.add("pokemonButton");

    // Add Bootstrap attributes to button
    button.setAttribute("data-target", "exampleModal");
    button.setAttribute("data-toggle", "modal");

    // Add Bootstrap class to list item
    listItem.classList.add("list-group-item");
    // Append button to listItem as child
    listItem.appendChild(button);

    // Append listItem to pokemonList as child
    pokemonListElement.appendChild(listItem);

    // Event listener to show modal when button is clicked
    button.addEventListener("click", function () {
      // Call loadDetails to ensure Pokemon details are loaded
      pokemonRepository.loadDetails(pokemon).then(function () {
        showModal(pokemon); // Show modal with Pokemon name and details
      });
    });
  }

  // Function to load the list of Pokemon from an API
  function loadList() {
    // Display loading message while data is being loaded
    showLoadingMessage();

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
          // Hide loading message after data is loaded
          hideLoadingMessage();
        })
        // Handle errors
        .catch(function (e) {
          console.error(e);
        })
    );
  }

  // Function to load additional details for a specific Pokemon
  function loadDetails(item) {
    // Display loading message while data is being loaded
    showLoadingMessage();

    // Get the details URL of the Pokemon
    let url = item.detailsUrl;

    // Fetch data from the details URL
    return (
      fetch(url)
        // Parse response as JSON
        .then(function (response) {
          return response.json();
        })
        // Process JSON data
        .then(function (details) {
          // Extract relevant details from the response and add them to the item parameter
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
          // Hide loading message after data is loaded
          hideLoadingMessage();
        })
        // Handle errors
        .catch(function (e) {
          console.error(e);
        })
    );
  }

  // Function to display loading message
  function showLoadingMessage() {
    // Delay showing the loading message for 3 seconds
    setTimeout(function () {
      // Create loading message element
      let loadingMessage = document.createElement("div");
      loadingMessage.innerText = "Loading...";
      loadingMessage.classList.add("loading-message");

      // Append loading message to the html body
      document.body.appendChild(loadingMessage);

      // Delay hiding the loading message for testing
      setTimeout(function () {
        hideLoadingMessage();
      }, 0); // Change delay as needed for testing
    }, 3000);
  }

  // Function to hide loading message
  function hideLoadingMessage() {
    let loadingMessage = document.querySelector(".loading-message");

    // Delay removing the loading message for testing
    setTimeout(function () {
      // Remove loading message if it exists
      if (loadingMessage) {
        loadingMessage.remove();
      }
    }, 0); // Change delay as needed for testing
  }

  // Function to show a modal with name and content
  function showModal(item) {
    // Clear any existing content in the modal container
    $(".modal-title").empty();
    $(".modal-body").empty();

    // Capitalize the first letter of the Pokemon's name
    let capitalName =
    item.name.charAt(0).toUpperCase() + item.name.slice(1);
    
    // Create elements for name and content
    let nameElement = $("<h1>" + capitalName + "</h1>");
    let heightElement = $("<p>" + "Height: " + item.height + "</p>");

    // Create an empty string to store types
    let typesString = "Types: ";
    // Loop through each type object in the types array
    item.types.forEach(function (type) {
      // Add the type name to the typesString
      typesString += type.type.name + ", ";
    });
    // Remove the trailing comma and space from the typesString
    typesString = typesString.slice(0, -2);
    // Create element for types content
    let typesElement = $("<p>" + typesString + "</p>");

    // Create image in modal content
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", item.imageUrl);

    // Append elements to the modal
    $(".modal-title").append(nameElement);
    $(".modal-body").append(heightElement, typesElement, imageElement);

    // Show the modal using Bootstrap's modal method
    $("#exampleModal").modal("show");
  }

  // Function to hide the modal
  function hideModal() {
    // Remove the "is-visible" class from the modal container
    modalContainer.classList.remove("is-visible");
  }

  // Event listener to close the modal when Escape key is pressed
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  // Event listener to close the modal when clicked outside the modal
  modal.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modal) {
      hideModal();
    }
  });

  // Return an object public functions
  return {
    add: add, // Expose the add function
    getAll: getAll, // Expose the getAll function
    addListItem: addListItem, // Expose the addListItem function
    loadList: loadList, // Expose the loadList function
    loadDetails: loadDetails, // Expose the loadDetails function
    showModal: showModal, // Expose the showModal function
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

// Create Pokedex container wrapper for styling
document.write(`<div class="pokedex-container-wrapper">`);

// Create Pokedex container for styling
document.write(`<div class="pokedex-container">`);
