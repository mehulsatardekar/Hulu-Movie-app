import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { singleMovieDataFetcher } from "../../utils/single-movie-data-fetcher";

const VideoDataContext = createContext();

const VideoData = ({ children }) => {
  const [movieDetail, setMovieDetail] = useState({});

  const watchId = useParams();

  const getMovieData = async () => {
    try {
      const videoData = await singleMovieDataFetcher(watchId.id);
      if (videoData.status === 200) {
        setMovieDetail(videoData.data.video);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieData();
  }, [watchId]);

  return (
    <VideoDataContext.Provider value={{ watchId, movieDetail }}>
      {children}
    </VideoDataContext.Provider>
  );
};

export { VideoData, VideoDataContext };
