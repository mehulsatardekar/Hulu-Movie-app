import React from "react";
import { HistoryVideos } from "../../../components";
import { useHistoryData } from "../../../hook";
import { deleteAllHistoryVideo } from "../../../utils/";
import { Toaster } from "react-hot-toast";
const HistoryPage = () => {
  const {
    historyState: { historyVideos },
    historyDispatch,
  } = useHistoryData();

  const clearHistory = async () => {
    const data = await deleteAllHistoryVideo();
    if (data.status === 200) {
      historyDispatch({ type: "DELETE_ALL_HISTORY" });
    }
  };
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <main className="mt-3">
        <section className="video-lists-container flex flex-wrap flex-between gap ">
          <h1>
            {historyVideos.length === 0
              ? "Watch history"
              : `You have watched ${historyVideos.length} videos`}
          </h1>
          <button className="btn-primary btn btn-sm " onClick={clearHistory}>
            Clear History
          </button>
        </section>
        <section>
          <div className="flex flex-wrap gap pb-3 flex-justify-center">
            <HistoryVideos />
          </div>
        </section>
      </main>
    </>
  );
};

export { HistoryPage };
