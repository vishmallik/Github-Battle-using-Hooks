import "../stylesheets/_loader.css";
export default function Loader() {
  return (
    <h2 className="loader">
      Fetching Repos<span className="loading"></span>
    </h2>
  );
}
