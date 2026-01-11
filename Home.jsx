import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

const API_KEY = "3b1ff0f55fd35ac159eb496bf2efed9c";
const BASE_URL = "https://api.themoviedb.org/3";

export default function Home() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [trending, setTrending] = useState([]);
 
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
        );
        setSuggestions(res.data.results.slice(0, 5));
      } catch {
        setSuggestions([]);
      }
    };

    const delay = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delay);
  }, [query]);
 
  const searchMovies = async (text = query) => {
    if (!text.trim()) return;

    setLoading(true);
    setSuggestions([]);

    try {
      const res = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${text}`
      );
      setSearchResults(res.data.results || []);
    } catch {
      console.log("Search failed");
    }

    setLoading(false);
  };
 
  useEffect(() => {
    const fetchTrending = async () => {
      const res = await axios.get(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
      );
      setTrending(res.data.results);
    };

    fetchTrending();
  }, []);

  return (
    <div className="page"> 
      <div className="search-wrapper">
        <div className="search-box">
          <input
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => searchMovies()}>Search</button>
        </div>
 
        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  setQuery(m.title);
                  searchMovies(m.title);
                }}
              >
                {m.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {loading && <Loader />}
 
      {searchResults.length > 0 && (
        <>
          <h2> Search Results</h2>
          <div className="grid">
            {searchResults.map((m) => (
              <MovieCard key={m.id} movie={m} isTMDB />
            ))}
          </div>
        </>
      )}
 
      <h2>Trending Movies <br/></h2>
      <div className="grid">
        {trending.map((m) => (
          <MovieCard key={m.id} movie={m} isTMDB />
        ))}
      </div>
    </div>
  );
}
