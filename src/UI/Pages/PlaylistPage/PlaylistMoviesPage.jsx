import React from "react";
import { MoviesList, Navbar } from "../../../components";

const PlaylistMoviesPage = () => {
  return (
    <>
      <Navbar />
      <main className="mt-3">
        <section>
          <div className="flex flex-wrap gap pb-3 video-lists-container  mt-1">
            <MoviesList />
          </div>
        </section>
      </main>
    </>
  );
};

export default PlaylistMoviesPage;
