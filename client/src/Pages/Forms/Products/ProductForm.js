import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Navigate } from "react-router";
import {
  createNewProduct,
  getProductById,
  updateProductById,
} from "../../../Services/productService";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faXmark } from "@fortawesome/free-solid-svg-icons";

const ProductForm = ({ user, theme, setTheme, show, setShow, variants }) => {
  const { id } = useParams();
  const title = useRef();
  const url = useRef();
  const alt = useRef();
  const price = useRef();
  const desc = useRef();
  const pcs = useRef();
  const category = useRef();
  // const rating = useRef();

  const [product, setProduct] = useState({});

  useEffect(() => {
    if (id) getProductById(id).then((res) => setProduct(res.data));
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

  const createSelect = (nameFromArgs, ref, label, value) => {
    return (
      <div className="p-2 px-3 pb-4">
        <label className="px-2 pb-2 d-block"> {label}:</label>
        <select
          className="rounded-pill p-1 mt-1 px-2 option-select"
          nameFromArgs={nameFromArgs}
          ref={ref}
          defaultValue={value}
          required
        >
          <option value={""}>--Please choose an option--</option>
          <option>Bread</option>
          <option>Grain</option>
          <option>Fruits</option>
          <option>Vegetables </option>
        </select>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const product = {
        title: title.current.value,
        price: price.current.value,
        desc: desc.current.value,
        pcs: pcs.current.value,
        category: category.current.value,
        // rating: rating.current.value,
      };
      product["img"] = {
        url: url.current.value,
        alt: alt.current.value,
      };
      
      if (id) await updateProductById(id, product);
      
      else await createNewProduct(product);
      window.location = "/my_item";
    } catch (err) {
      console.log(err);
    }
  };

  // const isAdmin = user?.isAdmin;

  return (
    <>
      {!user && <Navigate to="/" />}
      {/* {!isAdmin && <Navigate to="/" />} */}
      <div className={theme ? "theme-dark mt-5" : "mt-5"}>
        <h5 className="text-center fs-1">Product Form</h5>

        <form
          className={theme ? "card mt-4" : "card mt-4"}
          onSubmit={(e) => handleSubmit(e)}
        >
          {createInput("title", title, "Name", product.title)}
          {createInput("url", url, "Image", product["img"]?.url)}
          {createInput("alt", alt, "Alt", product["img"]?.alt)}
          {createInput("price", price, "Price", product.price, "number")}
          {createInput("desc", desc, "Description", product.desc)}
          {createInput("pcs", pcs, "Pcs", product.pcs, "number")}
          {/* {createInput("rating", rating, "Rating", product.rating, "number")} */}
          {createSelect("category", category, "Category", product.category)}

          <button className="btn btn-primary">Send</button>
        </form>
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

export default ProductForm;
