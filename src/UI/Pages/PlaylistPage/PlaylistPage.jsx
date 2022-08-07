import React from "react";
import { List } from "../../../components";
import { usePlayListData } from "../../../hook/";
import { Link } from "react-router-dom";
import "./playlistpage.css";
import { Toaster } from "react-hot-toast";

const PlaylistPage = () => {
  const { playlistState } = usePlayListData();

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <main className="mt-3">
        <section className="video-lists-container flex flex-wrap gap">
          <h1>
            {playlistState.length === 0
              ? `PlayList`
              : `You have ${playlistState.length} Playlist`}{" "}
          </h1>
        </section>
        <section>
          <div className="flex flex-wrap gap pb-2 video-lists-container  mt-1 video-lists">
            {playlistState.length !== 0 &&
              playlistState.map((playlist, index) => {
                return (
                  <List
                    title={playlist.title}
                    videos={playlist.videos}
                    id={index}
                  />
                );
              })}
          </div>
        </section>

        {playlistState.length === 0 && (
          <>
            <div className="img-center mb-3">
              <img
                src="https://res.cloudinary.com/dwhsfh3sc/image/upload/v1650210301/zeplin-movies/movie-assets-imgs/playlist-removebg-preview_u1g9iu.png"
                alt="No-likes-video-found"
                className="playlist-img"
              />
              <h1>oops.. No Playlist found</h1>
              <Link to="/" className="btn-primary btn btn-sm mt-1 ">
                Home
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export { PlaylistPage };
