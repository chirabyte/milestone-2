import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="navbar">
      <h2> MovieApp</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <button onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
