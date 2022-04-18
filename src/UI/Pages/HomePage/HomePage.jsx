import React from "react";
import HomeContainer from "../../../components/Home-container/HomeContainer";
import MustWatch from "../../../components/Must-watch/MustWatch";
import { Navbar } from "../../../components";
import { Link } from "react-router-dom";
import "./homepage.css";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <main>
        <HomeContainer />

        <div className="container pt-1">
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
      </main>
    </>
  );
};

export default HomePage;
