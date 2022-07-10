import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faXmark,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { getAllCategory } from "../Services/categoryService";

import CategoryCard from "../Main/CategoryCard";


const Home = ({ variants, show, setShow, theme, setTheme, user }) => {


  const [categoryArr, setCategoryArr] = useState([]);

  useEffect(() => {
    getAllCategory().then((res) => setCategoryArr(res.data));
  }, []);


  const [filter, setFilter] = useState("");
  const searchText = (event) => {
    setFilter(event.target.value);
  };

  const dataSearch = categoryArr.filter((item) => {
    return (
      item.title
        .toLowerCase()
        .includes(filter.toLowerCase() || Number(filter))
    );
  });

  const [noOfElement, setNoOfElement] = useState(4);

  const loadMore = () => {
    if (categoryArr.length > noOfElement) {
      setNoOfElement(noOfElement + 4);
    }
  };

  const loadLess = () => {
    if (noOfElement > 5) {
      setNoOfElement(noOfElement - 4);
    }
  };

   categoryArr
     .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1))
     .slice(0, noOfElement);
  

  return (
    <div className={theme ? "theme-dark" : ""}>
      <div className="content-bg-color main-content mt-5">
        <h1 className="text-center">Rb Bar Market</h1>
        {user?.isAdmin ? (
          <div className="col-12 mb-2">
            <Link to={`/create_category`}>
              <button className="btn btn-primary fs-5 btn-create">
                Create Category
              </button>
            </Link>
          </div>
        ) : null}

        <section className="py-1 container">
          <h3 className="from-label h5 search-location ms-1">
            {" "}
            Search: &nbsp;
          </h3>
          <input
            type="text"
            className="from-control search-location ms-1 mb-2"
            value={filter}
            onChange={(e) => {
              searchText(e);
            }}
          />
          <div className="row justify-content-center my-2">
            {dataSearch.length === 0 &&
              categoryArr.slice(0, noOfElement).map((item, index) => {
                return <CategoryCard key={index} item={item} user={user} />;
              })}
          </div>

          <div className="row justify-content-center my-2">
            {dataSearch.slice(0, noOfElement).map((item, index) => {
              return <CategoryCard key={index} item={item} user={user} />;
            })}
          </div>

          <button
            disabled={noOfElement >= categoryArr.length}
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
          <button
            className={
              theme
                ? "btn btn-light d-block py-2 col-12 container mb-1"
                : "btn btn-primary d-block py-2 col-12 container mb-1"
            }
            disabled={noOfElement <= 4}
            onClick={() => loadLess()}
          >
            Load Less &nbsp;
            <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
          </button>
        </section>
      </div>

      <div>
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

export default Home;
