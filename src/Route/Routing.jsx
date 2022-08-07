import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import { NotFound, Navbar } from "../components";

import {
  HistoryPage,
  HomePage,
  LikeVideoPage,
  PlaylistMoviesPage,
  PlaylistPage,
  SingleVideoPage,
  VideoListingPage,
  WatchLaterPage,
  LoginPage,
  SignupPage,
} from "../UI/Pages";
import {
  VideoDescriptionData,
  VideoData,
  UserHistoryData,
  WatchLaterData,
  PlayListData,
  ToastContextData,
  AuthContextData,
} from "../contexts/index";

import { ProtectedRoute } from "./ProtectedRoute";

const Routing = () => {
  return (
    <>
      <Router>
        <AuthContextData>
          <ToastContextData>
            <PlayListData>
              <UserHistoryData>
                <VideoDescriptionData>
                  <VideoData>
                    <WatchLaterData>
                      <Navbar />
                      <Routes>
                        <Route path="/mockman" element={<Mockman />} />
                        <Route element={<ProtectedRoute />}>
                          <Route path="/" element={<HomePage />} />
                          <Route
                            path="/watch/:id"
                            element={<SingleVideoPage />}
                          />
                          <Route
                            path="/movies"
                            element={<VideoListingPage />}
                          />
                          <Route
                            path="/likeplaylist"
                            element={<LikeVideoPage />}
                          />
                          <Route path="/history" element={<HistoryPage />} />
                          <Route
                            path="/watchlater"
                            element={<WatchLaterPage />}
                          />
                          <Route path="/playlist" element={<PlaylistPage />} />

                          <Route
                            path="/playlist/:title"
                            element={<PlaylistMoviesPage />}
                          />
                        </Route>

                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </WatchLaterData>
                  </VideoData>
                </VideoDescriptionData>
              </UserHistoryData>
            </PlayListData>
          </ToastContextData>
        </AuthContextData>
      </Router>
    </>
  );
};

export default Routing;
