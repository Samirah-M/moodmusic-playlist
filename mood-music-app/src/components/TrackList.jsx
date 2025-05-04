import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function TrackList({ tracks }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      {tracks.map((playlist) => (
        <Card key={playlist.id} style={{ marginBottom: "1rem" }}>
          <CardContent>
            <Typography variant="h6">{playlist.name}</Typography>
            <Typography variant="body2">
              By {playlist.owner.display_name}
            </Typography>
            <Button
              href={playlist.external_urls.spotify}
              target="_blank"
              variant="contained"
            >
              Open Playlist
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
