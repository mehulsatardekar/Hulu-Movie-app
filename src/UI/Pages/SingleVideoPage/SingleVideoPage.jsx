import React, { useEffect, useState } from "react";
import {
  VideoPlayer,
  VideoDescription,
  VideoListing,
} from "../../../components/";

import { VideoData } from "../../../contexts/single-video-page/VideoDataContext";

import { moviesDataFetcher } from "../../../utils/movies-data-fetcher";
import "./singlevideopage.css";
import { Toaster } from "react-hot-toast";

const SingleVideoPage = () => {
  const [videos, setVideos] = useState([]);

  const getMoviesData = async () => {
    try {
      const videoData = await moviesDataFetcher();
      if (videoData.status === 200) {
        setVideos(videoData.data.videos);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMoviesData();
  }, []);
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <main className="flex video-container mb-3">
        <div className="flex-7">
          <VideoData>
            <VideoPlayer />

            <VideoDescription />
          </VideoData>
        </div>
        <div className="flex-3 ">
          <div className="flex flex-wrap gap pb-3 flex-justify-center mt-2">
            {/* card starts here */}
            <VideoListing VIDEOS={videos} />
          </div>
        </div>
      </main>
    </>
  );
};

export { SingleVideoPage };
