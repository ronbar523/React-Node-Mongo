import React, { useRef } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { crateNewUser, loginUser } from "../../../Services/userService"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { Navigate } from "react-router";

// /^[a-zA-Z0-9]{3,30}$/

const Register = ({ theme, setTheme, show, variants, setShow, user }) => {

  

  const email = useRef();
  const password = useRef();
  const userName = useRef();

  const createInput = (nameFromArgs, ref, label, type = "text") => {
    return (
      <div className="p-3">
        <label>{label}:</label>
        <input
          type={type}
          name={nameFromArgs}
          ref={ref}
          className="form-control"
          required
        />
      </div>
    );
  };

  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = {
        email: email.current.value,
        password: password.current.value,
        userName: userName.current.value,
        
      };
      await crateNewUser(user);
      toast.success(`${user.userName} you register successfully`);
      delete user.userName;

      await loginUser(user);

      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {user && <Navigate to="/" />}

      <div className={theme ? "theme-dark mt-5" : "mt-5"}>
        <h5 className="text-center fs-1"> Register </h5>

        <div>
          <form
            className={theme ? "card mt-4" : "card mt-4"}
            onSubmit={(e) => handleSubmit(e)}
          >
            {createInput("email", email, "Email")}
            {createInput("password", password, "Password", "password")}
            {createInput("userName", userName, "User Name")}
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
 
export default Register;