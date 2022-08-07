import React from "react";
import "./notfound.css";
const NotFound = () => {
  return (
    <>
      <section className="flex flex-column flex-justify-center flex-align-item-center">
        <img
          className="page-404"
          src="https://res.cloudinary.com/dwhsfh3sc/image/upload/v1649259193/Offers-imgs/page404_gsf4ar.png"
          alt="Not-found-404"
        />
        <h2>Oops.. page not found</h2>
      </section>
    </>
  );
};

export { NotFound };
