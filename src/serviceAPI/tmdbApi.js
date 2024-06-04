import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzY3ODY3YTgxNTg3YWIwMTVjYjhiYjljZDQwZTFhYyIsInN1YiI6IjY2NWIyYTJmOWRkYzk0MDkzMmJjMzYyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7n8MuYMcLnUjiWIGo_VuelnkoO0qcOhcGRjxozl7_LI"
  },
  params: {
    page: 1,
    include_adult: false,
    language: "en-US"
  }
};

export async function getMovies() {
  const response = await axios.get(`3/trending/movie/day`, options);
  return response.data;
}

export async function getMovieDetails(movieId) {
  const response = await axios.get(`3/movie/${movieId}`, options);
  return response.data;
}

export async function getMovieCast(movieId) {
  const response = await axios.get(`3/movie/${movieId}/credits`, options);
  return response.data.cast;
}

export async function getMovieReviews(movieId) {
  const response = await axios.get(`3/movie/${movieId}/reviews`, options);
  return response.data.results;
}

export async function getMoviesByQuery(query) {
  const response = await axios.get(`3/search/movie?query=${query}`, options);
  return response.data;
}
