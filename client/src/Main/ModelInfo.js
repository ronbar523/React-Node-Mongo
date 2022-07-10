import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCartArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const Model = ({ setModelArr, item, addToCart }) => {
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
              <h2 className="modal-title">
                <b> {item.title} </b>
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setModelArr(false)}
              ></button>
            </div>
            <div className="modal-body">
              <h3 className="my-3">{item.desc}</h3>
            </div>
            {item.pcs === 0 ? (
              <h4 className="out-stock fs-3 text-danger">Out From Stock</h4>
            ) : item.pcs > 0 && item.pcs <= 10 ? (
              <h4 className="stock fs-3">Almost Gone</h4>
            ) : (
              <h4 className="in-stock text-success fs-3">In Stock</h4>
            )}

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setModelArr(false)}
              >
                Close
              </button>

              {item.pcs > 0 && item.cart === false ? (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    addToCart(item);
                    setModelArr(false);
                  }}
                >
                  Add To Cart &nbsp;
                  <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                </button>
              ) : item.pcs > 0 && item.cart === true ? (
                <button className="btn btn-danger" disabled={true}>
                  In The Cart &nbsp;
                  <FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon>
                </button>
              ) : item.pcs === 0 ? (
                <button className="btn btn-danger" disabled={true}>
                  Out Stock &nbsp;
                  <FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
