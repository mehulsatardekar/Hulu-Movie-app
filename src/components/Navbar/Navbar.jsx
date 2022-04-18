import React, {useEffect} from "react";
import {  NavLink } from "react-router-dom";
import { useDescriptionData, useHistoryData, useWatchLaterData} from "../../hook/";

import "./navbar.css";
const Navbar = () => {
  const {
    likeVideoState: { likedVideos },
  } = useDescriptionData();

  const {historyState:{historyVideos}} = useHistoryData();
  const {watchLaterState:{watchLaterVideos}} = useWatchLaterData();

 useEffect(()=>{
const navbar= document.getElementById("navbar");

  let prevScrollpos = window.scrollY;
  window.onscroll =()=>{
    let currentScrollPos = window.scrollY;
    if (prevScrollpos > 20) {
      navbar.classList.add( 'col-black','solid');
    } else {
      navbar.classList.remove('col-black','solid');
    }
    prevScrollpos = currentScrollPos;

  }
 },[])


  return (
    <nav className="nav navbar-fixed flex flex-wrap flex-between  navbar-bg nav-zindex fixed-top" id="navbar">
      <div className="flex flex-space-evenly flex-align-item-center ">
        <ul className=" text-deocration-none flex flex-wrap flex-align-item-center gap">
          <li className="pb-1 nav-text flex flex-align-item-center gap-1 hide">
            <span className="material-icons snackbar-icons  navbar-icons">
              menu
            </span>
          </li>
          <NavLink to="/"  className={({isActive })=> isActive? 'actives list-style-none' : 'inactives list-style-none'}>
            <li className="pb-1  flex flex-align-item-center gap-1">
              <span className="font-bold label-text ">
                Hulu
              </span>
            </li>
          </NavLink>
        </ul>
      </div>

      <div className="flex flex-space-evenly flex-align-item-center ">
        <ul className=" text-deocration-none flex flex-wrap gap-col-2">
          <NavLink to="/movies" className={({isActive })=> isActive? 'actives' : 'inactives'}>
            <li className="pb-1 nav-text  flex flex-align-item-center gap-1">
              <span className="material-icons label-text">
              movie_filter
              </span>
              <span className="label-text">
                Movies
              </span>
            </li>
          </NavLink>
          <NavLink to="/likeplaylist" className={({isActive })=> isActive? 'actives' : 'inactives'}>
            <li className="pb-1 nav-text  flex flex-align-item-center gap-1">
              <span className="material-icons label-text">
                thumb_up_alt
              </span>
              <span className="label-text">
                Like Videos {likedVideos.length > 0 ? likedVideos.length : ""}
              </span>
            </li>
          </NavLink>

          <NavLink to="/watchlater" className={({isActive })=> isActive? 'actives' : 'inactives'}>
            <li className="pb-1 nav-text  flex flex-align-item-center gap-1 badge">
              <span className="material-icons label-text">
                watch_later
              </span>

              <span className=" label-text">
                Watch Later {watchLaterVideos.length>0 ? watchLaterVideos.length: ''}
              </span>
            </li>
          </NavLink>
          <NavLink to="/history" className={({isActive })=> isActive? 'actives' : 'inactives'}>
            <li className="pb-1 nav-text  flex flex-align-item-center gap-1 badge">
              <span className="material-icons label-text">
                history 
              </span>

              <span className=" label-text">History {historyVideos.length>0 ? historyVideos.length: ""}</span>
            </li>
          </NavLink>
          <NavLink to="/playlist" className={({isActive })=> isActive? 'actives' : 'inactives'}>
            <li className="pb-1 nav-text  flex flex-align-item-center gap-1 badge">
              <span className="material-icons label-text">
              queue 
              </span>

              <span className=" label-text">PlayList</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
