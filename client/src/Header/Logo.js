import React from "react";

import { Link } from "react-router-dom";

const Logo = ({theme }) => {
  return (
    <>
      <Link
        to="/"
        className={theme ? "line-dark logo" : "line logo"}
    
      >
        <h5 className="fs-1">RB BAR</h5>
      </Link>
    </>
  );
};

export default Logo;
