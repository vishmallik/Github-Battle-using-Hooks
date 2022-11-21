import { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
function Result(props) {
  let [playerOneData, setPlayerOneData] = useState(null);
  let [playerTwoData, setPlayerTwoData] = useState(null);

  let playerOne = new URLSearchParams(props.location.search).get("playerOne");
  let playerTwo = new URLSearchParams(props.location.search).get("playerTwo");

  useEffect(() => {
    fetchData(playerOne);
    fetchData(playerTwo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerOne, playerTwo]);

  async function fetchData(playerId) {
    let userData = await (
      await fetch(`https://api.github.com/users/${playerId}`)
    ).json();

    if (playerId === playerOne) {
      setPlayerOneData(userData);
    }
    if (playerId === playerTwo) {
      setPlayerTwoData(userData);
    }
  }

  if (!playerOneData || !playerTwoData) {
    return <Loader />;
  } else {
    let winner = "";
    if (score(playerOneData) > score(playerTwoData)) {
      winner = playerOne;
    } else if (score(playerTwoData) > score(playerOneData)) {
      winner = playerTwo;
    } else {
      winner = "draw";
    }
    if (playerOneData.message === "Not Found") {
      return <p className="error">{`${playerOne} doesn't exists!!!`}</p>;
    }
    if (playerTwoData.message === "Not Found") {
      return <p className="error">{`${playerTwo} doesn't exists!!!`}</p>;
    }
    return (
      <>
        <div className="flex card-wrapper">
          <PlayerCard player={playerOneData} winner={winner} />
          <PlayerCard player={playerTwoData} winner={winner} />
        </div>
        <Link to="/battle">
          <button>RESET</button>
        </Link>
      </>
    );
  }
}

function score(player) {
  return player.followers * 20 + player.public_repos;
}

function PlayerCard({ player, winner }) {
  let theme = useContext(ThemeContext);
  return (
    <div className={`card ${theme === "dark" ? "dark-card" : ""}`}>
      <h2>
        {winner === "draw"
          ? "Tie"
          : winner === player.login
          ? "Winner"
          : "Loser"}
      </h2>
      <img src={player.avatar_url} alt={player.login} />
      <p>Score: {score(player)}</p>
      <h1>{player.login}</h1>
      <div className="user-info">
        <div>
          <i className="fa-solid fa-user"></i>
          <span>{player.name}</span>
        </div>
        {player.location && (
          <div>
            <i className="fa-solid fa-compass"></i>
            <span>{player.location}</span>
          </div>
        )}
        {player.company && (
          <div>
            <i className="fa-solid fa-briefcase"></i>
            <span>{player.company}</span>
          </div>
        )}
        <div>
          <i className="fa-solid fa-users"></i>
          <span>{player.followers} followers</span>
        </div>
        <div>
          <i className="lni lni-users"></i>
          <span>{player.following} following</span>
        </div>
        <div>
          <i className="fa-solid fa-code"></i>
          <span>{player.public_repos} repositories</span>
        </div>
      </div>
    </div>
  );
}
export default Result;
