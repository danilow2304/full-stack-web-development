const movies = [
  {
    title: "Resident Evil",
    director: "Paul W.S. Anderson",
    genre: "Action, Horror, Sci-Fi",
    releaseYear: 2002,
    rating: 6.7,
    runtime: 100,
    description: "After a virus outbreak in a secret underground facility, a special military unit fights hordes of mutated monsters while trying to find survivors."

  },
  {
    title: "Toy Story",
    director: "John Lasseter",
    genre: "Animation",
    releaseYear: 1995,
    rating: 8.3,
    runtime: 81,
    description: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room."
  },

  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    genre: "Action, Crime, Drama",
    releaseYear: 2008,
    rating: 9.0,
    runtime: 152,
    description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice."
  },
  {
    title: "Cars",
    director: "John Lasseter",
    genre: "Animation, Adventure, Comedy",
    releaseYear: 2006,
    rating: 7.1,
    runtime: 117,
    description: "A hot-shot race-car named Lightning McQueen gets waylaid in Radiator Springs, where he finds the true meaning of friendship and family."
  },
  {
    title: "Dragon Ball Super: Broly",
    director: "Tatsuya Nagamine",
    genre: "Animation, Action, Adventure",
    releaseYear: 2018,
    rating: 7.4,
    runtime: 100,
    description: "The Saiyans are a warrior race that once ruled the universe. After being defeated by the tyrant Frieza, they were nearly wiped out. However, two Saiyans survived and were sent to Earth, where they were raised as humans. Now, a new threat emerges in the form of Broly, a powerful Saiyan with a mysterious past."
  }
];

// Class variables for the filter inputs
const searchInput = document.getElementById("search")
const genreFilter = document.getElementById("genre-filter")
const yearFilter = document.getElementById("year-filter")
const resetButton = document.getElementById("reset-button")
const movieCount = document.getElementById("movie-count")

function displayMovies(movieList) {
  const movieContainer = document.getElementById("movie-container");
  movieContainer.innerHTML = "";

  if(movieList.length === 0) {
    movieContainer.innerHTML = "<p>No Movies found. Try a different search.</p>";
    return;
  }

  movieList.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <h2>${movie.title}</h2>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
            <p><strong>Rating:</strong> ${movie.rating}</p>
            <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
            <p><strong>Description:</strong> ${movie.description}</p>
        `;
        movieContainer.appendChild(movieElement);
    });
}

function filterMovies() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;
    const selectedYear = yearFilter.value;

    const filteredMovies = movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
        const matchesGenre = selectedGenre === "all" || movie.genre === selectedGenre;
        let matchesYear = true;

        if(selectedYear === "1990"){
          matchesYear = movie.releaseYear < 2000;
        } else if (selectedYear === "2000"){
          matchesYear = movie.releaseYear >= 2000;
        }
        
        return matchesSearch && matchesGenre && matchesYear;
    });

    displayMovies(filteredMovies);
    movieCount.textContent = `Showing: ${filteredMovies.length} movies`;
}

//event listeners for the filter inputs
searchInput.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);
yearFilter.addEventListener("change", filterMovies);
resetButton.addEventListener("click", () => {
    searchInput.value = "";
    genreFilter.value = "all";
    yearFilter.value = "all";
    filterMovies();
});