import Link from "next/link";
import Image from "next/image";
import Logo from "./icons/foto.png";

const ProductItem = ({ product }) => {
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
          disabled={product.inStock === 0 ? true : false}
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Buy
        </button>
      </>
    );
  };

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <Image
          className="card-img-top"
          src={Logo}
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
