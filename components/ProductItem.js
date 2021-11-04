import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { addToCart } from "../store/Actions";

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

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

  return (
    <div className="col mt-2">
      <div className="card" style={{ width: "18rem" }}>
        <Image
          className="card-img-top"
          src={product.images.url}
          alt="Card image"
          width="200%"
          height="200%"
        />
        <div className="card-body">
          <h4 className="card-title">{product.title}</h4>
          <p className="card-text">{product.price}.</p>

          <div className="row justify-content-between mx-0">{userLink()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
