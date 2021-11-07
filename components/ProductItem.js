/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import Image from "next/image";
import React, { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { addToCart } from "../store/Actions";

const ProductItem = ({ product, handleChecks }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            View
          </a>
        </Link>

        <button
          className="btn btn-success"
          style={{ marginLeft: "5px", flex: 1 }}
          disabled={product.stock === 0 ? true : false}
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Buy
        </button>
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <Link href={`create/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            Edit
          </a>
        </Link>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px", flex: 1 }}
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: "",
                  id: product._id,
                  title: product.title,
                  type: "DELETE_PRODUCT",
                },
              ],
            })
          }
        >
          Delete
        </button>
      </>
    );
  };

  return (
    <div className="col mt-2 mb-2">
      <div className="card m-0 p-0" style={{ width: "20rem" }}>
        {auth.user && auth.user.role === "admin" && (
          <input
            type="checkbox"
            checked={product.checked}
            className="position-absolute"
            style={{ height: "20px", width: "20px" }}
            onChange={() => handleCheck(product._id)}
          />
        )}
        <Image
          className=" card-img-top"
          src={product.images[0].url}
          alt={product.images[0].url}
          width="300%"
          height="300%"
        />
        <div className=".card-img-top">
          <h4 className="card-title">{product.title}</h4>
          <h6 className="card-text p-3">Price: ${product.price}</h6>

          <div className="row justify-content-between mx-0">
            {!auth.user || auth.user.role !== "admin"
              ? userLink()
              : adminLink()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
