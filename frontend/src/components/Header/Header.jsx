import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Header.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const bonLogout = () => {
    logout();
    navigate("/quizList");
  };
  return (
    <header className="main-header">
      <h1 className="title">{t("Quiz de Football")}</h1>

      <nav className="nav-links">
        <Link to="/QuizList">{t("Mes quiz")}</Link>
        {isLoggedIn && <Link to="/add">{t("Ajouter un quiz")}</Link>}
        {isLoggedIn ? (
          <button onClick={bonLogout} className="logout-btn">
            {t("Se déconnecter")}
          </button>
        ) : (
          <>
          <Link to="/login">{t("Se connecter")}</Link>
          <Link to="/signup">{t("Créer un compte")}</Link>
          </>
        )}
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
