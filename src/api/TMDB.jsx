import axios from "axios";

const tmdbURL = "https://api.themoviedb.org/3";
const api_key = "f3ea7b934386e712a1124cc7028cc627"

export const moviesTrending = async () => {
    const trending = await axios.get(`${tmdbURL}/trending/all/day?api_key=${api_key}`);
    return trending.data;
}