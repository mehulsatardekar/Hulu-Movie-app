import axios from "axios";

export const deleteLikeVideo = async (movieid) => {
    console.log(movieid);
  try {
    const videoData = await axios({
      method: "delete",
      url: `/api/user/likes/${movieid}`,
      headers: { authorization: process.env.REACT_APP_USERTOKEN },
     
    });
   
    console.log(videoData);
    return videoData;
  } catch (err) {
    return err.response;
  }
};