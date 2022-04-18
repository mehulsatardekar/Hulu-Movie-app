import axios from "axios";

export const historyVideo = async (movieDetails) => {
   
  try {
    const videoData = await axios({
      method: "post",
      url: "/api/user/history",
      headers: { authorization: process.env.REACT_APP_USERTOKEN },
      data: {
       video: movieDetails,
      },
    });
    
    // console.log('history', videoData);
    return videoData;
  } catch (err) {
    return err.response;
  }
};
