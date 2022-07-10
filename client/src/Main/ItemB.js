import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCartArrowDown,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import ModelDelete from "./ModelDelete";
import ModelInfo from "./ModelInfo";

import Timer from "./Timer";
import ModelRegister from "./ModelRegister";

const ItemB = ({
  item,
  user,
  addToCart,
  timerDays,
  timerHours,
  timerMinutes,
  timerSeconds,
  
  removeToFavorite,
}) => {
  const [modelArr, setModelArr] = useState(false);

  const [modelDelete, setModelDelete] = useState(false);

  const [modelReg, setModelReg] = useState(false);

  return (
    <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
      <div className="card p-0 overflow-hidden h-100 shadow">
        <div className="card-body">
          {user && user.isAdmin ? (
            <div className="card-body">
              <button
                className="btn btn-outline-danger mb-1"
                onClick={() => setModelDelete(true)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/dovoajyj.json"
                  trigger="hover"
                ></lord-icon>
              </button>
              <Link to={`/update_product/${item._id}`}>
                <button className="btn btn-outline-warning mb-1 ms-1">
                  <lord-icon
                    src="https://cdn.lordicon.com/oclwxpmm.json"
                    trigger="hover"
                    title="Edit"
                  ></lord-icon>
                </button>
              </Link>
              <Link to={`/deal_product/${item._id}`}>
                <button className="btn btn-outline-success ms-1 mb-1">
                  <lord-icon
                    src="https://cdn.lordicon.com/zwixqnmk.json"
                    trigger="hover"
                    title="Discount"
                  ></lord-icon>
                </button>
              </Link>
            </div>
          ) : null}

          <img src={item.img.url} className="card-img-top img-fluid" />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title fs-2">{item.title}</h5>
          {item.discount &&
          (timerSeconds > 0 ||
            timerMinutes > 0 ||
            timerHours > 0 ||
            timerDays > 0) ? (
            <div className="mb-2">
              <h3 className="text-danger d-inline">
                <del>{item.price}$ </del>
              </h3>
              <h3 className="text-success d-inline ms-4"> {item.discount}$ </h3>
            </div>
          ) : (
            <div className="mb-2">
              <h3 className="text-success d-inline">{item.price}$</h3>
            </div>
          )}

          {item.discount &&
          (timerSeconds > 0 ||
            timerMinutes > 0 ||
            timerHours > 0 ||
            timerDays > 0) ? (
            <div className="timer mb-3">
              <Timer
                timerDays={timerDays}
                timerHours={timerHours}
                timerMinutes={timerMinutes}
                timerSeconds={timerSeconds}
              />
            </div>
          ) : null}
          {!user ? (
            <button
              className="btn btn-success"
              onClick={() => setModelReg(true)}
            >
              <span className="fs-6">
                Add To Cart &nbsp;
                <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
              </span>
            </button>
          ) : item.pcs > 0 && item.cart === true ? (
            <button
              className="btn btn-danger"
              onClick={() => addToCart(item)}
              disabled={true}
            >
              In The Cart &nbsp;
              <FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon>
            </button>
          ) : item.cart === false &&
            item.pcs > 0 &&
            user?.id !== item.createdBy ? (
            <button className="btn btn-success" onClick={() => addToCart(item)}>
              <span className="fs-6">
                Add To Cart &nbsp;
                <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
              </span>
            </button>
          ) : item.createdBy === user?.id ? (
            <button className="btn btn-danger" disabled={true}>
              {" "}
              It's Your Product
            </button>
          ) : item.pcs === 0 && item.createdBy !== user?.id ? (
            <button className="btn btn-danger" disabled={true}>
              Sold Out &nbsp;
              <FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon>
            </button>
          ) : null}

          {!user ? (
            <button
              className="btn btn-primary ms-2"
              onClick={() => setModelReg(true)}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="fs-4"
              ></FontAwesomeIcon>
            </button>
          ) : item.createdBy === user?.id ? null : !item.like ? (
            <button
              className="btn btn-primary ms-2"
              onClick={() => removeToFavorite(item)}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="fs-4"
              ></FontAwesomeIcon>
            </button>
          ) : null}

          <div className=" justify-content-center mt-2">
            <lord-icon
              src="https://cdn.lordicon.com/aixyixpa.json"
              title="info"
              onClick={() => setModelArr(true)}
            ></lord-icon>
          </div>

          {modelArr ? (
            <ModelInfo
              setModelArr={setModelArr}
              item={item}
              addToCart={addToCart}
              setModelReg={setModelReg}
              modelReg={modelReg}
              user={user}
            />
          ) : null}

          {modelDelete ? (
            <ModelDelete item={item} setModelDelete={setModelDelete} />
          ) : null}

          {modelReg ? <ModelRegister setModelReg={setModelReg} /> : null}
        </div>
      </div>
    </div>
  );
};

export default ItemB;
