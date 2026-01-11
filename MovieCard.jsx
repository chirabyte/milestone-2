import { Link } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, isTMDB }) {
  const id = isTMDB ? movie.id : movie.imdbID;
  const title = isTMDB ? movie.title : movie.Title;
  const year = isTMDB
    ? movie.release_date?.split("-")[0]
    : movie.Year;
  const poster = isTMDB
    ? movie.poster_path
      ? IMAGE_BASE + movie.poster_path
      : "https://via.placeholder.com/300x450?text=No+Image"
    : movie.Poster;

  return (
    <Link to={`/movie/${id}`} className="card-link">
      <div className="movie-card">
        <img src={poster} alt={title} />
        <div className="card-body">
          <h3>{title}</h3>
          <p>{year}</p>
        </div>
      </div>
    </Link>
  );
}
