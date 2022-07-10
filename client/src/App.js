import "./Css/App.css";
import "./Css/sideNav.css";
import "./Css/dark.css";
import "./Css/navbar.css";
import "./Css/clock.css";
import "./Css/cart.css";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { getCurrentUser } from "./Services/userService";


import Navbar from "./Header/Navbar";


import Home from "./Pages/Home";


import CategoryForm from "./Pages/Forms/Categories/CategoryForm";


import Register from "./Pages/Forms/User/Register";
import Login from "./Pages/Forms/User/Login";
import Logout from "./Pages/Forms/User/Logout";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import MakeDeal from "./Pages/Forms/Products/ProductDealForm";

import ProductForm from "./Pages/Forms/Products/ProductForm";
import MyItem from "./Pages/MyItem";
import MyFavorite from "./Pages/MyFavorite";
import RestPassword from "./Pages/Forms/User/RestPassword";



function App() {
  const user = getCurrentUser();

  //Cart

  const [productsArr, setProductsArr] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart" + user?.id) || "[]")
  );

  const [like, setLike] = useState(
    JSON.parse(localStorage.getItem("like" + user?.id) || "[]")
  );

  useEffect(() => {
    productsArr.forEach((item) => {
      const itemFromCart = cart.find((cartItem) => cartItem._id === item._id);

      if (itemFromCart) {
        item.cart = true;
      }
      console.log(itemFromCart);
    });
  }, [productsArr, cart]);

  useEffect(() => {
    productsArr.forEach((item) => {
      const itemFromFavorite = like.find((likeItem) => likeItem._id === item._id);

      if (itemFromFavorite) {
        item.like = true;
      }
      console.log(itemFromFavorite);
    });
  }, [productsArr, like]);




  function addToFavorite(item){
    let like2 = [...like];
    like2.push({ ...item });
  

  productsArr.map((i) => {
    if (i._id === item._id) {
      i.like = true;
    }
  })
  setLike(like2);
    localStorage.setItem("like" + user?.id, JSON.stringify(like2));
  }

  






  function removeToFavorite(item) {
    let like2 = like.filter((i) => i._id !== item._id);
    productsArr.map((i) => {
      if (i._id === item.id) {
        i.like = false;
      }
    });
    setLike(like2);
    localStorage.setItem("like" + user?.id, JSON.stringify(like2));
  }

  

  function addToCart(item) {
    let cart2 = [...cart];
    cart2.push({ ...item });

    productsArr.map((i) => {
      if (i._id === item._id) {
        i.cart = true;
      }
    });
    setCart(cart2);
    localStorage.setItem("cart" + user?.id, JSON.stringify(cart2));
  }

  function removeToCart(item) {
    let cart2 = cart.filter((i) => i._id !== item._id);
    productsArr.map((i) => {
      if (i._id === item.id) {
        i.cart = false;
      }
    });
    setCart(cart2);
    localStorage.setItem("cart" + user?.id, JSON.stringify(cart2));
  }

  // Side Navbar
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const [show, setShow] = useState(false);

  // Dark / Light Mode

  const getTheme = () => {
    return JSON.parse(localStorage.getItem("theme")) || false;
  };

  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  // Timer

  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  let interval;

  const startTimer = () => {
    const countDownDate = new Date("July 30,2022").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));

      let hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );

      const Minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));

      const Seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(Minutes);
        setTimerSeconds(Seconds);
      }
    });
  };

  useEffect(() => {
    startTimer();
  });

  return (
    <>
      <Navbar theme={theme} user={user} />

      <main className="main container p-2">
        <Routes>
          {/* Login System */}
          <Route
            path="/register"
            element={
              <Register
                theme={theme}
                setTheme={setTheme}
                variants={variants}
                show={show}
                setShow={setShow}
                user={user}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                theme={theme}
                setTheme={setTheme}
                variants={variants}
                show={show}
                setShow={setShow}
                user={user}
              />
            }
          />
          <Route
            path="login/rest_password"
            element={
              <RestPassword
                variants={variants}
                show={show}
                setShow={setShow}
                theme={theme}
                setTheme={setTheme}
              />
            }
          />

          <Route path="/logout" element={<Logout />} />

          {/* Pages */}

          <Route
            path="/"
            element={
              <Home
                user={user}
                variants={variants}
                show={show}
                setShow={setShow}
                theme={theme}
                setTheme={setTheme}
              />
            }
          />

          <Route
            path="/:category"
            element={
              <Products
                user={user}
                theme={theme}
                setTheme={setTheme}
                addToCart={addToCart}
                removeToCart={removeToCart}
                removeToFavorite={removeToFavorite}
                addToFavorite={addToFavorite}
                productsArr={productsArr}
                setProductsArr={setProductsArr}
                show={show}
                setShow={setShow}
                variants={variants}
                timerDays={timerDays}
                timerHours={timerHours}
                timerMinutes={timerMinutes}
                timerSeconds={timerSeconds}
              />
            }
          />

          <Route
            path="/my_cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                removeToCart={removeToCart}
                timerDays={timerDays}
                timerHours={timerHours}
                timerMinutes={timerMinutes}
                timerSeconds={timerSeconds}
                theme={theme}
                setTheme={setTheme}
                variants={variants}
                show={show}
                setShow={setShow}
                user={user}
              />
            }
          />

          <Route
            path="/my_item"
            element={
              <MyItem
                user={user}
                theme={theme}
                setTheme={setTheme}
                addToCart={addToCart}
                removeToCart={removeToCart}
                productsArr={productsArr}
                setProductsArr={setProductsArr}
                show={show}
                setShow={setShow}
                variants={variants}
                timerDays={timerDays}
                timerHours={timerHours}
                timerMinutes={timerMinutes}
                timerSeconds={timerSeconds}
              />
            }
          />
          <Route
            path="/my_favorite"
            element={
              <MyFavorite
                user={user}
                theme={theme}
                setTheme={setTheme}
                addToCart={addToCart}
                removeToCart={removeToCart}
                removeToFavorite={removeToFavorite}
                addToFavorite={addToFavorite}
                show={show}
                setShow={setShow}
                variants={variants}
                timerDays={timerDays}
                timerHours={timerHours}
                timerMinutes={timerMinutes}
                timerSeconds={timerSeconds}
                like={like}
              />
            }
          />

          {/* Forms */}

          <Route
            path="/create_category"
            element={
              <CategoryForm
                user={user}
                theme={theme}
                setTheme={setTheme}
                variants={variants}
                show={show}
                setShow={setShow}
              />
            }
          />

          <Route
            path="/update_category/:id"
            element={
              <CategoryForm
                user={user}
                theme={theme}
                setTheme={setTheme}
                variants={variants}
                show={show}
                setShow={setShow}
              />
            }
          />

          <Route
            path="/create_product"
            element={
              <ProductForm
                user={user}
                theme={theme}
                setTheme={setTheme}
                variants={variants}
                show={show}
                setShow={setShow}
              />
            }
          />
          <Route
            path="/update_product/:id"
            element={
              <ProductForm
                user={user}
                theme={theme}
                setTheme={setTheme}
                variants={variants}
                show={show}
                setShow={setShow}
              />
            }
          />
          <Route
            path="/deal_product/:id"
            element={
              <MakeDeal
                user={user}
                theme={theme}
                setTheme={setTheme}
                variants={variants}
                show={show}
                setShow={setShow}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
