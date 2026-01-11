import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "3b1ff0f55fd35ac159eb496bf2efed9c";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [images, setImages] = useState([]);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const movieRes = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
        );

        const creditsRes = await axios.get(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
        );

        const imagesRes = await axios.get(
          `${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`
        );

        setMovie(movieRes.data);
        setActors(creditsRes.data.cast.slice(0, 6));
        setImages(imagesRes.data.backdrops.slice(0, 8));

        const favs = JSON.parse(localStorage.getItem("favorites")) || [];
        setFav(favs.some((m) => m.id === movieRes.data.id));
      } catch (err) {
        console.log("Error loading details");
      }
    };

    fetchAll();
  }, [id]);

  const toggleFav = () => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];
    if (fav) {
      favs = favs.filter((m) => m.id !== movie.id);
    } else {
      favs.push(movie);
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
    setFav(!fav);
  };

  if (!movie) return <p className="loader">Loading...</p>;

  return (
    <div className="page details">
      <img
        src={
          movie.poster_path
            ? IMAGE_BASE + movie.poster_path
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.title}
      />

      <div>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>

        <p><b>Genres:</b> {movie.genres.map(g => g.name).join(", ")}</p>
        <p><b>Actors:</b> {actors.map(a => a.name).join(", ")}</p>
        <p><b>Rating:</b> {movie.vote_average.toFixed(1)}</p>
        <p><b>Runtime:</b> {movie.runtime} min</p>

        <button onClick={toggleFav}>
          {fav ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
 
      <h2 style={{ marginTop: "40px" }}> More Images</h2>
      <div className="image-gallery">
        {images.map((img, i) => (
          <img
            key={i}
            src={IMAGE_BASE + img.file_path}
            alt="scene"
          />
        ))}
      </div>
    </div>
  );
}
