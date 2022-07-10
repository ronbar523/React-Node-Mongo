import React from "react";

import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const Navbar = ({ theme, user}) => {

  return (
    <div
      className=" navbar navbar-expand-md navbar-dark"
      aria-label="Fourth navbar example"
    >
      <div
        className={
          theme
            ? "container-fluid ms-4 text-sm-center text-md-center bg-myColor-dark  z-position"
            : "container-fluid ms-4 text-sm-center text-md-center bg-myColor z-position"
        }
      >
        <Logo theme={theme} />
        <button
          className="navbar-toggler collapsed mt-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-collapse collapse" id="navbarsExample04">
          <ul className="navbar-nav me-auto ms-lg-5 ms-xl-5  mb-2 mb-md-0 fs-5 myNavbar">
            <li className="li-nav">
              <NavLink
                className={theme ? "line-dark" : "line"}
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            {user ? (
              <li className="li-nav">
                <NavLink
                  className={theme ? "line-dark" : "line"}
                  aria-current="page"
                  to="/my_cart"
                >
                  My Cart
                </NavLink>
              </li>
            ) : null}
            {user ? (
             <li className="li-nav">
              <NavLink className={theme ? "line-dark" : "line"}
                  aria-current="page"
                  to="my_favorite"
                  >
                    My Favorite
                  </NavLink>
             </li>
            ) : null}
            {user ? (
              <li className="li-nav">
                <NavLink
                  className={theme ? "line-dark" : "line"}
                  aria-current="page"
                  to="/my_item"
                >
                  My Item
                </NavLink>
              </li>
            ) : null}
           
          </ul>

          <ul className="navbar-nav me-lg-5 me-xl-5 mb-2 mb-md-0 fs-5">
            {!user ? (
              <li className="li-nav">
                <NavLink
                  className={theme ? "line-dark" : "line"}
                  aria-current="page"
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
            ) : null}

            {!user ? (
              <li className="li-nav  li-user">
                <NavLink
                  className={theme ? "line-dark" : "line"}
                  aria-current="page"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            ) : null}

            {user ? (
              <li className="li-nav li-user">
                <NavLink
                  className={theme ? "line-dark" : "line"}
                  aria-current="page"
                  to="/logout"
                >
                  Logout
                </NavLink>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
