import React from "react";
import { HomeContainer, MustWatch } from "../../../components";
import { Link } from "react-router-dom";
import "./homepage.css";
import { Toaster } from "react-hot-toast";

const HomePage = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <main>
        <HomeContainer />

        <section className="mt-3">
          <div className="container pt-3">
            <div className="flex flex-between">
              <div>
                <span className="font-bold label-text label-text-dark">
                  Mustwatch
                </span>
              </div>
              <div>
                <Link to="/movies">
                  <span className="label-text ">See More</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap pb-3 flex-justify-center mt-2">
            <MustWatch />
          </div>
        </section>
      </main>
    </>
  );
};

export { HomePage };
