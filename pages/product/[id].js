/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import { getData } from "../../utils/fetchData";
import ProductItem from "../../components/ProductItem";

const DetailProduct = (props) => {
  const [product] = useState(props.product);
  const [products] = useState(props.products);

  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  return (
    <div>
      <div className="row detail_page">
        <Head>
          <title>Detail Product</title>
        </Head>
        <div className="col-md-6">
          <img
            src={product.images.url}
            alt=""
            className="d-block img-thumbnail rounded mt-4 w-100"
            style={{ height: "25rem" }}
          />
        </div>

        <div className="col-md-6 mt-3">
          <h2 className="text-uppercase">{product.title}</h2>
          <div className="row mx-0 d-flex justify-content-between">
            <h6 className="text-secondary">#id: {product.product_id}</h6>
            <h6 className=".text-secondary">Brand: {product.brand}</h6>
          </div>

          <h3 className="text-primary">$ {product.price}</h3>
          <div className="row mx-0 d-flex justify-content-between">
            {product.stock > 0 ? (
              <h6 className="text-secondary">In Stock: {product.stock}</h6>
            ) : (
              <h6 className="text-secondary">Out Stock</h6>
            )}
            <h6 className="text-secondary">Sold: {product.sold}</h6>
          </div>
          <div className="my-2">{product.description}</div>
          <div className="my-2">{product.content}</div>

          <button
            type="button"
            className="btn btn-dark d-block my-3 px-5"
            onClick={() => dispatch(addToCart(product, cart))}
          >
            Buy
          </button>
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="text-center">Related products</h2>
        <div className="row mt-5">
          {products.map((prod) => {
            return prod.category === product.category ? (
              <ProductItem key={prod._id} product={prod} />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`products/${id}`);
  const resp = await getData("products");
  // server side rendering
  return {
    props: {
      product: res.product,
      products: resp.products,
    }, // will be passed to the page component as props
  };
}

export default DetailProduct;
