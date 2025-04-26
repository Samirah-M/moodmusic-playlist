import React from "react";
import { Button, Stack } from "@mui/material";

const moods = ["happy", "sad", "angry", "neutral"];

export default function MoodButtons({ onMoodSelect }) {
  return (
    <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
      {moods.map((mood) => (
        <Button
          key={mood}
          variant="contained"
          onClick={() => onMoodSelect(mood)}
        >
          {mood.toUpperCase()}
        </Button>
      ))}
    </Stack>
  );
}
