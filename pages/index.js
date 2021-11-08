/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";

import { getData } from "../utils/fetchData";
import ProductItem from "../components/ProductItem";
import filterSearch from "../utils/filterSearch";
import { useRouter } from "next/router";
import Filter from "../components/Filter";

export default function Home(props) {
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
    <div className="container m-0 p-0">
      {/*  ---------------------------------- women and men clothes secction ------------------------------------ */}
      <section className="upper-container">
        <div className="fila1">
          <Link id="btn_view" href="/women-products">
            <a className="imagen">
              <img
                src="https://res.cloudinary.com/abmontero/image/upload/v1632349547/fdsFolder/ujwjri1zimwbxgbtlqxp.jpg"
                alt="ropa de mujer"
              />
              <div className="box">
                <h4 className="text-center">NUEVA COLECCION - ROPA DE MUJER</h4>
                <p> Descúbrelo ahora</p>
              </div>
            </a>
          </Link>
        </div>
        <div className="fila1">
          <Link id="btn_view" href="/men-products">
            <a>
              <img
                src="https://res.cloudinary.com/abmontero/image/upload/v1632349530/fdsFolder/yznvssjohkp47ecd619f.jpg"
                alt="ropa de hombre"
              />
              <div className="box">
                <h4 className="text-center">
                  NUEVA COLECCION - ROPA DE HOMBRE
                </h4>
                <p> Descúbrelo ahora</p>
              </div>
            </a>
          </Link>
        </div>
      </section>

      {/*  ---------------------------------- accesories, fabric and children clothes secction ------------------------------------ */}
      <section className="bottom-container">
        <div className="fila2">
          <Link href="/boys-girls-products">
            <a>
              <img
                src="https://res.cloudinary.com/abmontero/image/upload/v1632360709/qb75lmm323hwopzfmtrx.png"
                alt="imagen de ropa de niños y niñas"
              />

              <div className="box">
                <h5 className="text-center">
                  NUEVA COLECCION - ROPA NIÑAS Y NIÑOS
                </h5>
                <p> Descúbrelo ahora</p>
              </div>
            </a>
          </Link>
        </div>
        <div className="fila2">
          <Link href="/fabrics-products">
            <a>
              <img
                src="https://res.cloudinary.com/abmontero/image/upload/v1630708098/fdsFolder/sl9rdlzqppo4wvb4maan.png"
                alt="imagen de telas"
              />

              <div className="box">
                <h5 className="text-center">NUEVA COLECCION - TELAS</h5>
                <p> Descúbrelo ahora</p>
              </div>
            </a>
          </Link>
        </div>
        <div className="fila2">
          <Link href="/accesories-products">
            <a>
              <img
                src="https://res.cloudinary.com/abmontero/image/upload/v1632361558/vau8opd6oqjgtsdbjbfq.png"
                alt="imagen de accesorios"
              />

              <div className="box">
                <h5 className="text-center">NUEVA COLECCION - Accesorios</h5>
                <p> Descúbrelo ahora</p>
              </div>
            </a>
          </Link>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS ROPA MUJERES */}
      <h2 className="title">PRODUCTOS DESTACADOS - ROPA DE DAMAS</h2>

      <div className="products">
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) =>
            product.featured === true && product.gender === "damas" ? (
              <ProductItem key={product._id} product={product} />
            ) : (
              ""
            )
          )
        )}
      </div>

      {/* PRODUCTOS DESTACADOS  HOMBRES */}
      <h2 className="title">PRODUCTOS DESTACADOS - ROPA DE CABALLEROS</h2>
      <div className="products">
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) =>
            product.featured === true && product.gender === "caballeros" ? (
              <ProductItem key={product._id} product={product} />
            ) : (
              ""
            )
          )
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await getData("home-page");

  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}
