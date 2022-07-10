import React, { useState } from "react";
import { motion } from "framer-motion";

import ModelCart from "../Main/ModelCart";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDown,
  faCircleUp,
  faArrowDown,
  faArrowUp,
  faArrowRight,
  faXmark,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

const Cart = ({
  cart,
  removeToCart,
  theme,
  setTheme,
  variants,
  show,
  setShow,
  timerSeconds,
  timerDays,
  timerMinutes,
  timerHours,
  setCart,
}) => {
  function increase(item) {
    let x = cart.map((i) => {
      if (item._id === i._id) {
        i.quantity += 1;
      }
      return i;
    });
    setCart(x);
  }

  function decrease(item) {
    let x = cart.map((i) => {
      if (item._id === i._id && i.quantity > 0) {
        i.quantity -= 1;
      }
      return i;
    });
    setCart(x);
  }

  function totalPriceBeforeDiscount() {
    let x = 0;
    cart.map((i) => {
      x += i.price * i.quantity;
    });
    return x;
  }

  function totalDiscount() {
    let x = 0;
    cart.map((i) => {
      if (
        timerSeconds === undefined ||
        timerMinutes === undefined ||
        timerHours === undefined ||
        timerDays === undefined
      ) {
        x += 0;
      } else {
        x += i.lessDiscount * i.quantity;
      }
    });
    return -x;
  }

  function totalPriceAfterDiscount() {
    let x = 0;
    cart.map((i) => {
      if (
        (i.discount >= 1 && timerSeconds > 0) ||
        timerHours > 0 ||
        timerMinutes > 0 ||
        timerDays > 0
      ) {
        x += i.price * i.quantity - i.lessDiscount * i.quantity;
      } else {
        x += i.price * i.quantity;
      }
    });
    return x;
  }

  function shipping() {
    let x = 0;
    cart.map((i) => {
      if (totalPriceAfterDiscount() < 10) {
        x = 20;
      } else if (
        totalPriceAfterDiscount() < 30 &&
        totalPriceAfterDiscount() >= 10
      ) {
        x = 10;
      }
    });
    return x;
  }

  function finalPrice() {
    let x = 0;
    cart.map((i) => {
      x = shipping() + totalPriceAfterDiscount();
    });
    return x;
  }

  const [noOfElement, setNoOfElement] = useState(5);
  const loadMore = () => {
    if (cart.length > noOfElement) {
      setNoOfElement(noOfElement + 5);
    }
  };

  const loadLess = () => {
    if (noOfElement > 5) {
      setNoOfElement(noOfElement * 0 + 5);
    }
  };

  const [highPriceArr, setHighPriceArr] = useState(false);
  const [lowPriceArr, setLowPriceArr] = useState(false);
  const [highDiscountArr, setHighDiscountArr] = useState(false);
  const [lowDiscountArr, setLowDiscountArr] = useState(false);
  const [lowFinalPriceArr, setLowFinalPriceArr] = useState(false);
  const [highFinalPriceArr, setHighFinalPriceArr] = useState(false);
  const [bigNameArr, setBigNameArr] = useState(false);
  const [littleName, setLittleName] = useState(true);

  const [infoPriceArr, setInfoPriceArr] = useState(false);

  return (
    <div className={theme ? "theme-dark" : ""}>
      <div
        className={
          cart.length < 5
            ? "content-bg-color main-content page-height"
            : "content-bg-color main-content"
        }
      >
        <div className="col-12 mt-5">
          <h1
            className={
              !theme ? "text-center  title-cart" : " text-center  title-cart"
            }
          >
            {" "}
            My Cart{" "}
          </h1>
          {cart.length === 0 ? (
            <div>
              <h2 className="ms-4 mt-5 text-center">Your Cart It's Empty...</h2>
            </div>
          ) : null}
          <div className=" ms-5 col-7 mt-5">
            <div className="row mt-3 table-mobile">
              <table className="table text-center">
                {cart.length > 0 && infoPriceArr === false ? (
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col" className="th-one">
                        Product
                      </th>
                      <th scope="col">
                        Name &nbsp;
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className="arrow-th"
                          onClick={() => {
                            setHighPriceArr(false);
                            setLowPriceArr(false);
                            setBigNameArr(false);
                            setLowDiscountArr(false);
                            setHighDiscountArr(false);
                            setHighFinalPriceArr(false);
                            setLowFinalPriceArr(false);
                            setLittleName(true);
                          }}
                        ></FontAwesomeIcon>
                        &nbsp;
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          className="arrow-th"
                          onClick={() => {
                            setLowPriceArr(false);
                            setHighPriceArr(false);
                            setBigNameArr(true);
                            setLowDiscountArr(false);
                            setHighDiscountArr(false);
                            setHighFinalPriceArr(false);
                            setLowFinalPriceArr(false);
                            setLittleName(false);
                          }}
                        ></FontAwesomeIcon>
                      </th>

                      <th scope="col">
                        Price &nbsp;
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className="arrow-th"
                          onClick={() => {
                            setLowPriceArr(true);
                            setHighPriceArr(false);
                            setBigNameArr(false);
                            setLowDiscountArr(false);
                            setHighDiscountArr(false);
                            setHighFinalPriceArr(false);
                            setLowFinalPriceArr(false);
                            setLittleName(false);
                          }}
                        ></FontAwesomeIcon>
                        &nbsp;
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          className="arrow-th"
                          onClick={() => {
                            setLowPriceArr(false);
                            setHighPriceArr(true);
                            setBigNameArr(false);
                            setLowDiscountArr(false);
                            setHighDiscountArr(false);
                            setHighFinalPriceArr(false);
                            setLowFinalPriceArr(false);
                            setLittleName(false);
                          }}
                        ></FontAwesomeIcon>
                      </th>
                      <th scope="col">
                        Discount &nbsp;
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className="arrow-th"
                          onClick={() => {
                            setLowDiscountArr(false);
                            setHighDiscountArr(false);
                            setLowPriceArr(false);
                            setHighPriceArr(false);
                            setBigNameArr(false);
                            setLowDiscountArr(true);
                            setHighFinalPriceArr(false);
                            setLowFinalPriceArr(false);
                            setLittleName(false);
                          }}
                        ></FontAwesomeIcon>
                        &nbsp;
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          className="arrow-th"
                          onClick={() => {
                            setLowPriceArr(false);
                            setHighPriceArr(false);
                            setBigNameArr(false);
                            setLowDiscountArr(false);
                            setHighDiscountArr(true);
                            setHighFinalPriceArr(false);
                            setLowFinalPriceArr(false);
                            setLittleName(false);
                          }}
                        ></FontAwesomeIcon>
                      </th>
                      <th scope="col">
                        Final &nbsp;
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className="arrow-th"
                          onClick={() => {
                            setHighPriceArr(false);
                            setLowPriceArr(false);
                            setBigNameArr(false);
                            setLowDiscountArr(false);
                            setHighDiscountArr(false);
                            setHighFinalPriceArr(false);
                            setLowFinalPriceArr(true);
                            setLittleName(false);
                          }}
                        ></FontAwesomeIcon>
                        &nbsp;
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          className="arrow-th"
                          onClick={() => {
                            setLowPriceArr(false);
                            setHighPriceArr(false);
                            setBigNameArr(false);
                            setLowDiscountArr(false);
                            setHighDiscountArr(false);
                            setHighFinalPriceArr(true);
                            setLowFinalPriceArr(false);
                            setLittleName(false);
                          }}
                        ></FontAwesomeIcon>
                      </th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {bigNameArr && infoPriceArr === false
                    ? cart

                        .sort((a, b) => (a.title < b.title ? 1 : -1))
                        .slice(0, noOfElement)
                        .map((i, index) => (
                          <tr key={i.id}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">
                              <img src={i.img.url} style={{ width: "4rem" }} />
                            </th>
                            <td>
                              <b className="mobile-title">Name: &nbsp;</b>
                              {i.title}
                            </td>
                            <td>
                              <b className="mobile-title">
                                Normal Price: &nbsp;
                              </b>
                              {i.quantity * i.price}$
                            </td>
                            {timerDays === undefined ||
                            timerSeconds === undefined ||
                            timerMinutes === undefined ||
                            timerHours === undefined ||
                            i.discount === 0 ? (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                -
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                {i.quantity * i.discount - i.price * i.quantity}
                                $
                              </td>
                            )}
                            {timerDays === undefined &&
                            timerSeconds === undefined &&
                            timerMinutes === undefined &&
                            timerHours === undefined &&
                            i.discount ? (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity}$
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity -
                                  i.lessDiscount * i.quantity}
                                $
                              </td>
                            )}

                            <td>
                              <b className="mobile-title">Quantity: &nbsp;</b>
                              <button
                                onClick={() => decrease(i)}
                                className="btn btn-primary btn-sm d-inline"
                                disabled={i.quantity === 0}
                              >
                                -
                              </button>

                              <h6 className="ms-1 me-1 d-inline">
                                {i.quantity}
                              </h6>
                              <button
                                onClick={() => increase(i)}
                                disabled={i.pcs === i.quantity}
                                className="btn btn-primary btn-sm d-inline"
                                size="sm"
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => removeToCart(i)}
                                className="btn btn-danger btn-sm"
                                size="sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}

                  {/* High Price */}
                  {highPriceArr && infoPriceArr === false
                    ? cart
                        .sort((a, b) => (a.price < b.price ? 1 : -1))
                        .slice(0, noOfElement)
                        .map((i, index) => (
                          <tr key={i.id}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">
                              <img src={i.img.url} style={{ width: "4rem" }} />
                            </th>
                            <td>
                              <b className="mobile-title">Name: &nbsp;</b>
                              {i.title}
                            </td>
                            <td>
                              <b className="mobile-title">
                                Normal Price: &nbsp;
                              </b>
                              {i.quantity * i.price}$
                            </td>
                            {timerDays === undefined ||
                            timerSeconds === undefined ||
                            timerMinutes === undefined ||
                            timerHours === undefined ||
                            i.discount === 0 ? (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                -
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                {i.quantity * i.discount - i.price * i.quantity}
                                $
                              </td>
                            )}
                            {timerDays === undefined &&
                            timerSeconds === undefined &&
                            timerMinutes === undefined &&
                            timerHours === undefined &&
                            i.discount ? (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity}$
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity -
                                  i.lessDiscount * i.quantity}
                                $
                              </td>
                            )}

                            <td>
                              <b className="mobile-title">Quantity: &nbsp;</b>
                              <button
                                onClick={() => decrease(i)}
                                className="btn btn-primary  btn-sm d-inline"
                                disabled={i.quantity === 0}
                              >
                                -
                              </button>

                              <h6 className="ms-1 me-1 d-inline">
                                {i.quantity}
                              </h6>
                              <button
                                onClick={() => increase(i)}
                                disabled={i.pcs === i.quantity}
                                className="btn btn-primary  btn-sm d-inline"
                                size="sm"
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => removeToCart(i)}
                                className="btn btn-danger btn-sm"
                                size="sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}

                  {lowPriceArr && infoPriceArr === false
                    ? cart
                        .sort((a, b) => (a.price > b.price ? 1 : -1))
                        .slice(0, noOfElement)
                        .map((i, index) => (
                          <tr key={i.id}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">
                              <img src={i.img.url} style={{ width: "4rem" }} />
                            </th>
                            <td>
                              <b className="mobile-title">Name: &nbsp;</b>
                              {i.title}
                            </td>
                            <td>
                              <b className="mobile-title">
                                Normal Price: &nbsp;
                              </b>
                              {i.quantity * i.price}$
                            </td>
                            {timerDays === undefined ||
                            timerSeconds === undefined ||
                            timerMinutes === undefined ||
                            timerHours === undefined ||
                            i.discount === 0 ? (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                -
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                {i.quantity * i.discount - i.price * i.quantity}
                                $
                              </td>
                            )}
                            {timerDays === undefined &&
                            timerSeconds === undefined &&
                            timerMinutes === undefined &&
                            timerHours === undefined &&
                            i.discount ? (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity}$
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity -
                                  i.lessDiscount * i.quantity}
                                $
                              </td>
                            )}

                            <td>
                              <b className="mobile-title">Quantity: &nbsp;</b>
                              <button
                                onClick={() => decrease(i)}
                                className="btn btn-primary  btn-sm d-inline"
                                disabled={i.quantity === 0}
                              >
                                -
                              </button>

                              <h6 className="ms-1 me-1 d-inline">
                                {i.quantity}
                              </h6>
                              <button
                                onClick={() => increase(i)}
                                disabled={i.pcs === i.quantity}
                                className="btn btn-primary  btn-sm d-inline"
                                size="sm"
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => removeToCart(i)}
                                className="btn btn-danger  btn-sm"
                                size="sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}

                  {highDiscountArr && infoPriceArr === false
                    ? cart
                        .sort((a, b) => (a.discount < b.discount ? 1 : -1))
                        .slice(0, noOfElement)
                        .map((i, index) => (
                          <tr key={i.id}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">
                              <img src={i.img.url} style={{ width: "4rem" }} />
                            </th>
                            <td>
                              <b className="mobile-title">Name: &nbsp;</b>
                              {i.title}
                            </td>
                            <td>
                              <b className="mobile-title">
                                Normal Price: &nbsp;
                              </b>
                              {i.quantity * i.price}$
                            </td>
                            {timerDays === undefined ||
                            timerSeconds === undefined ||
                            timerMinutes === undefined ||
                            timerHours === undefined ||
                            i.discount === 0 ? (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                -
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                {i.quantity * i.discount - i.price * i.quantity}
                                $
                              </td>
                            )}
                            {timerDays === undefined &&
                            timerSeconds === undefined &&
                            timerMinutes === undefined &&
                            timerHours === undefined &&
                            i.discount ? (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity}$
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity -
                                  i.lessDiscount * i.quantity}
                                $
                              </td>
                            )}

                            <td>
                              <b className="mobile-title">Quantity: &nbsp;</b>
                              <button
                                onClick={() => decrease(i)}
                                className="btn btn-primary  btn-sm d-inline"
                                disabled={i.quantity === 0}
                              >
                                -
                              </button>

                              <h6 className="ms-1 me-1 d-inline">
                                {i.quantity}
                              </h6>
                              <button
                                onClick={() => increase(i)}
                                disabled={i.pcs === i.quantity}
                                className="btn btn-primary  btn-sm d-inline"
                                size="sm"
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => removeToCart(i)}
                                className="btn btn-danger  btn-sm"
                                size="sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}

                  {lowDiscountArr && infoPriceArr === false
                    ? cart
                        .sort((a, b) => (a.discount > b.discount ? 1 : -1))
                        .slice(0, noOfElement)
                        .map((i, index) => (
                          <tr key={i.id}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">
                              <img src={i.img.url} style={{ width: "4rem" }} />
                            </th>
                            <td>
                              <b className="mobile-title">Name: &nbsp;</b>
                              {i.title}
                            </td>
                            <td>
                              <b className="mobile-title">
                                Normal Price: &nbsp;
                              </b>
                              {i.quantity * i.price}$
                            </td>
                            {timerDays === undefined ||
                            timerSeconds === undefined ||
                            timerMinutes === undefined ||
                            timerHours === undefined ||
                            i.discount === 0 ? (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                -
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                {i.quantity * i.discount - i.price * i.quantity}
                                $
                              </td>
                            )}
                            {timerDays === undefined &&
                            timerSeconds === undefined &&
                            timerMinutes === undefined &&
                            timerHours === undefined &&
                            i.discount ? (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity}$
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity -
                                  i.lessDiscount * i.quantity}
                                $
                              </td>
                            )}

                            <td>
                              <b className="mobile-title">Quantity: &nbsp;</b>
                              <button
                                onClick={() => decrease(i)}
                                className="btn btn-primary  btn-sm d-inline"
                                disabled={i.quantity === 0}
                              >
                                -
                              </button>

                              <h6 className="ms-1 me-1 d-inline">
                                {i.quantity}
                              </h6>
                              <button
                                onClick={() => increase(i)}
                                disabled={i.pcs === i.quantity}
                                className="btn btn-primary  btn-sm d-inline"
                                size="sm"
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => removeToCart(i)}
                                className="btn btn-danger  btn-sm"
                                size="sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}

                  {lowFinalPriceArr && infoPriceArr === false
                    ? cart
                        .sort((a, b) =>
                          a.price * a.quantity - a.lessDiscount * a.quantity >
                          b.price * b.quantity - b.lessDiscount * b.quantity
                            ? 1
                            : -1
                        )
                        .slice(0, noOfElement)
                        .map((i, index) => (
                          <tr key={i.id}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">
                              <img src={i.img.url} style={{ width: "4rem" }} />
                            </th>
                            <td>
                              <b className="mobile-title">Name: &nbsp;</b>
                              {i.title}
                            </td>
                            <td>
                              <b className="mobile-title">
                                Normal Price: &nbsp;
                              </b>
                              {i.quantity * i.price}$
                            </td>
                            {timerDays === undefined ||
                            timerSeconds === undefined ||
                            timerMinutes === undefined ||
                            timerHours === undefined ||
                            i.discount === 0 ? (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                -
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                {i.quantity * i.discount - i.price * i.quantity}
                                $
                              </td>
                            )}
                            {timerDays === undefined &&
                            timerSeconds === undefined &&
                            timerMinutes === undefined &&
                            timerHours === undefined &&
                            i.discount ? (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity}$
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity -
                                  i.lessDiscount * i.quantity}
                                $
                              </td>
                            )}

                            <td>
                              <b className="mobile-title">Quantity: &nbsp;</b>
                              <button
                                onClick={() => decrease(i)}
                                className="btn btn-primary  btn-sm d-inline"
                                disabled={i.quantity === 0}
                              >
                                -
                              </button>

                              <h6 className="ms-1 me-1 d-inline">
                                {i.quantity}
                              </h6>
                              <button
                                onClick={() => increase(i)}
                                disabled={i.pcs === i.quantity}
                                className="btn btn-primary  btn-sm d-inline"
                                size="sm"
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => removeToCart(i)}
                                className="btn btn-danger  btn-sm"
                                size="sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}

                  {highFinalPriceArr && infoPriceArr === false
                    ? cart
                        .sort((a, b) =>
                          a.price * a.quantity - a.lessDiscount * a.quantity <
                          b.price * b.quantity - b.lessDiscount * b.quantity
                            ? 1
                            : -1
                        )
                        .slice(0, noOfElement)
                        .map((i, index) => (
                          <tr key={i.id}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">
                              <img src={i.img.url} style={{ width: "4rem" }} />
                            </th>
                            <td>
                              <b className="mobile-title">Name: &nbsp;</b>
                              {i.title}
                            </td>
                            <td>
                              <b className="mobile-title">
                                Normal Price: &nbsp;
                              </b>
                              {i.quantity * i.price}$
                            </td>
                            {timerDays === undefined ||
                            timerSeconds === undefined ||
                            timerMinutes === undefined ||
                            timerHours === undefined ||
                            i.discount === 0 ? (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                -
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                {i.quantity * i.discount - i.price * i.quantity}
                                $
                              </td>
                            )}
                            {timerDays === undefined &&
                            timerSeconds === undefined &&
                            timerMinutes === undefined &&
                            timerHours === undefined &&
                            i.discount ? (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity}$
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity -
                                  i.lessDiscount * i.quantity}
                                $
                              </td>
                            )}

                            <td>
                              <b className="mobile-title">Quantity: &nbsp;</b>
                              <button
                                onClick={() => decrease(i)}
                                className="btn btn-primary  btn-sm d-inline"
                                disabled={i.quantity === 0}
                              >
                                -
                              </button>

                              <h6 className="ms-1 me-1 d-inline">
                                {i.quantity}
                              </h6>
                              <button
                                onClick={() => increase(i)}
                                disabled={i.pcs === i.quantity}
                                className="btn btn-primary  btn-sm d-inline"
                                size="sm"
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => removeToCart(i)}
                                className="btn btn-danger  btn-sm"
                                size="sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}

                  {littleName && infoPriceArr === false
                    ? cart
                        .sort((a, b) => (a.title > b.title ? 1 : -1))
                        .slice(0, noOfElement)
                        .map((i, index) => (
                          <tr key={i.id}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">
                              <img src={i.img.url} style={{ width: "4rem" }} />
                            </th>
                            <td>
                              <b className="mobile-title">Name: &nbsp;</b>
                              {i.title}
                            </td>
                            <td>
                              <b className="mobile-title">
                                Normal Price: &nbsp;
                              </b>
                              {i.quantity * i.price}$
                            </td>
                            {timerDays === undefined ||
                            timerSeconds === undefined ||
                            timerMinutes === undefined ||
                            timerHours === undefined ||
                            i.discount === 0 ? (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                -
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">Discount: &nbsp;</b>
                                {i.quantity * i.discount - i.price * i.quantity}
                                $
                              </td>
                            )}
                            {timerDays === undefined &&
                            timerSeconds === undefined &&
                            timerMinutes === undefined &&
                            timerHours === undefined &&
                            i.discount ? (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity}$
                              </td>
                            ) : (
                              <td>
                                <b className="mobile-title">
                                  Finale Price: &nbsp;
                                </b>
                                {i.price * i.quantity -
                                  i.lessDiscount * i.quantity}
                                $
                              </td>
                            )}

                            <td>
                              <b className="mobile-title">Quantity: &nbsp;</b>
                              <button
                                onClick={() => decrease(i)}
                                className="btn btn-primary  btn-sm d-inline"
                                disabled={i.quantity === 0}
                              >
                                -
                              </button>

                              <h6 className="ms-1 me-1 d-inline">
                                {i.quantity}
                              </h6>
                              <button
                                onClick={() => increase(i)}
                                disabled={i.pcs === i.quantity}
                                className="btn btn-primary  btn-sm d-inline"
                                size="sm"
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => removeToCart(i)}
                                className="btn btn-danger  btn-sm"
                                size="sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}
                </tbody>
              </table>
              <div className="d-inline ">
                <div className="btn-infoPrice d-inline">
                  {cart.length > 0 && infoPriceArr === false ? (
                    <button
                      className="btn btn-primary btn-pay d-inline"
                      onClick={() => setInfoPriceArr(true)}
                    >
                      Check Out
                    </button>
                  ) : null}
                </div>

                {cart.length >= 6 && infoPriceArr === false ? (
                  <div className="d-inline justify-content-center mb-2 ">
                    <button
                      className="btn-arrow me-1"
                      onClick={() => loadMore(true)}
                      disabled={cart.length <= noOfElement}
                    >
                      <FontAwesomeIcon
                        icon={faCircleDown}
                        className="ico justify-content-center"
                      ></FontAwesomeIcon>
                    </button>
                    <button
                      className="btn-arrow-right ms-1"
                      onClick={() => loadLess(true)}
                      disabled={5 >= noOfElement}
                    >
                      <FontAwesomeIcon
                        icon={faCircleUp}
                        className="ico justify-content-center "
                      ></FontAwesomeIcon>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
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
                <div>
                  <button
                    className={
                      theme
                        ? " btn btn-dark btn-one"
                        : "btn btn-primary btn-one"
                    }
                    disabled={littleName || cart.length < 2}
                    onClick={() => {
                      setLowDiscountArr(false);
                      setHighDiscountArr(false);
                      setLowPriceArr(false);
                      setHighPriceArr(false);
                      setBigNameArr(false);
                      setLowDiscountArr(false);
                      setHighFinalPriceArr(false);
                      setLowFinalPriceArr(false);
                      setLittleName(true);
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
                    disabled={bigNameArr || cart.length < 2}
                    onClick={() => {
                      setLowDiscountArr(false);
                      setHighDiscountArr(false);
                      setLowPriceArr(false);
                      setHighPriceArr(false);
                      setBigNameArr(true);
                      setLowDiscountArr(false);
                      setHighFinalPriceArr(false);
                      setLowFinalPriceArr(false);
                      setLittleName(false);
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
                    disabled={lowPriceArr || cart.length < 2}
                    onClick={() => {
                      setLowDiscountArr(false);
                      setHighDiscountArr(false);
                      setLowPriceArr(true);
                      setHighPriceArr(false);
                      setBigNameArr(false);
                      setLowDiscountArr(false);
                      setHighFinalPriceArr(false);
                      setLowFinalPriceArr(false);
                      setLittleName(false);
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
                    disabled={highPriceArr || cart.length < 2}
                    onClick={() => {
                      setLowDiscountArr(false);
                      setHighDiscountArr(false);
                      setLowPriceArr(false);
                      setHighPriceArr(true);
                      setBigNameArr(false);
                      setLowDiscountArr(false);
                      setHighFinalPriceArr(false);
                      setLowFinalPriceArr(false);
                      setLittleName(false);
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
                    disabled={highDiscountArr || cart.length < 2}
                    onClick={() => {
                      setLowDiscountArr(false);
                      setHighDiscountArr(true);
                      setLowPriceArr(false);
                      setHighPriceArr(false);
                      setBigNameArr(false);
                      setLowDiscountArr(false);
                      setHighFinalPriceArr(false);
                      setLowFinalPriceArr(false);
                      setLittleName(false);
                      setShow(false);
                    }}
                  >
                    Discount High To Low &nbsp;
                    <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                  </button>
                  <button
                    className={
                      theme
                        ? " btn btn-dark btn-six"
                        : "btn btn-primary btn-six"
                    }
                    disabled={lowDiscountArr || cart.length < 2}
                    onClick={() => {
                      setLowDiscountArr(false);
                      setHighDiscountArr(false);
                      setLowPriceArr(false);
                      setHighPriceArr(false);
                      setBigNameArr(false);
                      setLowDiscountArr(true);
                      setHighFinalPriceArr(false);
                      setLowFinalPriceArr(false);
                      setLittleName(false);
                      setShow(false);
                    }}
                  >
                    Discount Low To High &nbsp;
                    <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                  </button>
                  <button
                    className={
                      theme
                        ? " btn btn-dark btn-seven"
                        : "btn btn-primary btn-seven"
                    }
                    disabled={highFinalPriceArr || cart.length < 2}
                    onClick={() => {
                      setLowDiscountArr(false);
                      setHighDiscountArr(false);
                      setLowPriceArr(false);
                      setHighPriceArr(false);
                      setBigNameArr(false);
                      setLowDiscountArr(false);
                      setHighFinalPriceArr(true);
                      setLowFinalPriceArr(false);
                      setLittleName(false);
                      setShow(false);
                    }}
                  >
                    Final Price High To Low &nbsp;
                    <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                  </button>
                  <button
                    className={
                      theme
                        ? " btn btn-dark btn-eight"
                        : "btn btn-primary btn-eight"
                    }
                    disabled={lowFinalPriceArr || cart.length < 2}
                    onClick={() => {
                      setLowDiscountArr(false);
                      setHighDiscountArr(false);
                      setLowPriceArr(false);
                      setHighPriceArr(false);
                      setBigNameArr(false);
                      setLowDiscountArr(false);
                      setHighFinalPriceArr(false);
                      setLowFinalPriceArr(true);
                      setLittleName(false);
                      setShow(false);
                    }}
                  >
                    Final Price Low To High &nbsp;
                    <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                  </button>
                  <button
                    className={
                      theme
                        ? " btn btn-dark btn-eight"
                        : "btn btn-primary btn-eight"
                    }
                    disabled={lowFinalPriceArr || cart.length < 2}
                    onClick={() => {
                      setLowDiscountArr(false);
                      setHighDiscountArr(false);
                      setLowPriceArr(false);
                      setHighPriceArr(false);
                      setBigNameArr(false);
                      setLowDiscountArr(false);
                      setHighFinalPriceArr(false);
                      setLowFinalPriceArr(true);
                      setLittleName(false);
                      setShow(false);
                    }}
                  >
                    Final Price Low To High &nbsp;
                    <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                  </button>
                </div>
              </motion.div>
            </motion.nav>
          </div>
          {infoPriceArr === false ? (
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
          ) : null}
          <div className="row total-cart">
            {cart.length >= 1 && infoPriceArr === false ? (
              <div className="card p-0 overflow-hidden col-3 shadow">
                <h4 className="mt-4 ms-4">
                  <b>Summary</b>
                </h4>
                <h5 className="my-3 ms-4">
                  Price: {totalPriceBeforeDiscount()}$
                </h5>

                <h5 className="my-3 ms-4">Discount: {totalDiscount()}$</h5>

                <h5 className="my-3 ms-4">
                  Price After Discount: {totalPriceAfterDiscount()}$
                </h5>
                <h5 className="my-3 ms-4"> Shipping Cost: {shipping()}$</h5>
                <h5 className="my-3 ms-4"> Total Price: {finalPrice()}$</h5>

                <button className="btn btn-primary fs-5 ms-4 cart-buy-now">
                  Buy Now
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="model-position">
          {infoPriceArr === true ? (
            <ModelCart
              setInfoPriceArr={setInfoPriceArr}
              totalPriceBeforeDiscount={totalPriceBeforeDiscount}
              totalPriceAfterDiscount={totalPriceAfterDiscount}
              shipping={shipping}
              finalPrice={finalPrice}
              totalDiscount={totalDiscount}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Cart;
