import Head from "next/head";
import { useState } from "react";
import { getData } from "../../utils/fetchData";
import ProductItem from "../../components/ProductItem";

const AccesoriesProducts = (props) => {
  const [products, setProducts] = useState(props.products);

  return (
    <div className="home_page">
      <Head>
        <title>Telas Page</title>
      </Head>

      <div className="products">
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) =>
            product.gender === "accesorios" ? (
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
  const res = await getData("accesories-products");

  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default AccesoriesProducts;
