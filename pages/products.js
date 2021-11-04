import Head from "next/head";
import React, { useState } from "react";
import { getData } from "../utils/fetchData";
import ProductItem from "../components/ProductItem";

const Products = (props) => {
  const [products, setProducts] = useState(props.products);
  return (
    <div className="products">
      <Head>
        <title>Products User Page</title>
      </Head>

      {products.length === 0 ? (
        <h2>No Products</h2>
      ) : (
        products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const res = await getData("products");

  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default Products;
