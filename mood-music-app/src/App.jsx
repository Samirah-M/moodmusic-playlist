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
      <h1
        style={{ fontWeight: "bold", fontSize: "2rem", marginBottom: "10px" }}
      >
        Mood Music 🎶
      </h1>

      <MoodButtons onMoodSelect={handleMoodSelect} />

      {loading && <p>Loading playlists...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        {playlists
          .filter((playlist) => playlist && playlist.id)
          .map((playlist) => (
            <div
              key={playlist.id}
              style={{
                margin: "10px",
                width: "340px",
              }}
            >
              <iframe
                title={playlist.name.replace(/[\u{1F600}-\u{1F6FF}]/gu, "")}
                src={`https://open.spotify.com/embed/playlist/${playlist.id}`}
                width="100%"
                height="380"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: "8px" }}
              ></iframe>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
