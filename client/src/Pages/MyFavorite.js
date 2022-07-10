import React, { useState } from "react";

import ItemB from "../Main/ItemB";
import { motion } from "framer-motion";
import { Navigate } from "react-router";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faXmark,
  faArrowRight,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";


const MyFavorite = ({
  variants,
  show,
  setShow,
  theme,
  setTheme,
  user,
  addToCart,
  timerDays,
  timerHours,
  timerMinutes,
  timerSeconds,
  addToFavorite,
  removeToFavorite,
  like,
  
}) => {
  const [normalArr, setNormalArr] = useState(true);
  const [bigNameArr, setBigNameArr] = useState(false);
  const [highPriceArr, setHighPriceArr] = useState(false);
  const [lowPriceArr, setLowPriceArr] = useState(false);
  const [highRatingArr, setHighRatingArr] = useState(false);
  const [lowRatingArr, setLowRatingArr] = useState(false);

  const [noOfElement, setNoOfElement] = useState(4);

  const loadMore = () => {
    if (like.length > noOfElement) {
      setNoOfElement(noOfElement + 4);
    }
  };

  const loadLess = () => {
    if (noOfElement > 5) {
      setNoOfElement(noOfElement - 4);
    }
  };

  const slice = like
    .sort((a, b) => (a.title > b.title ? 1 : -1))
    .slice(0, noOfElement);

  like
    .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1))
    .slice(0, noOfElement);

  const [filter, setFilter] = useState("");

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  const dataSearch = like.filter((item) => {
    return (item.title.toLowerCase() + item.price).includes(
      filter.toLowerCase() || Number(filter)
    );
  });

  return (
    <>
      {!user && <Navigate to="/" />}

      <div className={theme ? "theme-dark" : ""}>
        <div className="content-bg-color main-content mt-5">
          <h1 className="text-center">My Favorite</h1>
          <div>
            {like.length === 0 ? (
              <h2 className="ms-4 mt-5 text-center">
                Your Wish List It's Empty...
              </h2>
            ) : null}
            <section className="py-1 container">
              {like.length > 0 ? (
                <div>
                  <h3 className="from-label h5 ms-1  search-location">
                    {" "}
                    Search: &nbsp;
                  </h3>
                  <input
                    type="text"
                    className="from-control ms-1 search-location"
                    value={filter}
                    onChange={(e) => {
                      searchText(e);
                      setHighPriceArr(false);
                      setLowPriceArr(false);
                      setHighRatingArr(false);
                      setLowRatingArr(false);
                      setNormalArr(false);
                      setBigNameArr(false);
                    }}
                  />
                </div>
              ) : null}
              <div className="row justify-content-center mt-4">
                {/* Page A => Z */}
                {dataSearch.length === 0 &&
                highPriceArr === false &&
                lowPriceArr === false &&
                lowRatingArr === false &&
                highRatingArr === false &&
                bigNameArr === false
                  ? slice.map((item, index) => {
                      return (
                        <ItemB
                          key={index}
                          item={item}
                          addToCart={addToCart}
                          user={user}
                          timerDays={timerDays}
                          timerHours={timerHours}
                          timerMinutes={timerMinutes}
                          timerSeconds={timerSeconds}
                          removeToFavorite={removeToFavorite}
                          addToFavorite={addToFavorite}
                          like={like}
                        />
                      );
                    })
                  : null}
              </div>
              {/* Search */}
              <div className="row justify-content-center">
                {dataSearch.slice(0, noOfElement).map((item, index) => {
                  return (
                    <ItemB
                      key={index}
                      item={item}
                      addToCart={addToCart}
                      user={user}
                      timerDays={timerDays}
                      timerHours={timerHours}
                      timerMinutes={timerMinutes}
                      timerSeconds={timerSeconds}
                      removeToFavorite={removeToFavorite}
                      addToFavorite={addToFavorite}
                      like={like}
                    />
                  );
                })}
              </div>
              {/* Page Z => A */}
              <div className="row justify-content-center">
                {bigNameArr && like.length > 0
                  ? like
                      .sort((a, b) => (a.title < b.title ? 1 : -1))
                      .slice(0, noOfElement)
                      .map((item, index) => {
                        return (
                          <ItemB
                            key={index}
                            item={item}
                            addToCart={addToCart}
                            user={user}
                            timerDays={timerDays}
                            timerHours={timerHours}
                            timerMinutes={timerMinutes}
                            timerSeconds={timerSeconds}
                            removeToFavorite={removeToFavorite}
                            addToFavorite={addToFavorite}
                            like={like}
                          />
                        );
                      })
                  : null}
              </div>
              {/* Filter High Price */}
              <div className="row justify-content-center">
                {highPriceArr && like.length > 0
                  ? like
                      .sort((a, b) =>
                        (a.discount || a.price) < (b.discount || b.price)
                          ? 1
                          : -1
                      )
                      .slice(0, noOfElement)
                      .map((item, index) => {
                        return (
                          <ItemB
                            key={index}
                            item={item}
                            addToCart={addToCart}
                            user={user}
                            timerDays={timerDays}
                            timerHours={timerHours}
                            timerMinutes={timerMinutes}
                            timerSeconds={timerSeconds}
                            removeToFavorite={removeToFavorite}
                            addToFavorite={addToFavorite}
                            like={like}
                          />
                        );
                      })
                  : null}
              </div>
              {/* Filter Low Price */}
              <div className="row justify-content-center">
                {lowPriceArr === true && like.length > 0
                  ? like
                      .sort((a, b) =>
                        (a.discount || a.price) > (b.discount || b.price)
                          ? 1
                          : -1
                      )
                      .slice(0, noOfElement)
                      .map((item, index) => {
                        return (
                          <ItemB
                            key={index}
                            item={item}
                            addToCart={addToCart}
                            user={user}
                            timerDays={timerDays}
                            timerHours={timerHours}
                            timerMinutes={timerMinutes}
                            timerSeconds={timerSeconds}
                            removeToFavorite={removeToFavorite}
                            addToFavorite={addToFavorite}
                            like={like}
                          />
                        );
                      })
                  : null}
              </div>
              {/* Page high Rating */}
              <div className="row justify-content-center">
                {highRatingArr === true && like.length > 0
                  ? like
                      .sort((a, b) => (a.rating < b.rating ? 1 : -1))
                      .slice(0, noOfElement)
                      .map((item, index) => {
                        return (
                          <ItemB
                            key={index}
                            item={item}
                            addToCart={addToCart}
                            user={user}
                            timerDays={timerDays}
                            timerHours={timerHours}
                            timerMinutes={timerMinutes}
                            timerSeconds={timerSeconds}
                            removeToFavorite={removeToFavorite}
                            addToFavorite={addToFavorite}
                            like={like}
                          />
                        );
                      })
                  : null}
              </div>
              {/* Page low Rating */}
              <div className="row justify-content-center">
                {lowRatingArr === true && like.length > 0
                  ? like
                      .sort((a, b) => (a.rating > b.rating ? 1 : -1))
                      .slice(0, noOfElement)
                      .map((item, index) => {
                        return (
                          <ItemB
                            key={index}
                            item={item}
                            addToCart={addToCart}
                            user={user}
                            timerDays={timerDays}
                            timerHours={timerHours}
                            timerMinutes={timerMinutes}
                            timerSeconds={timerSeconds}
                            removeToFavorite={removeToFavorite}
                            addToFavorite={addToFavorite}
                            like={like}
                          />
                        );
                      })
                  : null}
              </div>
              <div>
                {/* Slice */}

                <button
                  disabled={
                    noOfElement >= like.length
                  }
                  className={
                    theme
                      ? "btn btn-light d-block py-2 col-12 container mb-1"
                      : "btn btn-primary d-block py-2 col-12 container mb-1"
                  }
                  onClick={() => loadMore()}
                >
                  Load More &nbsp;
                  <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                </button>

                {/* Slice */}
                <button
                  className={
                    theme
                      ? "btn btn-light d-block py-2 col-12 container mb-1"
                      : "btn btn-primary d-block py-2 col-12 container mb-1"
                  }
                  onClick={() => loadLess()}
                  disabled={noOfElement <= 4}
                >
                  Load Less &nbsp;
                  <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                </button>
              </div>
            </section>
            <motion.nav
              animate={show ? "open" : "closed"}
              variants={variants}
              transition={{ duration: 0.5 }}
            >
              <motion.div>
                <hr className="hr-nav"></hr>
                {/* Dark */}
                {theme ? (
                  <h5 className="theme-title fs-4"> Switch Light</h5>
                ) : (
                  <h5 className="theme-title fs-4"> Switch Dark</h5>
                )}
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={() => {
                      setTheme(!theme);
                      setShow(false);
                    }}
                  />
                  <span className="slider round"></span>
                </label>
                {/* sort */}
                <div>
                  <button
                    className={
                      theme
                        ? " btn btn-dark btn-one"
                        : "btn btn-primary btn-one"
                    }
                    disabled={normalArr || filter}
                    onClick={() => {
                      setHighPriceArr(false);
                      setLowPriceArr(false);
                      setHighRatingArr(false);
                      setLowRatingArr(false);
                      setNormalArr(true);
                      setBigNameArr(false);
                      setShow(false);
                    }}
                  >
                    A &nbsp;
                    <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
                    &nbsp; Z
                  </button>

                  <button
                    className={
                      theme
                        ? " btn btn-dark btn-two"
                        : "btn btn-primary btn-two"
                    }
                    disabled={bigNameArr || filter}
                    onClick={() => {
                      setHighPriceArr(false);
                      setLowPriceArr(false);
                      setHighRatingArr(false);
                      setLowRatingArr(false);
                      setNormalArr(false);
                      setBigNameArr(true);
                      setShow(false);
                    }}
                  >
                    Z &nbsp;
                    <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
                    &nbsp; A
                  </button>

                  <button
                    className={
                      theme
                        ? " btn btn-dark btn-three"
                        : "btn btn-primary btn-three"
                    }
                    disabled={highPriceArr || filter}
                    onClick={() => {
                      setHighPriceArr(true);
                      setLowPriceArr(false);
                      setHighRatingArr(false);
                      setLowRatingArr(false);
                      setNormalArr(false);
                      setBigNameArr(false);
                      setShow(false);
                    }}
                  >
                    Price High To Low &nbsp;
                    <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                  </button>

                  <button
                    className={
                      theme
                        ? " btn btn-dark btn-four"
                        : "btn btn-primary btn-four"
                    }
                    disabled={lowPriceArr || filter}
                    onClick={() => {
                      setHighPriceArr(false);
                      setLowPriceArr(true);
                      setHighRatingArr(false);
                      setLowRatingArr(false);
                      setNormalArr(false);
                      setBigNameArr(false);
                      setShow(false);
                    }}
                  >
                    Price Low To High &nbsp;
                    <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                  </button>
                  <button
                    className={
                      theme
                        ? " btn btn-dark btn-five"
                        : "btn btn-primary btn-five"
                    }
                    disabled={highRatingArr || filter}
                    onClick={() => {
                      setHighPriceArr(false);
                      setLowPriceArr(false);
                      setHighRatingArr(true);
                      setLowRatingArr(false);
                      setNormalArr(false);
                      setBigNameArr(false);
                      setShow(false);
                    }}
                  >
                    Rating High To Low &nbsp;
                    <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                  </button>
                  <button
                    className={
                      theme
                        ? " btn btn-dark btn-six"
                        : "btn btn-primary btn-six"
                    }
                    disabled={lowRatingArr || filter}
                    onClick={() => {
                      setHighPriceArr(false);
                      setLowPriceArr(false);
                      setHighRatingArr(false);
                      setLowRatingArr(true);
                      setNormalArr(false);
                      setBigNameArr(false);
                      setShow(false);
                    }}
                  >
                    Rating Low To High &nbsp;
                    <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                  </button>
                </div>
              </motion.div>
            </motion.nav>
            <motion.button
              className="toggle"
              onClick={() => setShow((show) => !show)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
            >
              {show ? (
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyFavorite;
