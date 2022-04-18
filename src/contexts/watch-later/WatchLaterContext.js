import { createContext, useReducer } from "react";

const WatchLaterContext = createContext();

const initialvalue = {
  watchLaterVideos: [],
};

const watchLaterReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCH_LATER":
      const isWatchLaterVideoExist = state.watchLaterVideos.find(
        (video) => video._id === action.payload._id
      );

      if (!isWatchLaterVideoExist) {
        return {
          ...state,
          watchLaterVideos: [...state.watchLaterVideos, { ...action.payload }],
        };
      } else {
        return { ...state, watchLaterVideos: [...state.watchLaterVideos] };
      }

    case "REMOVE_FROM_WATCH_LATER":
      return {
        ...state,
        watchLaterVideos: state.watchLaterVideos.filter(
          (video) => video._id !== action.payload._id
        ),
      };

    case "DELETE_ALL_HISTORY":
      return initialvalue;
    default:
      throw new Error("invalid dispatches found");
  }
};

const WatchLaterData = ({ children }) => {
  const [watchLaterState, watchLaterDispatch] = useReducer(
    watchLaterReducer,
    initialvalue
  );

  return (
    <WatchLaterContext.Provider value={{ watchLaterState, watchLaterDispatch }}>
      {children}
    </WatchLaterContext.Provider>
  );
};

export { WatchLaterContext, WatchLaterData };
