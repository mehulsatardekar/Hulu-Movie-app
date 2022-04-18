import React from "react";
import { Link } from "react-router-dom";
import "./list.css";
import { usePlayListData } from "../../hook";
import { deletePlayList } from "../../utils/";
const List = ({ title, videos, id }) => {
  const { setPlaylistDispach } = usePlayListData();
  const playListDelete = async (title) => {
    const deletePlayListData = await deletePlayList(title);

    if (deletePlayListData.status === 200) {
      setPlaylistDispach({ type: "DELETE_LIST", payload: title });
    }
  };

  return (
    <>
      <div
        className="flex shadow-sm  flex flex-column list-card gap-1"
        key={id}
      >
        <div className="flex flex-between gap-3">
          <Link to={`${title}`} className="playlist-text">
            <h3>{title}</h3>
          </Link>
          <span
            className="material-icons icons"
            onClick={() => playListDelete(title)}
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

export default List;
