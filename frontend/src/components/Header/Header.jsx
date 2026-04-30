import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const bonLogout = () => {
    logout();
    navigate("/gameList");
  };
  return (
    <header className="main-header">
      <h1 className="title">Quiz de Football</h1>

      <nav className="nav-links">
        <Link to="/GameList">Mes quiz</Link>
        {isLoggedIn && <Link to="/add">Ajouter un quiz</Link>}
        {isLoggedIn ? (
          <button onClick={bonLogout} className="logout-btn">
            Se déconnecter
          </button>
        ) : (
          <Link to="/login">Se connecter</Link>
        )}
      </nav>
    </header>
  );
}
