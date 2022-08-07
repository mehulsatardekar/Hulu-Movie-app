import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  useDescriptionData,
  useHistoryData,
  useWatchLaterData,
  useUserDetails,
} from "../../hook/";

import { supabase } from "../../supabaseClient";
import { Toaster } from "react-hot-toast";

import { useAuth, useToast } from "../../contexts";
import "./navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const { notifySuccess, notifyError } = useToast();
  const { userDetails, getUserDetails } = useUserDetails();

  const {
    likeVideoState: { likedVideos },
  } = useDescriptionData();

  const {
    historyState: { historyVideos },
  } = useHistoryData();
  const {
    watchLaterState: { watchLaterVideos },
  } = useWatchLaterData();

  const { currentUser } = useAuth();

  const [navbarStyle, setNavbarStyle] = useState("");

  const navbarStyleChange = () => {
    if (window.scrollY > 20) {
      setNavbarStyle("col-black solid");
    } else {
      setNavbarStyle("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navbarStyleChange);

    return () => {
      window.removeEventListener("scroll", navbarStyleChange);
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      getUserDetails();
    }
  }, [currentUser]);

  const signoutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login");
      notifySuccess("you have been  successfully logout");
    } catch (error) {
      notifyError("oops Some error occured while signing out");
      console.error(error);
    }
  };
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <nav
        className={`nav navbar-fixed flex flex-wrap flex-between  navbar-bg nav-zindex fixed-top ${navbarStyle}`}
        id="navbar"
      >
        <div className="flex flex-space-evenly flex-align-item-center ">
          <ul className=" text-deocration-none flex flex-wrap flex-align-item-center gap">
            <li className="pb-1 nav-text flex flex-align-item-center gap-1 hide">
              <span className="material-icons snackbar-icons  navbar-icons">
                menu
              </span>
            </li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "actives list-style-none"
                  : "inactives list-style-none"
              }
            >
              <li className="pb-1  flex flex-align-item-center gap-1">
                <span className="font-bold label-text ">Hulu</span>
              </li>
            </NavLink>
          </ul>
        </div>

        <div className="flex flex-space-evenly flex-align-item-center ">
          <ul className=" text-deocration-none flex flex-wrap gap-col-2">
            <NavLink
              to="/movies"
              className={({ isActive }) => (isActive ? "actives" : "inactives")}
            >
              <li className="pb-1 nav-text  flex flex-align-item-center gap-1">
                <span className="material-icons label-text">movie_filter</span>
                <span className="label-text">Movies</span>
              </li>
            </NavLink>
            <NavLink
              to="/likeplaylist"
              className={({ isActive }) => (isActive ? "actives" : "inactives")}
            >
              <li className="pb-1 nav-text  flex flex-align-item-center gap-1">
                <span className="material-icons label-text">thumb_up_alt</span>
                <span className="label-text">
                  Like Videos {likedVideos.length > 0 ? likedVideos.length : ""}
                </span>
              </li>
            </NavLink>

            <NavLink
              to="/watchlater"
              className={({ isActive }) => (isActive ? "actives" : "inactives")}
            >
              <li className="pb-1 nav-text  flex flex-align-item-center gap-1 badge">
                <span className="material-icons label-text ">watch_later</span>

                <span className=" label-text">
                  Watch Later{" "}
                  {watchLaterVideos.length > 0 ? watchLaterVideos.length : ""}
                </span>
              </li>
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) => (isActive ? "actives" : "inactives")}
            >
              <li className="pb-1 nav-text  flex flex-align-item-center gap-1 badge">
                <span className="material-icons label-text">history</span>

                <span className=" label-text">
                  History {historyVideos.length > 0 ? historyVideos.length : ""}
                </span>
              </li>
            </NavLink>
            <NavLink
              to="/playlist"
              className={({ isActive }) => (isActive ? "actives" : "inactives")}
            >
              <li className="pb-1 nav-text  flex flex-align-item-center gap-1 badge">
                <span className="material-icons label-text">queue</span>

                <span className=" label-text">PlayList</span>
              </li>
            </NavLink>
            {currentUser ? (
              <div className="nav-dropdown">
                <span className="nav-dropbtn label-text actives">Settings</span>
                <div className="nav-dropdown-content flex flex-column gap ">
                  <span className="py pt-1 nav-dropdown-option actives">
                    Welcome {userDetails[0]?.username}
                  </span>
                  <span
                    className=" nav-dropdown-option actives"
                    onClick={signoutUser}
                  >
                    Signout
                  </span>
                </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "actives" : "inactives"
                }
              >
                <li className="pb-1 nav-text  flex flex-align-item-center gap-1 badge">
                  <span className="material-icons label-text">login</span>

                  <span className=" label-text">Login</span>
                </li>
              </NavLink>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export { Navbar };
