import { useContext } from "react";
import { NavLink } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
function Header(props) {
  let theme = useContext(ThemeContext);
  return (
    <header className="flex">
      <div>
        <NavLink
          to="/"
          exact
          activeClassName="active"
          className={theme === "dark" ? "darkmode-text" : ""}
        >
          Popular
        </NavLink>
        <NavLink
          to="/battle"
          activeClassName="active"
          className={theme === "dark" ? "darkmode-text" : ""}
        >
          Battle
        </NavLink>
      </div>
      {theme === "light" ? (
        <button onClick={() => props.setTheme("dark")} className="toggle">
          🔦
        </button>
      ) : (
        <button onClick={() => props.setTheme("light")} className="toggle">
          💡
        </button>
      )}
    </header>
  );
}
export default Header;
