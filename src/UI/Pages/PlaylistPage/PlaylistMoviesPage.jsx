import React from "react";
import { MoviesList } from "../../../components";
import { Toaster } from "react-hot-toast";

const PlaylistMoviesPage = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

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

export { PlaylistMoviesPage };
