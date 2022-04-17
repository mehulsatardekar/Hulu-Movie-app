import { createContext, useReducer } from "react";

const HistoryContext = createContext();

const initialvalue = {
  historyVideos: [],
};

const historyReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_HISTORY":
      const isHistoryVideoExist = state.historyVideos.find(
        (video) => video._id === action.payload._id
      );

      if (!isHistoryVideoExist) {
        return {
          ...state,
          historyVideos: [...state.historyVideos, { ...action.payload }],
        };
      } else {
        return { ...state, historyVideos: [...state.historyVideos] };
      }

    case "DELETE_HISTORY_VIDEO":
      return {
        ...state,
        historyVideos: state.historyVideos.filter(
          (video) => video._id !== action.payload._id
        ),
      };

    case "DELETE_ALL_HISTORY":
      return initialvalue;
    default:
      throw new Error("invalid dispatches found");
  }
};

const UserHistoryData = ({ children }) => {
  const [historyState, historyDispatch] = useReducer(
    historyReducer,
    initialvalue
  );

  return (
    <HistoryContext.Provider value={{ historyState, historyDispatch }}>
      {children}
    </HistoryContext.Provider>
  );
};

export { HistoryContext, UserHistoryData };
