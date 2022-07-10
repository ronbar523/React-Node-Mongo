import React, { useState } from "react";
import { Link } from "react-router-dom";

import ModelDelete from "./ModelDelete";


const CategoryCard = ({item, user}) => {

    const [modelDelete, setModelDelete] = useState(false);

    return (
      <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
        <div className="card p-0 overflow-hidden h-100 shadow">
          <div className="card-body">
            {user && user.isAdmin ? (
              <div>
                <button
                  className="btn btn-outline-danger mb-1"
                  onClick={() => setModelDelete(true)}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/dovoajyj.json"
                    trigger="hover"
                    title="Delete"
                  ></lord-icon>
                </button>
                <Link to={`/update_category/${item._id}`}>
                  <button className="btn btn-outline-warning mb-1 ms-2">
                    <lord-icon
                      src="https://cdn.lordicon.com/oclwxpmm.json"
                      trigger="hover"
                      title="Edit"
                    ></lord-icon>
                  </button>
                </Link>
              </div>
            ) : null}
            <img
              src={item.img.url}
              alt={item.img.alt}
              className="card-img-top img-fluid"
            />
          </div>
          <div className="card-body text-center">
            <h5 className="card-title fs-2">{item.title}</h5>
            <Link to={item.title}>
              <button className="btn btn-primary fs-6"> Click Here </button>
            </Link>

            {modelDelete ? (
              <ModelDelete item={item} setModelDelete={setModelDelete} />
            ) : null}
          </div>
        </div>
      </div>
    );
}
 
export default CategoryCard;