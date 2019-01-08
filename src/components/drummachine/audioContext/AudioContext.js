import React from "react";

import WAAClock from "waaclock";

let audioCtx = undefined;
let clock = undefined;

const { Provider, Consumer } = React.createContext({
  getAudioContext: () => audioCtx,
  getClock: () => clock,
  requestInit: () => {
    if (audioCtx == null || clock == null) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;

      audioCtx = new AudioContext();
      clock = new WAAClock(audioCtx);
    }
  },
});

export default { Provider, Consumer };