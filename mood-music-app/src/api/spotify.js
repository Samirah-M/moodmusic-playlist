import axios from "axios";

let token = "";

const getToken = async () => {
  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization:
          "Basic " +
          btoa(
            `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  token = res.data.access_token;
};

export const searchTracks = async (mood) => {
  if (!token) await getToken();

  const moodKeywords = {
    happy: "happy upbeat",
    sad: "sad emotional",
    angry: "angry rock",
    neutral: "chill",
  };

  const query = encodeURIComponent(moodKeywords[mood]);

  const res = await axios.get(
    `https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=10`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.playlists.items;
};
