import React from "react";
import { Link } from "react-router-dom";
import "./list.css";
import { usePlayListData } from "../../hook";
import { deletePlayList } from "../../utils/";
import { useToast } from "../../contexts";

const List = ({ title, videos, id }) => {
  const { setPlaylistDispach } = usePlayListData();
  const { notifySuccess, notifyError } = useToast();

  const playListDelete = async (title) => {
    const deletePlayListData = await deletePlayList(title);

    if (deletePlayListData.status === 200) {
      notifySuccess("Playlist Deleted");
      setPlaylistDispach({ type: "DELETE_LIST", payload: title });
    }
  };

  return (
    <>
      <div
        className="flex shadow-sm  flex flex-column list-card gap-1"
        key={id}
        id="list-card"
      >
        <div className="flex flex-between gap-3">
          <Link to={`${title}`} className="playlist-text">
            <h3>{title}</h3>
          </Link>
          <span
            className="material-icons icons"
            onClick={() => playListDelete(title)}
            title="delete list"
          >
            delete
          </span>
        </div>
        <div className="video-count col-gray">
          <span>{videos.length} videos</span>
        </div>
      </div>
    </>
  );
};

export { List };
