import { useEffect, useState } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import Battle from "./Battle";
import Footer from "./Footer";
import Header from "./Header";
import Popular from "./Popular";
import Result from "./Result";
function App() {
  let [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || "light"
  );
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
  return (
    <HashRouter>
      <div className={theme === "dark" ? "dark" : ""}>
        <div className="container">
          <ThemeContext.Provider value={theme}>
            <Header setTheme={setTheme} />
            <Switch>
              <Route path="/" exact>
                <Popular />
              </Route>
              <Route path="/battle" exact>
                <Battle />
              </Route>
              <Route path="/battle/result" exact component={Result} />
            </Switch>
          </ThemeContext.Provider>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}
export default App;
