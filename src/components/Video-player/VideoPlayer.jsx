import React, { useEffect } from "react";
import "./videoplayer.css";

import { useSingleVideoData, useHistoryData } from "../../hook/";
import { useToast } from "../../contexts";

import { historyVideo } from "../../utils";
const VideoPlayer = () => {
  const { watchId, movieDetail } = useSingleVideoData();

  const { historyDispatch } = useHistoryData();
  const { notifySuccess, notifyError } = useToast();

  const addVideoToHistory = async (movieDetail) => {
    const data = await historyVideo(movieDetail);
    if (data.status === 201) {
      notifySuccess("Video added to history");
      historyDispatch({ type: "ADD_TO_HISTORY", payload: movieDetail });
    }
  };

  useEffect(() => {
    if (movieDetail._id) {
      addVideoToHistory(movieDetail);
    }
  }, [addVideoToHistory]);

  return (
    <div className="video-player mt-3">
      <iframe
        className="video-player"
        src={`https://www.youtube.com/embed/${watchId.id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export { VideoPlayer };
