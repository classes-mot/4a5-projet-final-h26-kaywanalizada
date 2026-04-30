import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const storedGames = JSON.parse(localStorage.getItem("jeux")) || [];

  const gameSelected = storedGames.find((g) => g.id === id);

  if (!gameSelected) {
    return (
      <div className="center">
        <h2>Could not find game!</h2>
      </div>
    );
  }

  function updateGameSubmitHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const updatedGames = storedGames.map((g) =>
      g.id === id
        ? {
            ...g,
            title: data.title,
            description: data.description,
            pictureUrl: data.pictureUrl,
            categorie: data.categorie,
            nbJoueur: data.nbJoueur,
            duree: data.duree,
          }
        : g,
    );

    localStorage.setItem("jeux", JSON.stringify(updatedGames));
    navigate("/gameList");
    console.log(updatedGames);
  }

  return (
    <form onSubmit={updateGameSubmitHandler}>
      <h2>Update Game</h2>

      <div className="control">
        <label htmlFor="title">Game title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={gameSelected.title}
          required
        />
      </div>

      <div className="control">
        <label htmlFor="type">Game type</label>
        <textarea
          id="type"
          name="type"
          rows="4"
          cols="35"
          defaultValue={gameSelected.type}
        />
      </div>

        <div className="control">
        <label htmlFor="nbQuestions">Nombre de questions</label>
        <input
          id="nbQuestions"
          type="number"
          name="nbQuestions"
        />
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Update
        </button>       
      </p>
    </form>
  );
}
