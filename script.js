// Constants for API endpoints and image paths
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=f0d4ddf38e49745c2c5cc6cdcd32e8fa&query=";

// DOM elements
const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// Function to fetch and display movies
returnMovies(APILINK);
function returnMovies(url){
  fetch(url).then(res => res.json())
  .then(function(data){
    console.log(data.results);
    data.results.forEach(element => {
        // Creating elements for each movie
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');

        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');

        const title = document.createElement('h3');
        title.setAttribute('id', 'title');

        const center = document.createElement('center');

        // Setting content and attributes
        title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
        image.src = IMG_PATH + element.poster_path;


        // Appending elements to create card layout
        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        main.appendChild(div_row); // Appending the card to main section
    });
  });
}

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Preventing default form submission behavior
  main.innerHTML = ''; // Clearing previous search results

  const searchItem = search.value; // Getting the search query

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem); // Fetching movies based on search query
    search.value = ""; // Clearing the search input field
  }
});
