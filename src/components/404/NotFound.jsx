import React from "react";
import "./notfound.css";
const NotFound = () => {
  return (
    <>
      <section className="flex flex-column flex-justify-center flex-align-item-center">
        <img
          className="page-404"
          src="https://images.weserv.nl/?url=https://res.cloudinary.com/dwhsfh3sc/image/upload/v1659861109/zeplin-movies/movie-assets-imgs/page404_gsf4ar-removebg-preview_ehg4mx.png"
          alt="Not-found-404"
        />
        <h2>Oops.. page not found</h2>
      </section>
    </>
  );
};

export { NotFound };
