import React from "react";
import { LikeVideos } from "../../../components";
import { useDescriptionData } from "../../../hook";
import { Toaster } from "react-hot-toast";

import "./like-video-page.css";
const LikeVideoPage = () => {
  const { likeVideoState } = useDescriptionData();

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <main className="mt-3">
        <section className="video-lists-container flex flex-wrap gap">
          <h1>You have {likeVideoState.likedVideos.length} Liked Videos </h1>
        </section>
        <section>
          <div className="flex flex-wrap gap pb-3 flex-justify-center">
            <LikeVideos />
          </div>
        </section>
      </main>
    </>
  );
};

export { LikeVideoPage };
