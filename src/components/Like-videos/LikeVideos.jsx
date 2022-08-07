import React from "react";
import { Link } from "react-router-dom";
import { viewsFormatter } from "../../utils/views-formatter";
import { deleteLikeVideo } from "../../utils";
import "../Video-listing/videolisting.css";
import { useToast } from "../../contexts";

import { useDescriptionData } from "../../hook/";

const LikeVideos = () => {
  const { notifySuccess, notifyError } = useToast();

  const { likeVideoState, likeVideoDispatch } = useDescriptionData();

  const deleteVideo = async (movieid, video) => {
    const data = await deleteLikeVideo(movieid);

    if (data.status === 200) {
      notifySuccess("video deleted from like");
      likeVideoDispatch({ type: "DELETE_LIKE_VIDEO", payload: video });
    }
  };

  return (
    <>
      {likeVideoState.likedVideos.length > 0 &&
        likeVideoState.likedVideos.map((video) => {
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
                  className="material-icons icon close-icon"
                  onClick={() => {
                    deleteVideo(video._id, video);
                  }}
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
                    <span className="card-rating-padding">
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
          );
        })}

      {likeVideoState.likedVideos.length === 0 && (
        <>
          <div className="flex flex-column flex-align-item-center">
            <img
              src="https://res.cloudinary.com/dwhsfh3sc/image/upload/v1648998454/zeplin-movies/movie-assets-imgs/Film_rolls-rafiki_1_xvlluh.svg"
              alt="No-likes-video-found"
              className="likevideo-404"
            />

            <h1 className="mt-3">Ahh huh.. No Liked Video Founds</h1>

            <Link to="/" className="btn-primary btn btn-sm mt-3">
              Home
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export { LikeVideos };
