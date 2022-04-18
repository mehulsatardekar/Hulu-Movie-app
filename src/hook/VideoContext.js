import { useContext } from "react";

import { VideoDataContext } from "../contexts";
import { VideoDescriptionContext } from "../contexts";
import { HistoryContext } from "../contexts";
import { WatchLaterContext } from "../contexts";
import { PlayListContext } from "../contexts";

const useHistoryData = () => useContext(HistoryContext);
const useSingleVideoData = () => useContext(VideoDataContext);
const useDescriptionData = () => useContext(VideoDescriptionContext);
const useWatchLaterData = () => useContext(WatchLaterContext);
const usePlayListData = () => useContext(PlayListContext);
export {
  useSingleVideoData,
  useDescriptionData,
  useHistoryData,
  useWatchLaterData,
  usePlayListData,
};
