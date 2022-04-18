const axios = require('axios');

const singleMovieDataFetcher = async (watchid)=>{
   const response  = await axios.get(`/api/video/${watchid}`);
   return await response;
}

export {singleMovieDataFetcher}

