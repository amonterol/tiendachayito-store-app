import Head from "next/head";
import { useState, useEffect } from "react";

import { getData } from "../../utils/fetchData";
import ProductItem from "../../components/ProductItem";
import filterSearch from "../../utils/filterSearch";
import { useRouter } from "next/router";

const WomenProducts = (props) => {
  const [products, setProducts] = useState(props.products);

  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };

  return (
    <div className="home_page">
      <Head>
        <title>Women Page</title>
      </Head>

      <div className="products">
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) =>
            product.gender === "damas" ? (
              <ProductItem key={product._id} product={product} />
            ) : (
              ""
            )
          )
        )}
      </div>

      {props.result < page * 6 ? (
        ""
      ) : (
        <button
          className="btn btn-outline-info d-block mx-auto mb-4"
          onClick={handleLoadmore}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await getData("women-products");

  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}
export default WomenProducts;
