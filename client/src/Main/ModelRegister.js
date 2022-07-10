import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useState } from "react";

import { crateNewUser, loginUser } from "../Services/userService";

const ModelRegister = ({ setModelReg }) => {
  const [modelLogin, setModelLogin] = useState(false);

  const email = useRef();
  const password = useRef();
  const userName = useRef();

  const createInput = (nameFromArgs, ref, label, type = "text") => {
    return (
      <div className="p-3">
        <label className="mb-1">{label}:</label>
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
      setModelReg(false);

    } catch (err) {
      console.log(err);
    }
};

const handleSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      const user = {
        email: email.current.value,
        password: password.current.value,
      };
      await loginUser(user);
      toast.success(`${user.userName} you login successfully`);
      setModelReg(false);

    } catch (err) {
      console.log(err);
    }
  };


const modalStyle = {
    display: "block",
};

return (
  <>
    <div
      className="modal show fade model-info"
      style={modalStyle}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {modelLogin ? (
              <h2 className="modal-title">
                <b> Login </b>
              </h2>
            ) : (
              <h2 className="modal-title">
                <b> Register </b>
              </h2>
            )}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setModelReg(false)}
            ></button>
          </div>

          {modelLogin ? (
            <form className="card my-4" onSubmit={(e) => handleSubmitLogin(e)}>
              {createInput("email", email, "Email")}
              {createInput("password", password, "Password", "password")}
              <div className="modal-footer mt-2">
                <button className="btn btn-primary">Login</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setModelLogin(false);
                    setModelReg(false);
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          ) : (
            <form className="card my-4" onSubmit={(e) => handleSubmit(e)}>
              {createInput("email", email, "Email")}
              {createInput("password", password, "Password", "password")}
              {createInput("userName", userName, "User Name")}

              <div className="modal-footer mt-2">
                <button className="btn btn-primary">Let's Go</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setModelLogin(true);
                    
                  }}
                >
                  Already Sign-In?
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  </>
);
};

export default ModelRegister;
