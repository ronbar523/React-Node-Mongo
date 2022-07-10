import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Navigate } from "react-router";
import {
  getProductById,
  makeDealById,
} from "../../../Services/productService";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 
  faArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";


const MakeDeal = ({ user, theme, setTheme, show, setShow, variants }) => {
  const { id } = useParams();

  const price = useRef();
  const lessDiscount = useRef();
  const discount = useRef();

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const product = {
        price: price.current.value,
        discount: discount.current.value,
        lessDiscount: lessDiscount.current.value,
      };
      if (id) await makeDealById(id, product);
      window.location = "/my_item";
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <div className={theme ? "theme-dark mt-5" : "mt-5"}>
        {!user && <Navigate to="/" />}
        <h5 className="text-center fs-1">Product Form</h5>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={theme ? "card mt-4" : "card mt-4"}
        >
          {createInput("price", price, "Price", product.price, "number")}
          {createInput(
            "lessDiscount",
            lessDiscount,
            "How much would you like to pull down?",
            product.lessDiscount,
            "number"
          )}
          {createInput(
            "discount",
            discount,
            "Price After Discount?",
            product.discount,
            "number"
          )}

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
 
export default MakeDeal;