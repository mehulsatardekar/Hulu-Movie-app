import { createContext, useReducer } from "react";

const PlayListContext = createContext();

const playlists = [];

const playlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_LIST":
      const isListAvailable = state.some(
        (e) => e.title === action.payload.title
      );

      if (!isListAvailable) {
        return state.concat(action.payload);
      } else {
        return state;
      }

    case "DELETE_LIST":
      return state.filter((playlist) => playlist.title !== action.payload);

    case "ADD_VIDEO":
      console.log("adding video ", action.payload);

      return state.map((e) =>
        e.title === action.payload.title
          ? { ...e, videos: e.videos.concat(action.payload.videos) }
          : e
      );

    case "REMOVE_VIDEO":
      return state.map((e) =>
        e.title === action.payload.title
          ? {
              ...e,
              videos: e.videos.filter(
                (video) => video?._id !== action.payload.videoid
              ),
            }
          : e
      );

    default:
      throw new Error("invalid dispatches found");
  }
};

const PlayListData = ({ children }) => {
  const [playlistState, setPlaylistDispach] = useReducer(
    playlistReducer,
    playlists
  );

  return (
    <PlayListContext.Provider value={{ playlistState, setPlaylistDispach }}>
      {children}
    </PlayListContext.Provider>
  );
};

export { PlayListContext, PlayListData };
