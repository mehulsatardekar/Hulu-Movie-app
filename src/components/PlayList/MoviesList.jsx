import React from "react";
import { viewsFormatter } from "../../utils/views-formatter";
import { historyVideo } from "../../utils";
import { useHistoryData, usePlayListData } from "../../hook";
import { useParams, Link } from "react-router-dom";
import { useToast } from "../../contexts";

const MoviesList = () => {
  const { historyDispatch } = useHistoryData();
  const { notifySuccess, notifyError } = useToast();

  const addVideoToHistory = async (movieDetail) => {
    const data = await historyVideo(movieDetail);
    if (data.status === 201) {
      notifySuccess("video added to history");
      historyDispatch({ type: "ADD_TO_HISTORY", payload: movieDetail });
    }
  };

  const title = useParams();

  const playlistTitle = title.title;

  const { playlistState, setPlaylistDispach } = usePlayListData();

  const removeFromPlaylist = (playlistTitle, videosid) => {
    notifySuccess("Video Deleted from playlist");
    setPlaylistDispach({
      type: "REMOVE_VIDEO",
      payload: { title: playlistTitle, videoid: videosid },
    });
  };

  return (
    <>
      {playlistState
        .find((playlist) => playlist.title === title.title)
        .videos.map((video) => {
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
                <span
                  className="material-icons icon"
                  onClick={() => removeFromPlaylist(playlistTitle, video._id)}
                  title="Remove From playlist"
                >
                  close
                </span>
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
                    <span
                      className="card-rating-padding"
                      title="currently views"
                    >
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

export { MoviesList };
