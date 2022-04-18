const axios = require('axios');

const moviesDataFetcher = async ()=>{
   const response  = await axios.get('/api/videos');
   return await response;
}

export {moviesDataFetcher}

