import React, { useRef, useEffect, useState } from "react";
import "./home-container.css";
const HomeContainer = () => {
  const videoElement = useRef(null);

  const [muteState, setMuteState] = useState(false);
  useEffect(() => {
    videoElement.current.muted = muteState;
  });

  const toggleVideoMute = () => {
    setMuteState(!muteState);
    videoElement.current.muted = muteState;
  };
  return (
    <section className="header">
      <div className="overlay"></div>
      <video autoPlay={true} ref={videoElement} muted>
        <source
          src="https://res.cloudinary.com/dwhsfh3sc/video/upload/v1659713016/zeplin-movies/movie-vids/witcher_1_vjkewq.mp4"
          type="video/mp4"
        />
      </video>

      <div className="movie-info  w-50">
        <div className="movie-img ">
          <img
            className="video-img-title"
            src="https://occ-0-2164-2186.1.nflxso.net/dnm/api/v6/5e0byrbbfBPBmtxyXMpKqMuqOQY/AAAABStRa0c8EFHziT9jn9I0Wu_MqCJaMRrUhm-NkT0NNNr-Xx2m7zM3Q8rFGUXLPileawgPPOIKR5_7-yKtYSrHDqRqgKiXu2q5t9woEu-5NiN2kve9MmXBCOxoudtZaXaYRMs37XIHGeSuZ26vUpgKG4aWUAjnLo82Yc42wozIKhlgrA.webp?r=286"
            alt="witcher-title"
          />
        </div>
        <div className="mt-2 ml-3  flex flex-column gap font-white">
          <div className="flex flex-row flex-align-item-center flex-justify-item-center gap">
            <h1 className="font-white font-bold font-sm">The Witcher</h1>
            <button className=" pl-04 pr-04 pt-03 pb-03 movie-rating-btn">
              <span className="font-ex-sm">18+</span>
            </button>
          </div>
          <p className="movie-desc font-white ">
            Hostile townsfilk and a cunning mage geralt in the town of Blaviken.
            Ciri finds her royal world upended when Nilfgaard sets its sights on
            Cintra.
          </p>
          <div className="flex flex-row gap">
            <button
              className="play-btn btn btn-sm flex flex-align-item-center"
              title="Feature not available "
            >
              <span className="material-icons pr-02">play_arrow</span>
              <span>Play</span>
            </button>

            <div className="badge" onClick={toggleVideoMute}>
              <span className="material-icons icon-badge badge-status-shadow">
                {muteState ? "volume_off" : "volume_up"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HomeContainer };
