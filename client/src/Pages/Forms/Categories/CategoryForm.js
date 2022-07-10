import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Navigate } from "react-router";
import {
  createNewCategory,
  getCategoryById,
  updateCategoryById,
} from "../../../Services/categoryService";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const CategoryForm = ({ user, theme, setTheme, show, setShow, variants }) => {
  const { id } = useParams();
  const title = useRef();
  const url = useRef();
  const alt = useRef();

  const [category, setCategory] = useState({});

  useEffect(() => {
    if (id) getCategoryById(id).then((res) => setCategory(res.data));
  }, []);

  const createInput = (nameFromArgs, ref, label, value, type = "text") => {
    return (
      <div className="p-3">
        <label> {label}:</label>
        <input
          type={type}
          name={nameFromArgs}
          ref={ref}
          defaultValue={value}
          className="form-control"
          required
        />
      </div>
    );
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const category = {
        title: title.current.value,
      };
      category["img"] = {
        url: url.current.value,
        alt: alt.current.value,
      };
      if (id) await updateCategoryById(id, category);
      else await createNewCategory(category);
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };

  const isAdmin = user?.isAdmin;
  const biz = user?.biz

  return (
    <>
      {!user && <Navigate to="/" />}
      {!isAdmin  && <Navigate to="/" />}
      
      <div className={theme ? "theme-dark mt-5" : "mt-5"}>
        <div>
          <h5 className="text-center fs-1">Category Form</h5>

          <form
            className={theme ? "card mt-4" : "card mt-4"}
            onSubmit={(e) => handleSubmit(e)}
          >
            {createInput("title", title, "Name", category.title)}
            {createInput("url", url, "Image", category["img"]?.url)}
            {createInput("alt", alt, "Alt", category["img"]?.alt)}
            <button className="btn btn-primary">Send</button>
          </form>
        </div>
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
    </>
  );
};

export default CategoryForm;
