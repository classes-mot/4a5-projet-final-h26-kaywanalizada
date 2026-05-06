import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useHttpClient } from "../../hooks/http-hook";
import "./CreateCompte.css";

export default function CreateCompte() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailVide, setEmailVide] = useState(false);
  const [passVide, setPassVide] = useState(false);

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    const emailVide = email.trim() === "";
    const passwordVide = password.trim() === "";

    setEmailVide(emailVide);
    setPassVide(passwordVide);

    if (emailVide || passwordVide) return;
    try{
      const data = await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/signup`,
        "POST",
        JSON.stringify({ email, password})
      );

      sessionStorage.setItem("token", data.token);

      login();

      navigate("/quizList");
    }catch(error){
      console.log(error);
    }
  };

  return (
    <form onSubmit={authSubmitHandler}>
      <h2>Créer un compte</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailVide && <div className="error">Champ obligatoire</div>}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {passVide && <div className="error">Champ obligatoire</div>}
        </div>
      </div>

      <p className="form-actions">
        <button className="button">Créer un compte</button>
      </p>
    </form>
  );
}

// a faire */
