import React, {useEffect, useState} from "react";
import VideoPlayer from "../../../components/Video-player/VideoPlayer";
import VideoDescription from "../../../components/Video-descritpion/VideoDescription";
import Videos from "../../../components/Video-listing/VideoListing";

import { VideoData } from "../../../contexts/single-video-page/VideoDataContext";

import { Navbar } from "../../../components";
import { moviesDataFetcher } from "../../../utils/movies-data-fetcher";

import {useSingleVideoData, useDescriptionData} from '../../../hook'
import "./singlevideopage.css";

const SingleVideoPage = () => {
  const [videos, setVideos] = useState([])

  const getMoviesData  = async()=>{
    try{
       const videoData =  await moviesDataFetcher();
       if(videoData.status === 200){
           setVideos(videoData.data.videos);
       }
    }catch(err){
        console.error(err);
    }
}

useEffect(()=>{
 getMoviesData();
},[])
  return (
    <>
    
    <Navbar/>
    <main className="flex video-container mb-3">
      <div className="flex-7">
        <VideoData>
          <VideoPlayer />

          
          <VideoDescription />
        </VideoData>
      </div>
      <div className="flex-3 ">
        <div className="flex flex-wrap gap pb-3 flex-justify-center mt-2">
          {/* card starts here */}
          <Videos  VIDEOS={videos}/>
        </div>
      </div>
    </main>
    </>
  );
};

export default SingleVideoPage;
