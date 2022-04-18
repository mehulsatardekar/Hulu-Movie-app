import axios from "axios";

export const addwatchLater = async (movieDetails) => {
   
  try {
    const videoData = await axios({
      method: "post",
      url: "/api/user/watchlater",
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

export const deletewatchLater = async (movieid) => {
    console.log(movieid);
  try {
    const videoData = await axios({
      method: "delete",
      url: `/api/user/watchlater/${movieid}`,
      headers: { authorization: process.env.REACT_APP_USERTOKEN },
     
    });
   
    console.log(videoData);
    return videoData;
  } catch (err) {
    return err.response;
  }
};