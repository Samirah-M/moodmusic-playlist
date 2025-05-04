import React from "react";
import { Typography } from "@mui/material";

export default function LyricsDisplay({ lyrics }) {
  return (
    <div style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
      <Typography variant="h6">Lyrics:</Typography>
      <Typography>{lyrics}</Typography>
    </div>
  );
}
