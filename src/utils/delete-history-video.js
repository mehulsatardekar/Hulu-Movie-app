import axios from "axios";

export const deleteHistoryVideo = async (historyid) => {
    console.log(historyid);
  try {
    const historyData = await axios({
      method: "delete",
      url: `/api/user/history/${historyid}`,
      headers: { authorization: process.env.REACT_APP_USERTOKEN },
     
    });
   
    console.log(historyData);
    return historyData;   
  } catch (err) {
    return err.response;
  }
};

export const deleteAllHistoryVideo = async () => {
try {
  const historyData = await axios({
    method: "delete",
    url: `/api/user/history/all`,
    headers: { authorization: process.env.REACT_APP_USERTOKEN },
   
  });
 
  console.log(historyData);
  return historyData;   
} catch (err) {
  return err.response;
}
};