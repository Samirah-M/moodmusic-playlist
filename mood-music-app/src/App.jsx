import { useState } from "react";
import MoodButtons from "./components/MoodButtons";
import { searchTracks } from "./api/spotify";

function App() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMoodSelect = async (mood) => {
    setLoading(true);
    setError("");
    try {
      const results = await searchTracks(mood);
      setPlaylists(results);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch playlists");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Mood Music 🎶</h1>
      <MoodButtons onMoodSelect={handleMoodSelect} />

      {loading && <p>Loading playlists...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {Array.isArray(playlists) && playlists.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {playlists
            .filter((playlist) => playlist && playlist.images)
            .map((playlist) => (
              <div
                key={playlist.id}
                style={{
                  margin: "10px",
                  width: "200px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                  backgroundColor: "#fafafa",
                }}
              >
                {playlist.images.length > 0 ? (
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "8px",
                      backgroundColor: "#eee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#888",
                    }}
                  >
                    No Image
                  </div>
                )}
                <h3 style={{ fontSize: "16px", marginTop: "10px" }}>
                  {playlist.name}
                </h3>
                <a
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Spotify
                </a>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
