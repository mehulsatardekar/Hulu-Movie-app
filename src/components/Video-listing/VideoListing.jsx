import React from "react";
import { Link } from "react-router-dom";
import { viewsFormatter } from "../../utils/views-formatter";
import { addwatchLater, deletewatchLater, historyVideo } from "../../utils";
import { useWatchLaterData, useHistoryData } from "../../hook";
import { useToast } from "../../contexts";

import "./videolisting.css";
const VideoListing = ({ VIDEOS }) => {
  const {
    watchLaterState: { watchLaterVideos },
    watchLaterDispatch,
  } = useWatchLaterData();

  const { historyState, historyDispatch } = useHistoryData();
  const { notifySuccess, notifyError } = useToast();

  const addVideoToHistory = async (movieDetail) => {
    const data = await historyVideo(movieDetail);
    if (data.status === 201) {
      notifySuccess("Video added to history");
      historyDispatch({ type: "ADD_TO_HISTORY", payload: movieDetail });
    }
  };

  const addToWatchLater = async (video) => {
    const data = await addwatchLater(video);

    if (data.status === 201) {
      notifySuccess("Video added to watch later");

      watchLaterDispatch({ type: "ADD_TO_WATCH_LATER", payload: video });
    }
  };

  const removeToWatchLater = async (video, videoid) => {
    const data = await deletewatchLater(videoid);
    if (data.status === 200) {
      notifySuccess("Video remove from watch later");
      watchLaterDispatch({ type: "REMOVE_FROM_WATCH_LATER", payload: video });
    }
  };

  return (
    <>
      {VIDEOS?.map((video) => {
        return (
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
                onClick={() => {
                  addVideoToHistory(video);
                }}
              >
                Watch Now
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export { VideoListing };
