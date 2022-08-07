import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  addwatchLater,
  deletewatchLater,
  viewsFormatter,
  moviesDataFetcher,
} from "../../utils";
import { useWatchLaterData } from "../../hook";

import "./mustwatch.css";
import { useToast } from "../../contexts";

const MustWatch = () => {
  const [videos, setVideos] = useState([]);
  const { notifySuccess, notifyError } = useToast();

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
  const {
    watchLaterState: { watchLaterVideos },
    watchLaterDispatch,
  } = useWatchLaterData();

  const addToWatchLater = async (video) => {
    const data = await addwatchLater(video);

    if (data.status === 201) {
      notifySuccess("Video Added To Watch Later");
      watchLaterDispatch({ type: "ADD_TO_WATCH_LATER", payload: video });
    }
  };

  const removeToWatchLater = async (video, videoid) => {
    const data = await deletewatchLater(videoid);
    if (data.status === 200) {
      notifySuccess("Video Removed From Watch Later");
      watchLaterDispatch({ type: "REMOVE_FROM_WATCH_LATER", payload: video });
    }
  };

  return (
    <>
      {videos?.map((video, index) => {
        return 3 >= index ? (
          <div
            className="ui-card-basic card-bg card-py  ui-card-width-300  movie-card shadow-sm video-card"
            key={video._id}
          >
            <div className="flex relative">
              <img
                src={`https://images.weserv.nl/?url=${video.imgurl}`}
                alt={video.title}
                className="ui-card-img img-restros"
              />
              {watchLaterVideos.some((e) => e._id === video._id) ? (
                <span
                  className="material-icons icon"
                  onClick={() => {
                    removeToWatchLater(video, video._id);
                  }}
                  title="Remove From Watch Later"
                >
                  playlist_add_check_circle
                </span>
              ) : (
                <span
                  className="material-icons icon"
                  onClick={() => {
                    addToWatchLater(video);
                  }}
                  title="Add To Watch Later"
                >
                  watch_later
                </span>
              )}
            </div>
            <div className="flex flex-column pl-04 pt-1">
              <span className="font-bold pb-09 w-100">{video.title}</span>
              <span className="font-md-light pb-02  w-100">
                <span>{video.types?.join()}</span> |{" "}
                <span>{video.publishedAt}</span>
              </span>
            </div>
            <div className="ui-card-dec flex flex-between pl-04">
              <div className="rating-section flex-align-item-center mt-09 ">
                <div className="rating-icon flex pl-010 pr-010 pt-01 pb-01 flex-align-item-center">
                  <span className="material-icons icon-sm star-yellow">
                    visibility
                  </span>
                  <span className="card-rating-padding" title="currently views">
                    {viewsFormatter(video.viewCount)} views
                  </span>
                </div>
              </div>
              <div className="mt-09">
                <span className="font-md-light">{video.channelTitle}</span>
              </div>
            </div>
            <div className="ui-card-discount flex flex-justify-center pt-3px mt-1 ">
              <Link
                to={`/watch/${video._id}`}
                className="btn-primary btn btn-sm width-full"
              >
                Watch Now
              </Link>
            </div>
          </div>
        ) : (
          ""
        );
      })}
    </>
  );
};

export { MustWatch };
