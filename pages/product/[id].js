/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useContext } from "react";
import { getData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import ProductItem from "../../components/ProductItem";

const DetailProduct = (props) => {
  const [product] = useState(props.product);
  const [products] = useState(props.products);

  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);

  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const isActive = (index) => {
    if (tab === index) return " active";
    return "";
  };

  return (
    <div className="row detail_page" style={{ minHeight: "57vh" }}>
      <Head>
        <title>Detail Product</title>
      </Head>

      <div className="col-md-6">
        <img
          src={product.images[tab].url}
          alt={product.images[tab].url}
          className="d-block img-thumbnail rounded mt-4 w-100"
          style={{ height: "600px" }}
        />

        <div className="row mx-0" style={{ cursor: "pointer" }}>
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.url}
              className={`img-thumbnail rounded ${isActive(index)}`}
              style={{ height: "80px", width: "20%" }}
              onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>

      <div className="col-md-6 mt-3 ">
        <h2 className="text-capitalize">{product.title}</h2>
        <div className="text-dark " style={{ fontSize: "1.5rem" }}>
          ${product.price}
        </div>

        <div className="row mx-0 d-flex justify-content-between">
          {product.stock > 0 ? (
            <h6 className="text-danger">In Stock: {product.stock}</h6>
          ) : (
            <h6 className="text-danger">Out Stock</h6>
          )}
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
      <div className=" mt-5 mb-">
        <h2 className="w-100 text-center">Los clientes también ha comprado</h2>
        <div className="products">
          {products.map((prod) => {
            return prod.category === product.category &&
              prod._id !== product._id ? (
              <ProductItem key={prod._id} product={prod} />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id }, query }) {
  const res = await getData(`product/${id}`);

  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res1 = await getData(
    `product?limit=${
      page * 6
    }&category=${category}&sort=${sort}&title=${search}`
  );

  // server side rendering
  return {
    props: {
      product: res.product,
      products: res1.products,
    }, // will be passed to the page component as props
  };
}

export default DetailProduct;
