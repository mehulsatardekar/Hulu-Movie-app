import React from "react";
import "./videolistingpage.css";
import { VideoListing } from "../../../components/";
import { moviesDataFetcher } from "../../../utils/movies-data-fetcher";
import { Toaster } from "react-hot-toast";

import { useEffect, useState } from "react";
const VideoListingPage = () => {
  const [videos, setVideos] = useState([]);

  const [videoCategory, setVideoCategory] = useState(null);

  const getMoviesData = async () => {
    try {
      const videoData = await moviesDataFetcher();
      if (videoData.status === 200) {
        setVideos(videoData.data.videos);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMoviesData();
  }, []);

  const filterVideos = (movieList) => {
    return (type) => {
      const filterMovies = movieList.filter((movie) =>
        type === null
          ? movie
          : type !== "CLEAR_ALL"
          ? movie.types.includes(type)
          : movie
      );
      return filterMovies;
    };
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <main className="mt-3">
        <section className="video-lists-container flex flex-wrap gap ">
          <button
            className="btn-outline-primary btn btn-sm btn-round-20  btn-py-1 pills "
            onClick={() => {
              setVideoCategory("Horror");
            }}
          >
            <span className="icon-pad-right">HORROR</span>
          </button>

          <button
            className="btn-outline-primary btn btn-sm btn-round-20  btn-py-1 pills"
            onClick={() => setVideoCategory("Action")}
          >
            <span className="icon-pad-right">ACTION </span>
          </button>

          <button
            className="btn-outline-primary btn btn-sm btn-round-20  btn-py-1 pills"
            onClick={() => setVideoCategory("Drama")}
          >
            <span className="icon-pad-right">Drama </span>
          </button>

          <button
            className="btn-outline-primary btn btn-sm btn-round-20  btn-py-1 pills"
            onClick={() => setVideoCategory("Hindi")}
          >
            <span className="icon-pad-right">Hindi </span>
          </button>

          <button
            className="btn-outline-primary btn btn-sm btn-round-20  btn-py-1 pills"
            onClick={() => setVideoCategory("CLEAR_ALL")}
          >
            <span className="icon-pad-right">All Genre</span>
          </button>
        </section>
        <section>
          <div className="flex flex-wrap gap pb-3 flex-justify-center">
            <VideoListing VIDEOS={filterVideos(videos)(videoCategory)} />
          </div>
        </section>
      </main>
    </>
  );
};

export { VideoListingPage };
