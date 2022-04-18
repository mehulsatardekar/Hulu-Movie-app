import axios from "axios";

export const watchLaterVideosFetcher = async () => {
  try {
    const  historyVideosData = await axios({
        method: "get",
        url: "/api/user/watchlater",
        headers: { authorization: process.env.REACT_APP_USERTOKEN },
      });

    return {data: historyVideosData};

  } catch (err) {
    return err.response;
  }
};