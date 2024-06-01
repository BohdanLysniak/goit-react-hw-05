import axios from "axios";

axios.defaults.baseURL =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

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
