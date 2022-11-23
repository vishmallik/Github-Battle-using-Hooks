import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
function Instructions(props) {
  let theme = useContext(ThemeContext);
  return (
    <>
      <h1>Instructions</h1>
      <div className="flex battle">
        <div className="flex-33">
          <h3>Enter Two Github user</h3>
          <i
            className={`fa-solid fa-users ${
              theme === "dark" ? "dark-card" : ""
            }`}
          ></i>
        </div>
        <div className="flex-33">
          <h3>Battle</h3>
          <i
            className={`fa-solid fa-plane ${
              theme === "dark" ? "dark-card" : ""
            }`}
          ></i>
        </div>
        <div className="flex-33">
          <h3>See the Winner</h3>
          <i
            className={`fa-solid fa-trophy ${
              theme === "dark" ? "dark-card" : ""
            }`}
          ></i>
        </div>
      </div>
    </>
  );
}

function Battle() {
  let [playerOne, setPlayerOne] = useState("");
  let [playerTwo, setPlayerTwo] = useState("");

  function handleSubmit(event, username, id) {
    event.preventDefault();
    if (id === 1) {
      setPlayerOne(username);
    }
    if (id === 2) {
      setPlayerTwo(username);
    }
  }
  function handleReset(id) {
    if (id === 1) {
      setPlayerOne("");
    }
    if (id === 2) {
      setPlayerTwo("");
    }
  }
  return (
    <>
      <Instructions />
      <h1>Players</h1>
      <div className="flex">
        <div className="flex-48">
          <p>Player One</p>
          {playerOne ? (
            <PlayerPreview
              username={playerOne}
              playerId={1}
              handleReset={handleReset}
            />
          ) : (
            <PlayerInput playerId={1} handleSubmit={handleSubmit} />
          )}
        </div>
        <div className="flex-48">
          <p>Player Two</p>
          {playerTwo ? (
            <PlayerPreview
              username={playerTwo}
              playerId={2}
              handleReset={handleReset}
            />
          ) : (
            <PlayerInput playerId={2} handleSubmit={handleSubmit} />
          )}
        </div>
      </div>
      <Link to={`/battle/result?playerOne=${playerOne}&playerTwo=${playerTwo}`}>
        <button>BATTLE</button>
      </Link>
    </>
  );
}

function PlayerInput(props) {
  let theme = useContext(ThemeContext);
  let [username, setUsername] = useState("");
  return (
    <form
      action=""
      className={`form-control flex-48 ${theme === "dark" ? "dark" : ""}`}
      onSubmit={(event) => props.handleSubmit(event, username, props.playerId)}
    >
      <input
        type="text"
        name=""
        id=""
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <input type="submit" value="SUBMIT" />
    </form>
  );
}

function PlayerPreview(props) {
  let theme = useContext(ThemeContext);
  return (
    <div className={`user flex ${theme === "dark" ? "dark-card" : ""}`}>
      <img
        src={`https://github.com/${props.username}.png?size=200`}
        alt={`Avatar for ${props.username}`}
      />
      <a href={`https://github.com/${props.username}`} className="link">
        {props.username}
      </a>
      <i
        className="fas fa-circle-xmark"
        onClick={() => props.handleReset(props.playerId)}
      ></i>
    </div>
  );
}
export default Battle;
