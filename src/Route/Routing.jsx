import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import Home from "../UI/Pages/HomePage/HomePage";
import SingleVideoPage from "../UI/Pages/SingleVideoPage/SingleVideoPage";
import VideoListingPage from "../UI/Pages/VideoListingPage/VideoListingPage";
import LikeVideoPage from "../UI/Pages/LikeVideoPage/LikeVideoPage";
import HistoryPage from "../UI/Pages/HistoryPage/HistoryPage";
import WatchLaterPage from "../UI/Pages/WatchLaterPage/WatchLaterPage";
import PlayListPage from "../UI/Pages/PlaylistPage/PlaylistPage";
import PlaylistMoviesPage from "../UI/Pages/PlaylistPage/PlaylistMoviesPage";
import {
  VideoDescriptionData,
  VideoData,
  UserHistoryData,
  WatchLaterData,
  PlayListData,
} from "../contexts/index";

const Routing = () => {
  return (
    <>
      <Router>
        <PlayListData>
          <UserHistoryData>
            <VideoDescriptionData>
              <VideoData>
                <WatchLaterData>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/watch/:id" element={<SingleVideoPage />} />
                    <Route path="/movies" element={<VideoListingPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="/mockman" element={<Mockman />} />
                    <Route path="/likeplaylist" element={<LikeVideoPage />} />
                    <Route path="/watchlater" element={<WatchLaterPage />} />
                    <Route path="/playlist" element={<PlayListPage />} />
                    <Route
                      path="/playlist/:title"
                      element={<PlaylistMoviesPage />}
                    />
                  </Routes>
                </WatchLaterData>
              </VideoData>
            </VideoDescriptionData>
          </UserHistoryData>
        </PlayListData>
      </Router>
    </>
  );
};

export default Routing;
