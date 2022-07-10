import React from "react";
import { toast } from "react-toastify";
import { deleteCategoryById } from "../Services/categoryService";
import { deleteProductById } from "../Services/productService";

const ModelDelete = ({ item, setModelDelete }) => {
  const modalStyle = {
    display: "block",
  };

  const handleDelete = async () => {
    const res = await deleteCategoryById(item._id);
    const res1 = await deleteProductById(item._id);
    console.log(res.data.msg);
    setTimeout(() => {
      if (res.data.msg === "Category Deleted Successfully") {
        setModelDelete(false);
        toast.success(`The Category it's Delete`);
        window.location = "/";
      } else if (res1.data.msg === "Product Deleted Successfully") {
        setModelDelete(false);
        toast.success(`The Product it's Delete`);
        window.location = "/my_item";
      } else {
        toast.error(`Something happened`);
      }
    }, 1000);
  };

  return (
    <div className="modal show fade model-all" style={modalStyle} tabIndex="-1">
      <div className="modal-dialog model-border">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <b> {item.title} </b>
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setModelDelete(false)}
            ></button>
          </div>
          <div className="modal-body">
            <br></br>
            <p className="fs-4">
              Are you sure that you want delete
              <span className="text-danger">
                <b>&nbsp;{item.title}</b>
              </span>
              ?
            </p>
            <br></br>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setModelDelete(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDelete;
