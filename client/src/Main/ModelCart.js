import React from "react";

const ModelCart = ({
  setInfoPriceArr,
  finalPrice,
  shipping,
  totalPriceAfterDiscount,
  totalPriceBeforeDiscount,
  totalDiscount
}) => {
  const modalStyle = {
    display: "block",
  };
  return (
    <>
      <div className="modal-position show fade" style={modalStyle} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-3 ms-2">
                <b> Total Cart </b>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setInfoPriceArr(false)}
              ></button>
            </div>
            <h5 className="mt-3 ms-4">Price: {totalPriceBeforeDiscount()}$</h5>

            <h5 className="mt-3 ms-4">Discount: {totalDiscount()}$</h5>

            <h5 className="mt-3 ms-4">
              Price After Discount: {totalPriceAfterDiscount()}$
            </h5>
            <h5 className="mt-3 ms-4"> Shipping Cost: {shipping()}$</h5>
            <h5 className="my-2 fs-1 ms-4"> 
            <b>
              
               Total Price: {finalPrice()}$
              </b>
               </h5>
            {/* {products.pcs === 0 ? (
              <h4 className="out-stock fs-3 text-danger">Out From Stock</h4>
            ) : products.pcs > 0 && products.pcs <= 10 ? (
              <h4 className="stock fs-3">Almost Over</h4>
            ) : (
              <h4 className="in-stock text-success fs-3">In Stock</h4>
            )} */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Buy Now
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setInfoPriceArr(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelCart;
