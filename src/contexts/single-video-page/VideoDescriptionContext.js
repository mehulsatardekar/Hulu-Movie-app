import { createContext, useReducer } from "react";

const VideoDescriptionContext = createContext();

const initialValue = {
  likedVideos: [],
  historyVideos: [],
};

const likReducer = (state, action) => {
  switch (action.type) {
    case "LIKE":
      const isVideoExist = state.likedVideos.find(
        (video) => video._id === action.payload._id
      );

      if (!isVideoExist) {
        return {
          ...state,
          likedVideos: [...state.likedVideos, { ...action.payload }],
        };
      } else {
        return {
          ...state,
          likedVideos: [...state.likedVideos],
        };
      }

    case "DELETE_LIKE_VIDEO":
      return {
        ...state,
        likedVideos: state.likedVideos.filter(
          (video) => video._id !== action.payload._id
        ),
      };

    default:
      throw new Error("invalid dispatches found");
  }
};

const VideoDescriptionData = ({ children }) => {
  const [likeVideoState, likeVideoDispatch] = useReducer(
    likReducer,
    initialValue
  );

  return (
    <VideoDescriptionContext.Provider
      value={{ likeVideoState, likeVideoDispatch }}
    >
      {children}
    </VideoDescriptionContext.Provider>
  );
};

export { VideoDescriptionData, VideoDescriptionContext };
