import React, { useState } from "react";

import { usePlayListData } from "../../hook/";
import { createPlayList } from "../../utils";
import "./modal.css";
const Modal = ({ STATUS, SETMODALSTATUS, MOVIEDETAIL }) => {
  const [userList, setUserList] = useState();

  const { playlistState, setPlaylistDispach } = usePlayListData();

  const playListCreate = async (playListTitle) => {
    const data = await createPlayList({
      title: playListTitle,
      description: "",
    });

    if (data.status === 201) {
      setPlaylistDispach({
        type: "ADD_LIST",
        payload: { title: userList, videos: [MOVIEDETAIL] },
      });
    } else {
      console.log("errror");
    }
    console.log("deleted data", data);
  };

  console.log("playlist state", playlistState);
  return (
    <>
      <div
        className={`modal ${STATUS ? "" : "hide"} md-effect-1 `}
        id="modalExample"
      >
        <div className="modal-container card-py modal-width modal-card">
          <div className="flex flex-between  flex-align-item-center pt-1 pb-1">
            <h1 className="font-mid-bold ">Playlist</h1>
            <span
              className="material-icons  card-close-btn flex flex-justify-center flex-align-item-center"
              id="modalCloseBtn"
              onClick={() => SETMODALSTATUS(false)}
            >
              close
            </span>
          </div>
          <section className="card-mb-1 model-content py-1 flex flex-column gap">
            <div className="flex full-width flex-column">
              {playlistState.map((playlist, i) => {
                return (
                  <div
                    className="flex flex-row gap-1 flex-align-item-center"
                    key={i}
                  >
                    <input
                      type="checkbox"
                      className="input-checkbox label-text-primary"
                      id={i + 1}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPlaylistDispach({
                            type: "ADD_VIDEO",
                            payload: {
                              title: playlist.title,
                              videos: [MOVIEDETAIL],
                            },
                          });
                        } else {
                          setPlaylistDispach({
                            type: "REMOVE_VIDEO",
                            payload: {
                              title: playlist.title,
                              videoid: MOVIEDETAIL._id,
                            },
                          });
                        }
                      }}
                      checked={playlist?.videos?.some(
                        (es) => es._id === MOVIEDETAIL._id
                      )}
                    />
                    <label htmlFor={i + 1} className="label-text">
                      {playlist.title}
                    </label>
                  </div>
                );
              })}
            </div>

            <div className={`flex flex-column gap-1 `}>
              <label
                htmlFor="passwordInput2"
                className="label-text label-text-primary"
              >
                Add List
              </label>
              <input
                type="text"
                className="input"
                placeholder="Add List"
                id="passwordInput2"
                onChange={(e) => setUserList(e.target.value)}
              />
            </div>
            <button
              className="btn-primary btn btn-sm btn-py-1 flex flex-justify-center width-full "
              onClick={() => playListCreate(userList)}
            >
              <span className="font-size-sm"> Add Playlist </span>
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default Modal;
