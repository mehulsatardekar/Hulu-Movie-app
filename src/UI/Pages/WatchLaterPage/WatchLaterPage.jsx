import React from "react";
import { WatchLater } from "../../../components";
import { useWatchLaterData } from "../../../hook/";
import { Toaster } from "react-hot-toast";

const WatchLaterPage = () => {
  const {
    watchLaterState: { watchLaterVideos },
  } = useWatchLaterData();
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <main className="mt-3">
        <section className="video-lists-container flex flex-wrap gap">
          <h1>
            {watchLaterVideos.length === 0
              ? "Watch Later"
              : `You have  ${watchLaterVideos.length} videos in watch list`}
          </h1>
        </section>
        <section>
          <div className="flex flex-wrap gap pb-3 flex-justify-center">
            <WatchLater />
          </div>
        </section>
      </main>
    </>
  );
};

export { WatchLaterPage };
