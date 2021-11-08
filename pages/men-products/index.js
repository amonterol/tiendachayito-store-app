import Head from "next/head";
import { useState } from "react";

import { getData } from "../../utils/fetchData";
import ProductItem from "../../components/ProductItem";

const MenProducts = (props) => {
  const [products, setProducts] = useState(props.products);

  return (
    <div className="home_page">
      <Head>
        <title>Men Page</title>
      </Head>

      <div className="products">
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) =>
            product.gender === "caballeros" ? (
              <ProductItem key={product._id} product={product} />
            ) : (
              ""
            )
          )
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await getData("men-products");

  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default MenProducts;
