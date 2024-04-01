import { useParams } from "react-router-dom";
import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
function VedioPlayer({url}) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [played, setPlayed] = useState(0);
  const playerRef = useRef(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = () => {
    setSeeking(false);
    playerRef.current.seekTo(played);
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleEnded = () => {
    setPlaying(false);
    setPlayed(0);
  };

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url={url}
        controls
      />

      {/* <div>
        <button onClick={handlePlayPause}>{playing ? "Pause" : "Play"}</button>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
        />
        <span>Volume:</span>
        <button onClick={handleMute}>{muted ? "Unmute" : "Mute"}</button>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div> */}
    </div>
  );
}
export default VedioPlayer;
