<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Videogames

<p align="right">
  <img height="200" src="./videogame.png" />
</p>

## Project Goals

- Build a web app using React, Redux, Node and Sequelize.
- Consolidate and connect the concepts learnt throughout the course.
- Learn best practices.
- Practice the use of GIT.
- Implement testing.

## Guidelines

The general idea is to create a web application where different videogames are displayed along with their info using the external [rawg](https://rawg.io/apidocs) api and, among other things:

  - Search videogames
  - Filter and sort videogames
  - Add new videogames

__IMPORTANT__: Using endpoints from the external API to filter or sort the results is not allowed, these will have to be implemented by yourself instead. Additionally, at least one of the filters or sorting algorithms will have to be managed from the front-end.

### Allowed Endpoints/Flags

  - GET https://api.rawg.io/api/games
  - GET https://api.rawg.io/api/games?search={game}
  - GET https://api.rawg.io/api/genres
  - GET https://api.rawg.io/api/games/{id}

### Minimum requirements:

The following sections describe the project's minimum requirements.

__IMPORTANT__: Using external libraries to apply styling is not allowed. CSS only.

#### Tech stack:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

Develop an app using React/Redux containing the following pages/routes:

__Landing page__: must include
- [ ] A bakground image representing the nature of the project
- [ ] Button to access the homepage ('Main route')

__Main route__: must include
- [ ] Searchbar to find videogames by name
- [ ] Videogames display area, showing:
  - Image
  - Name
  - Genres
- [ ] Buttons/Options to filter by genre and by database (existing videogame or ones created by you)
- [ ] Buttons/Options to sort videogames alphabetically and by rating.
- [ ] Show 15 videogames per page.

__IMPORTANT__: The main route must display the videogames from the API as well as those created in your own db. Given that the API contains around 500K games, just the first 100 games are needed for the sake of this project.

__Videogame detail route__: must include
- [ ] The fields displayed in the main route for each videogame (image, name and genres)
- [ ] Description
- [ ] Release date
- [ ] Rating
- [ ] Plataforms

__Videogame creation route__: must include
- [ ] A __controlled__ form with the following fields:
  - Name
  - Description
  - Release date
  - Rating
- [ ] A way to select/add different genres
- [ ] A way to select/add different platforms
- [ ] Button/option to create a new game

#### Database

The database model will contain the following entities (those marked with an asterisk are mandatory)

- [ ] Videogame with the following properties:
  - ID: * Cannot be an existing videogame ID from the rawg API
  - Name *
  - Description *
  - Release date
  - Rating
  - Plataforms *
- [ ] Genre with the following properties:
  - ID
  - Nombre

The kind of relationship between these entities will be many to many, given that a videogame can belong to many genres simultaneously and a genre can contain many different videogames.
For example, the game 'Counter Strike' belongs to both the Action and Shooter genres. At the same time, other games are assigned to the Shooter or Action genre.

#### Backend

Se debe desarrollar un servidor en Node/Express con las siguientes rutas:

__IMPORTANT__: Using endpoints from the external API to filter/sort the results or manage the game display's paging is not allowed, these will have to be implemented by yourself instead. 

Develop a server using Node/Express with the following routes:

  - [ ] __GET /videogames__:
  - Obtain a list of the videogames
- [ ] __GET /videogames?name="..."__:
  - Obtain a list of the videogames which contain the keyword passed as a query parameter
  - If no videogame exists, display an error message
- [ ] __GET /videogame/{idVideogame}__:
  - Obtain a videogame's details
  - Should only return the data required by the videogame detail route
  - Include any genres associated with the videogame
- [ ] __GET /genres__:
  - Obtain all genres
  - Upon the first call these will have to be retrieved from rawg and saved in your own database and subsequently use them from there
- [ ] __POST /videogame__:
  - Receives the data collected from the game creation controlled form
  - Create a videogame in the database

#### Testing
- [ ] At least one front end component with tests
- [ ] At least one back end route with tests
- [ ] At least one database model with tests
