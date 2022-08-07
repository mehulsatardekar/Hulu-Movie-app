import React, { useState, useEffect, useCallback } from "react";
import "./video-description.css";

import { viewsFormatter } from "../../utils/views-formatter";
import { useSingleVideoData, useDescriptionData } from "../../hook/";

import { likeVideo } from "../../utils/";

import { Toast, Modal } from "../index";
import { useToast } from "../../contexts";

const VideoDescription = () => {
  const [responseStatus, setResponseStatus] = useState();
  const [modalStatus, setModalStatus] = useState(null);
  const { movieDetail, watchId } = useSingleVideoData();
  const { notifySuccess, notifyError } = useToast();

  const {
    likeVideoState: { likedVideos },
    likeVideoDispatch,
  } = useDescriptionData();

  const addLike = async () => {
    const datas = await likeVideo(movieDetail);
    if (datas.status === 201) {
      notifySuccess("Video liked");
      likeVideoDispatch({ type: "LIKE", payload: movieDetail });
      setResponseStatus(201);
    } else if (datas.status === 409) {
      notifySuccess("Video is already liked");
      setResponseStatus(409);
    }
  };

  console.log();
  return (
    <>
      <div className="video-title ">
        <h2>{movieDetail.title}</h2>
      </div>
      <div className="video-elements mb-1">
        <div className="video-watchlist mt-1 flex flex-justify-center flex-align-item-center gap-1 font-mid-light">
          <div className="flex gap-1">
            <span className="font-ex-sm ">
              {viewsFormatter(movieDetail.viewCount)}
            </span>
            <span className="font-ex-sm font-bold">Views</span>
          </div>
          |<h5 className="font-ex-sm">{movieDetail.publishedAt}</h5>
        </div>
        <div className="video-elements mt-1 gap">
          <div
            className="like flex flex-justify-center flex-align-item-center gap-1"
            onClick={() => {
              addLike();
            }}
          >
            <span
              htmlFor="like"
              className="material-icons icons material-icons-outlined"
            >
              thumb_up_off_alt
            </span>
            <span id="like">
              {responseStatus === 201
                ? "Liked"
                : responseStatus === 409
                ? "Liked"
                : "Like"}
            </span>
          </div>
          <div className="share flex flex-justify-center flex-align-item-center gap-1">
            <span className="material-icons icons">share</span>
            <span>Share</span>
          </div>

          <div
            className="dislike flex flex-justify-center flex-align-item-center gap-1"
            onClick={() => {
              setModalStatus(true);
            }}
          >
            <span className="material-icons icons">bookmark_border</span>
            <span>Add To Playlist</span>
          </div>
          {modalStatus && (
            <Modal
              STATUS={modalStatus}
              SETMODALSTATUS={setModalStatus}
              MOVIEDETAIL={movieDetail}
            />
          )}
        </div>
      </div>
      <hr />
      <div className="video-desc mt-1">
        <h5 className=" font-bold mb-1 font-ex-sm">Description</h5>
        <p className="text-gray mb-2">{movieDetail.description}</p>
      </div>
    </>
  );
};

export { VideoDescription };
