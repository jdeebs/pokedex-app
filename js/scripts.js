// Define Pokemon data to display from an array of objects inside of an IIFE
let pokemonRepository = (function () {
  // Initialize an array to store Pokemon data
  let pokemonList = [];
  let currentPokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Select the modal and search input from the DOM
  let modal = document.querySelector(".modal");
  const searchInput = document.getElementById("search-input");

  // Function to create a new Bootstrap row
  function createRow(parentElement) {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    parentElement.appendChild(rowDiv);
    return rowDiv;
  }

  // Function to create a new Bootstrap column
  function createColumn(parentRow) {
    let colDiv = document.createElement("div");
    colDiv.classList.add("col-md-4");
    parentRow.appendChild(colDiv);
    return colDiv;
  }

  // Function to remove empty rows
  function removeEmptyRows() {
    const rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
      // Check if the row has no visible children
      if (
        !Array.from(row.children).some(
          (child) => !child.classList.contains("d-none")
        )
      ) {
        // Remove the row if it has no visible children
        row.remove();
      }
    });

    // Check if the search input is empty
    if (searchInput.value === "") {
      // If empty, re-render the entire list using the original pokemonList array
      pokemonRepository.getAll().forEach((pokemon) => {
        const pokemonButton = document.getElementById(pokemon.name);
        const listItem = document.getElementById(pokemon.name);
        pokemonButton.classList.remove("d-none");
        listItem.classList.remove("d-none");
      });
    } else {
      // If not empty, iterate through each Pokemon and hide/show based on search input
      pokemonRepository.getAll().forEach((pokemon) => {
        const pokemonButton = document.getElementById(
          "pokemonButton " + pokemon.name
        );
        const listItem = document.getElementById(pokemon.name);
        const val = searchInput.value.toLowerCase();

        // Check if the name of the Pokemon matches the search input
        if (pokemon.name.toLowerCase().indexOf(val) > -1) {
          // Show list item and button if name matches input
          pokemonButton.classList.remove("d-none");
          listItem.classList.remove("d-none");
        } else {
          // Hide button if name doesn't match input
          pokemonButton.classList.add("d-none");
          listItem.classList.add("d-none");
        }
      });
    }
  }

  // Function to add a new Pokemon to the pokemonList array
  function add(pokemon) {
    // Check if parameter is an object
    if (typeof pokemon === "object" && pokemon !== null) {
      // If an object, push it to the pokemonList array
      pokemonList.push(pokemon);
      currentPokemonList.push(pokemon);
    } else {
      // If not an object, log an error message
      console.error("Error: Parameter of add() must be an object");
    }
  }

  // Function to retrieve all Pokemon data from the pokemonList array
  function getAll() {
    return currentPokemonList;
  }

  // Function that adds Pokemon from the pokemonList array
  function addListItem(pokemon) {
    // Assign pokemonList to ul element in html
    let pokemonListElement = document.querySelector(".pokemon-list");

    // Create a new row if the current row is filled or doesn't exist yet
    let currentRow = document.querySelector(".row:last-of-type");
    if (!currentRow || currentRow.children.length >= 3) {
      currentRow = createRow(pokemonListElement);
    }

    // Create a new column for the Pokemon button
    let colDiv = createColumn(currentRow);

    // Create list item element in DOM
    let listItem = document.createElement("li");

    // Create button element in DOM
    let button = document.createElement("button");

    // Capitalize the first letter of the Pokemon's name
    let pokemonName =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    // Set the inner text of the button to be Pokemon's name capitalized
    button.innerText = pokemonName;

    // Add a bootstrap button class, id for styling and pokemon name for search selection
    button.classList.add("btn", "btn-lg");
    button.setAttribute("id", "pokemonButton " + pokemon.name);

    // Add Bootstrap attributes to button
    button.setAttribute("data-target", "pokemonModal");
    button.setAttribute("data-toggle", "modal");

    // Add Bootstrap class to list item and id of pokemon name for search selection
    listItem.classList.add("list-group-item");
    listItem.setAttribute("id", pokemon.name);

    // Append button to listItem as child
    listItem.appendChild(button);

    // Append listItem to colDiv as child
    colDiv.appendChild(listItem);

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
          item.imageUrlFront = details.sprites.front_default;
          item.imageUrlBack = details.sprites.back_default;
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
    // Display a loading message, only if the data takes longer than usual to load
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
    }, 3000); // 3 second delay before showing the loading message
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
    let capitalName = item.name.charAt(0).toUpperCase() + item.name.slice(1);

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

    // Create front and back images in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);

    // Append elements to the modal
    $(".modal-title").append(nameElement);
    $(".modal-body").append(
      heightElement,
      typesElement,
      imageElementFront,
      imageElementBack
    );

    // Show the modal using Bootstrap's modal method
    $("#pokemonModal").modal("show");
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

  // Function to search for Pokemon
  const createSearchFilter = (pokemonList) => {
    searchInput.addEventListener("keyup", (e) => {
      const val = e.target.value.toLowerCase();
      // Iterate through each Pokemon in the list
      pokemonList.forEach((pokemon) => {
        // Get the button element corresponding to the current Pokemon
        const pokemonButton = document.getElementById(
          "pokemonButton " + pokemon.name
        );
        // Get the list item element corresponding to the current Pokemon
        const listItem = document.getElementById(pokemon.name);

        // Check if the name of the Pokemon matches the search input
        if (pokemon.name.toLowerCase().includes(val)) {
          // Show list item and button if name matches input
          pokemonButton.classList.remove("d-none");
          listItem.classList.remove("d-none");
        } else {
          // Hide button if name doesn't match input
          pokemonButton.classList.add("d-none");
          listItem.classList.add("d-none");
        }
      });

      // Remove empty rows
      removeEmptyRows();
    });
  };

  // Function to update the DOM with the filtered Pokemon list
  function updatePokemonList(filteredPokemonList) {
    // Clear existing Pokemon list
    pokemonListElement.innerHTML = "";

    // Add the filtered Pokemon to the list
    filteredPokemonList.forEach(function (pokemon) {
      addListItem(pokemon);
    });

    // Remove empty rows
    removeEmptyRows();
  }

  // Return an object public functions
  return {
    add: add, // Expose the add function
    getAll: getAll, // Expose the getAll function
    addListItem: addListItem, // Expose the addListItem function
    loadList: loadList, // Expose the loadList function
    loadDetails: loadDetails, // Expose the loadDetails function
    showModal: showModal, // Expose the showModal function
    createSearchFilter: createSearchFilter, // Expose the createSearchFilter function
  };
})();

// Load the list of Pokemon from the API and add them to the page
pokemonRepository.loadList().then(function () {
  // Iterate through each Pokemon in the pokemonList array
  pokemonRepository.getAll().forEach(function (pokemon) {
    // Add each Pokemon to the list
    pokemonRepository.addListItem(pokemon);
  });

  // Call createSearchFilter after loading the list of Pokemon
  pokemonRepository.createSearchFilter(pokemonRepository.getAll());
});

// Create Pokedex container wrapper for styling
document.write(`<div class="pokedex-container-wrapper">`);

// Create Pokedex container for styling
document.write(`<div class="pokedex-container">`);
