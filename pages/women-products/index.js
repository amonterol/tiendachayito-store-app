import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { getData } from "../../utils/fetchData";
import ProductItem from "../../components/ProductItem";
import filterSearch from "../../utils/filterSearch";
import { useRouter } from "next/router";
import Filter from "../../components/Filter";

const WomenProducts = (props) => {
  const [products, setProducts] = useState(props.products);

  const [page, setPage] = useState(1);

  const { state, dispatch } = useContext(DataContext);

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
        <title>Home Page</title>
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

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res = await getData(
    `product?limit=${
      page * 6
    }&category=${category}&sort=${sort}&title=${search}`
  );
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default WomenProducts;
