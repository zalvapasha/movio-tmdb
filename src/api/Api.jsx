import axios from "axios";

const baseURL = "https://api.themoviedb.org/3"
const api_key = "f3ea7b934386e712a1124cc7028cc627"

export const searchMultiData = async (q) => {
    const search = await axios.get(`${baseURL}/search/multi?api_key=${api_key}&query=${q}`)
    return search.data
}

// Movie
export const getMoviesPopular = async () => {
    const movie = await axios.get(`${baseURL}/movie/popular?api_key=${api_key}`)
    return movie.data.results
}

export const getMoviesNowPlaying = async () => {
    const movie = await axios.get(`${baseURL}/movie/now_playing?api_key=${api_key}`)
    return movie.data.results
}

export const getMoviesUpcoming = async () => {
    const movie = await axios.get(`${baseURL}/movie/upcoming?api_key=${api_key}`)
    return movie.data.results
}

export const getMoviesTopRated = async () => {
    const movie = await axios.get(`${baseURL}/movie/top_rated?api_key=${api_key}`)
    return movie.data.results
}

// TV Shows
export const getTVShowsPopular = async () => {
    const tv = await axios.get(`${baseURL}/tv/popular?api_key=${api_key}`)
    return tv.data.results
}

export const getTVShowsAiringToday = async () => {
    const tv = await axios.get(`${baseURL}/tv/airing_today?api_key=${api_key}`)
    return tv.data.results
}

export const getTVShowsOnTV = async () => {
    const tv = await axios.get(`${baseURL}/tv/on_the_air?api_key=${api_key}`)
    return tv.data.results
}

export const getTVShowsTopRated = async () => {
    const tv = await axios.get(`${baseURL}/tv/top_rated?api_key=${api_key}`)
    return tv.data.results
}

export const getStreamingMovies = async () => {
    const movie = await axios.get(`${baseURL}/discover/movie?api_key=${api_key}&watch_region=US&with_watch_monetization_types=flatrate`)
    return movie.data.results
}

export const getForRentMovies = async () => {
    const movie = await axios.get(`${baseURL}/discover/movie?api_key=${api_key}&watch_region=US&with_watch_monetization_types=rent`)
    return movie.data.results
}

export const getInTheatersMovies = async () => {
    const movie = await axios.get(`${baseURL}/discover/movie?api_key=${api_key}&region=US&with_release_type=3|2`)
    return movie.data.results
}

export const getTrendingMovies = async () => {
    const movie = await axios.get(`${baseURL}/trending/movie/week?api_key=${api_key}`)
    return movie.data.results
}

export const getTrendingTVShows = async () => {
    const tv = await axios.get(`${baseURL}/trending/tv/week?api_key=${api_key}`)
    return tv.data.results
}
