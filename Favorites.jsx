import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setMovies(favs);
  }, []);

  return (
    <div className="page">
      <h2>Favorite Movies</h2>

      {movies.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px", opacity: 0.7 }}>
          No favorites added yet
        </p>
      )}

      <div className="grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isTMDB
          />
        ))}
      </div>
    </div>
  );
}
