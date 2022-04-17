import axios from "axios";

export const deleteWatchLaterVideo = async (videoid) => {
    console.log(videoid);
  try {
    const videoData = await axios({
      method: "delete",
      url: `/api/user/watchlater/${videoid}`,
      headers: { authorization: process.env.REACT_APP_USERTOKEN },
     
    });
   
    console.log(videoData);
    return videoData;
  } catch (err) {
    return err.response;
  }
};