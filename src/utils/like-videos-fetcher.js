import axios from "axios";

export const likeVideoFetcher = async () => {
  try {
    const likeVideosData = await axios({
        method: "get",
        url: "/api/user/likes",
        headers: { authorization: process.env.REACT_APP_USERTOKEN },
      });

    return {data:likeVideosData};

  } catch (err) {
    return err.response;
  }
};
