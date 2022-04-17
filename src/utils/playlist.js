import axios from "axios";

// create playlist

export const createPlayList = async (playlistObj) => {
  try {
    const playlistData = await axios({
      method: "post",
      url: "/api/user/playlists",
      headers: { authorization: process.env.REACT_APP_USERTOKEN },
      data: {
        playlist: playlistObj,
      },
    });

    return playlistData;
  } catch (err) {
    return err.response;
  }
};

export const deletePlayList = async (playlistid) => {
  try {
    const playlistData = await axios({
      method: "delete",
      url: `/api/user/playlists/${playlistid}`,
      headers: { authorization: process.env.REACT_APP_USERTOKEN },
    });

    return playlistData;
  } catch (err) {
    return err.response;
  }
};
