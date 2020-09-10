import React, { useState } from "react";

// Takes in an initial argument to set the mode state. We then return an object { mode }
function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace = false) {
    if (!replace) {
      setHistory([...history, newMode])
    } else {
      setHistory([...history.slice(0, history.length -1), newMode])
    }  
  };

  function back() {
    if (history.length > 1) {
    const newHistory = [...history.slice(0, history.length -1)];
      setHistory(newHistory)
    }   
  };
  return { mode:history[history.length-1], transition, back };
};

export default useVisualMode;