import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import Loader from "./Loader";
import Tooltip from "./Tooltip";

let languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
function Popular() {
  let [repos, setRepos] = useState(null);
  let [currentLanguage, setCurrentLanguage] = useState("All");
  useEffect(() => {
    fetch(
      `https://api.github.com/search/repositories?q=stars:%3E1+language:${currentLanguage}&sort=stars&order=desc&type=Repositories`
    )
      .then((res) => res.json())
      .then((data) => setRepos(data.items));
  }, [currentLanguage]);

  return (
    <>
      <ul className="languages flex">
        {languages.map((language) => (
          <li
            key={language}
            className={currentLanguage === language ? "active" : ""}
            onClick={() => setCurrentLanguage(language)}
          >
            {language}
          </li>
        ))}
      </ul>

      {!repos ? (
        <Loader />
      ) : (
        <ul className="repos">
          {repos.map((repo, index) => (
            <Card {...repo} index={index} />
          ))}
        </ul>
      )}
    </>
  );
}
function Card(props) {
  let theme = useContext(ThemeContext);
  return (
    <li className={theme === "dark" ? "dark-card" : ""}>
      <h4>#{props.index + 1}</h4>
      <img src={props.owner.avatar_url} alt={props.owner.login} />
      <a href={props.html_url}>{props.owner.login}</a>
      <div className="user-info">
        <div>
          <i className="fas fa-user"></i>
          <Tooltip text="Github username">
            <a
              href={props.owner.html_url}
              className={theme === "dark" ? "darkmode-text" : ""}
            >
              {props.owner.login}
            </a>
          </Tooltip>
        </div>
        <div>
          <i className="fas fa-star"></i>
          <span>{props.watchers} stars</span>
        </div>
        <div>
          <i className="fas fa-code-fork"></i>
          <span>{props.forks_count} forks</span>
        </div>
        <div>
          <i className="fas fa-triangle-exclamation"></i>
          <span>{props.open_issues_count} open issues</span>
        </div>
      </div>
    </li>
  );
}
export default Popular;
