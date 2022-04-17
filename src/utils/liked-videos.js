import axios from "axios";

export const likeVideo = async (movieDetail) => {
  try {
    const videoData = await axios({
      method: "post",
      url: "/api/user/likes",
      headers: { authorization: process.env.REACT_APP_USERTOKEN },
      data: {
        video: movieDetail,
      },
    });

    return videoData;
  } catch (err) {
    return err.response;
  }
};
