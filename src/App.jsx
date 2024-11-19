import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tracks, setTracks] = useState([]);
  const [serach, setSearch] = useState("daku");
  const [loading, setLoading] = useState(false);

  let getTracks = async (e) => {
    e.preventDefault(); // Prevents form from reloading the page
    setLoading(true); // Start loading
    try {
      let data = await fetch(
        `https://v1.nocodeapi.com/sahil_dogra/spotify/IlhooREgckvbRVBd/search?q=${serach}&type=track`
      );
      let convertedData = await data.json();
      console.log(convertedData.tracks.items);
      setTracks(convertedData.tracks.items);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
    setLoading(false); // End loading
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">My Music</a>
          <form className="d-flex" role="search" onSubmit={getTracks}>
            <input
              className="form-control me-2 w-75"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={serach}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      <div className="contain">
        {loading ? (
          <div className="col-12 text-center">
            <p>Loading...</p>
          </div>
        ) : tracks.length > 0 ? (
          <div className="row">
            {tracks.map((element) => {
              return (
                <div key={element.id} className="col">
                  <p>{element.name}</p>

                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={element.album.images[0].url}
                      className="card-img-top"
                      alt="Album cover"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{element.name}</h5>
                      <p className="card-text">
                        <strong>Artist:</strong> {element.album.artists[0].name}
                      </p>
                      {element.preview_url && (
                        <audio
                          src={element.preview_url}
                          controls
                          className="w-100"
                        ></audio>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="col-12 text-center">
            <p>No tracks found.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
