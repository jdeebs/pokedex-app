# Pokédex App

## Project Overview

The **Pokédex** project is a single-page, responsive application built using HTML, CSS, and JavaScript. The app allows users to browse a list of Pokémon and view detailed information about each one. It interfaces with an external API, specifically the [Pokémon API](https://pokeapi.co/), and focuses on presenting the data in a user-friendly way with clean, accessible design.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [User Stories](#user-stories)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

### Views & Features

- **Main View:**
  - Displays a list of Pokémon loaded from the Pokémon API.
  - Enables users to select a Pokémon for more details.

- **Single Pokémon View:**
  - Shows detailed information about a selected Pokémon, including its image, height, and type.

- **Responsive Design:**
  - The app is fully responsive, providing an optimal experience on both desktop and mobile devices.

## User Stories

- **As a user**, I want to see a list of Pokémon so I can browse them easily.
- **As a user**, I want to click on a Pokémon to view more detailed information about it.

## Setup and Installation

Follow these steps to set up the Pokédex app locally:

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/pokedex-app.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd pokedex-app
    ```

3. **Open the `index.html` file in your browser:**

    You can simply open the `index.html` file in your preferred browser or serve it using a simple HTTP server, such as:

    ```sh
    npx http-server .
    ```

## Usage

1. After opening the app, you will see a list of Pokémon fetched from the Pokémon API.
2. Click on any Pokémon in the list to view its detailed information in a modal.

## Deployment

The Pokédex app is deployed [here](https://jdeebs.github.io/pokedex-app/).

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and include tests for new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
