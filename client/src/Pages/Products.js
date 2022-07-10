import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Item from "../Main/Item"
import { motion } from "framer-motion";

import {
  getProductsByCategory,
} from "../Services/productService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faXmark,
  faArrowRight,
  faArrowRightLong,
  
} from "@fortawesome/free-solid-svg-icons";

const Products = ({
  variants,
  show,
  setShow,
  theme,
  setTheme,
  user,
  addToCart,
  productsArr,
  setProductsArr,
  timerDays,
  timerHours,
  timerMinutes,
  timerSeconds,
  addToFavorite,
  removeToFavorite,
}) => {
  useEffect(() => {
    const getCurrentCategory = () => {
      const url = window.location.href;
      const urlWordsArr = url.split("/");

      return urlWordsArr[urlWordsArr.length - 1];
    };

    getProductsByCategory(getCurrentCategory()).then((res) =>
      setProductsArr(res.data)
    );
  }, []);

  const [normalArr, setNormalArr] = useState(true);
  const [bigNameArr, setBigNameArr] = useState(false);
  const [highPriceArr, setHighPriceArr] = useState(false);
  const [lowPriceArr, setLowPriceArr] = useState(false);
  const [highRatingArr, setHighRatingArr] = useState(false);
  const [lowRatingArr, setLowRatingArr] = useState(false);

  const [noOfElement, setNoOfElement] = useState(4);

  const loadMore = () => {
    if (productsArr.length > noOfElement) {
      setNoOfElement(noOfElement + 4);
    }
  };

  const loadLess = () => {
    if (noOfElement > 5) {
      setNoOfElement(noOfElement - 4);
    }
  };

  const slice = productsArr
    .sort((a, b) => (a.title > b.title ? 1 : -1))
    .slice(0, noOfElement);

  productsArr
    .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1))
    .slice(0, noOfElement);

  const [filter, setFilter] = useState("");

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  const dataSearch = productsArr.filter((item) => {
    return (
      item.title.toLowerCase() +
      // item.desc.toLowerCase() +
      item.price
    ).includes(filter.toLowerCase() || Number(filter));
  });

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart" + user?.id) || "[]")
  );

  return (
    <div className={theme ? "theme-dark" : ""}>
      <div className="content-bg-color main-content mt-5">
        <h1 className="text-center">Products</h1>

        {/* {user ? (
          <div className="col-12 mb-2">
            <Link to={`/create_product`}>
              <button className="btn btn-primary fs-5 btn-create">
                Create Product
              </button>
            </Link>
          </div>
        ) : null} */}
        <section className="py-1 container">
          <h3 className="from-label h5 search-location"> Search: &nbsp;</h3>
          <input
            type="text"
            className="from-control search-location"
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
                    <Item
                      key={index}
                      item={item}
                      addToCart={addToCart}
                      user={user}
                      timerDays={timerDays}
                      timerHours={timerHours}
                      timerMinutes={timerMinutes}
                      timerSeconds={timerSeconds}
                      addToFavorite={addToFavorite}
                      removeToFavorite={removeToFavorite}
                      
                    />
                  );
                })
              : null}
          </div>
          {/* Search */}
          <div className="row justify-content-center">
            {dataSearch.slice(0, noOfElement).map((item, index) => {
              return (
                <Item
                  key={index}
                  item={item}
                  addToCart={addToCart}
                  user={user}
                  timerDays={timerDays}
                  timerHours={timerHours}
                  timerMinutes={timerMinutes}
                  timerSeconds={timerSeconds}
                  addToFavorite={addToFavorite}
                  removeToFavorite={removeToFavorite}
                />
              );
            })}
          </div>
          {/* Page Z => A */}
          <div className="row justify-content-center">
            {bigNameArr && productsArr.length > 0
              ? productsArr
                  .sort((a, b) => (a.title < b.title ? 1 : -1))
                  .slice(0, noOfElement)
                  .map((item, index) => {
                    return (
                      <Item
                        key={index}
                        item={item}
                        addToCart={addToCart}
                        user={user}
                        timerDays={timerDays}
                        timerHours={timerHours}
                        timerMinutes={timerMinutes}
                        timerSeconds={timerSeconds}
                        addToFavorite={addToFavorite}
                        removeToFavorite={removeToFavorite}
                      />
                    );
                  })
              : null}
          </div>
          {/* Filter High Price */}
          <div className="row justify-content-center">
            {highPriceArr && productsArr.length > 0
              ? productsArr
                  .sort((a, b) =>
                    (a.discount || a.price) < (b.discount || b.price) ? 1 : -1
                  )
                  .slice(0, noOfElement)
                  .map((item, index) => {
                    return (
                      <Item
                        key={index}
                        item={item}
                        addToCart={addToCart}
                        user={user}
                        timerDays={timerDays}
                        timerHours={timerHours}
                        timerMinutes={timerMinutes}
                        timerSeconds={timerSeconds}
                        addToFavorite={addToFavorite}
                        removeToFavorite={removeToFavorite}
                      />
                    );
                  })
              : null}
          </div>
          {/* Filter Low Price */}
          <div className="row justify-content-center">
            {lowPriceArr === true && productsArr.length > 0
              ? productsArr
                  .sort((a, b) =>
                    (a.discount || a.price) > (b.discount || b.price) ? 1 : -1
                  )
                  .slice(0, noOfElement)
                  .map((item, index) => {
                    return (
                      <Item
                        key={index}
                        item={item}
                        addToCart={addToCart}
                        user={user}
                        timerDays={timerDays}
                        timerHours={timerHours}
                        timerMinutes={timerMinutes}
                        timerSeconds={timerSeconds}
                        addToFavorite={addToFavorite}
                        removeToFavorite={removeToFavorite}
                      />
                    );
                  })
              : null}
          </div>
          {/* Page high Rating */}
          <div className="row justify-content-center">
            {highRatingArr === true && productsArr.length > 0
              ? productsArr
                  .sort((a, b) => (a.rating < b.rating ? 1 : -1))
                  .slice(0, noOfElement)
                  .map((item, index) => {
                    return (
                      <Item
                        key={index}
                        item={item}
                        addToCart={addToCart}
                        user={user}
                        timerDays={timerDays}
                        timerHours={timerHours}
                        timerMinutes={timerMinutes}
                        timerSeconds={timerSeconds}
                        addToFavorite={addToFavorite}
                        removeToFavorite={removeToFavorite}
                      />
                    );
                  })
              : null}
          </div>
          {/* Page low Rating */}
          <div className="row justify-content-center">
            {lowRatingArr === true && productsArr.length > 0
              ? productsArr
                  .sort((a, b) => (a.rating > b.rating ? 1 : -1))
                  .slice(0, noOfElement)
                  .map((item, index) => {
                    return (
                      <Item
                        key={index}
                        item={item}
                        addToCart={addToCart}
                        user={user}
                        timerDays={timerDays}
                        timerHours={timerHours}
                        timerMinutes={timerMinutes}
                        timerSeconds={timerSeconds}
                        addToFavorite={addToFavorite}
                        removeToFavorite={removeToFavorite}
                      />
                    );
                  })
              : null}

            {/* Slice */}

            <button
              disabled={
                // (noOfElement >= allProductsArr.length ||
                //   productsArr.length >= 1) &&
                noOfElement >= productsArr.length
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
                  theme ? " btn btn-dark btn-one" : "btn btn-primary btn-one"
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
                  theme ? " btn btn-dark btn-two" : "btn btn-primary btn-two"
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
                  theme ? " btn btn-dark btn-four" : "btn btn-primary btn-four"
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
                  theme ? " btn btn-dark btn-five" : "btn btn-primary btn-five"
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
                  theme ? " btn btn-dark btn-six" : "btn btn-primary btn-six"
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
  );
};
 
export default Products;