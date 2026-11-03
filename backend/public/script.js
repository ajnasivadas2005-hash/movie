
const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");

let movies = [];

async function loadMovies() {
    try {
        const response = await fetch("/api/movies");

        if (!response.ok) {
            throw new Error("Unable to fetch movies");
        }

        movies = await response.json();
        displayMovies(movies);

    } catch (error) {
        movieContainer.innerHTML =
            "<p>Unable to load movies. Please check the server.</p>";

        console.error(error);
    }
}

function displayMovies(movieList) {
    movieContainer.innerHTML = "";

    if (movieList.length === 0) {
        movieContainer.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movieList.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        const image = document.createElement("img");
        image.src = movie.poster || "";
        image.alt = movie.title;
        image.onerror = () => {
            image.style.display = "none";
        };

        const info = document.createElement("div");
        info.className = "movie-info";

        const title = document.createElement("h3");
        title.textContent = movie.title || "Untitled";

        const genre = document.createElement("p");
        genre.textContent = "Genre: " + (movie.genre || "N/A");

        const year = document.createElement("p");
        year.textContent = "Year: " + (movie.year || "N/A");

        const rating = document.createElement("p");
        rating.textContent = "Rating: ⭐ " + (movie.rating ?? "N/A");

        const director = document.createElement("p");
        director.textContent = "Director: " + (movie.director || "N/A");

        const description = document.createElement("p");
        description.textContent = movie.description || "";

        info.append(title, genre, year, rating, director, description);
        card.append(image, info);
        movieContainer.appendChild(card);
    });
}

searchInput.addEventListener("input", () => {
    const search = searchInput.value.toLowerCase();

    const filteredMovies = movies.filter(movie =>
        (movie.title || "").toLowerCase().includes(search) ||
        (movie.genre || "").toLowerCase().includes(search)
    );

    displayMovies(filteredMovies);
});

loadMovies();
