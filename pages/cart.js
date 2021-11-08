import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import CartItem from "../components/CartItem";
import { getData, postData } from "../utils/fetchData";
import { useRouter } from "next/router";

export default function Cart() {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, orders } = state;

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);

  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [distrito, setDistrito] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [callback, setCallback] = useState(false);
  const router = useRouter();

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  useEffect(() => {
    const getSubTotal = () => {
      const subTotal = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setSubTotal(financial(subTotal));
    };

    getSubTotal();
  }, [cart]);

  useEffect(() => {
    const getTax = () => {
      const tax = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity * 0.13;
      }, 0);

      setTax(financial(tax));
    };

    getTax();
  }, [cart]);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return (
          prev + item.price * item.quantity * 0.13 + item.price * item.quantity
        );
      }, 0);

      setTotal(financial(total));
    };

    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(
      localStorage.getItem("__tienda__chayito__cart01")
    );
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`);
          const { _id, title, images, price, stock, sold } = res.product;
          if (stock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price,
              stock,
              sold,
              quantity: item.quantity > stock ? 1 : item.quantity,
            });
          }
        }

        dispatch({ type: "ADD_CART", payload: newArr });
      };

      updateCart();
    }
  }, [callback, dispatch]);

  const handlePayment = async () => {
    if (!auth.user)
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: "Por favor inicie sesión para poder adquirir productos.",
        },
      });

    if (!provincia)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Por favor agregue la provincia." },
      });
    if (!canton)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Por favor agregue el cantón." },
      });
    if (!distrito)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Por favor agregue el distrito." },
      });
    if (!address)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Por favor agregue la dirección de envío." },
      });
    if (!phone)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Por agregue el número de teléfono de contacto." },
      });

    let newCart = [];
    for (const item of cart) {
      const res = await getData(`product/${item._id}`);
      if (res.product.stock - item.quantity >= 0) {
        newCart.push(item);
      }
    }

    if (newCart.length < cart.length) {
      setCallback(!callback);
      return dispatch({
        type: "NOTIFY",
        payload: {
          error:
            "La cantidad disponible de producto no es suficiente, por favor contáctenos.",
        },
      });
    }

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    auth.user
      ? postData(
          "order",
          { provincia, canton, distrito, address, phone, cart, total },
          auth.token
        ).then((res) => {
          if (res.err)
            return dispatch({ type: "NOTIFY", payload: { error: res.err } });

          dispatch({ type: "ADD_CART", payload: [] });

          const newOrder = {
            ...res.newOrder,
            user: auth.user,
          };
          dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder] });
          dispatch({ type: "NOTIFY", payload: { success: res.msg } });
          return router.push(`/order/${res.newOrder._id}`);
        })
      : null;
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ minHeight: "60vh" }}>
        <h2> You cart is empty</h2>;
      </div>
    );
  } else {
    return (
      <div className="row mx-auto" style={{ minHeight: "60vh" }}>
        <Head>
          <title>Cart Page</title>
        </Head>

        <div className="col-md-8  table-responsive my-3">
          <h2 className=" text-capitalize">Carrito de compras</h2>

          <table className="table my-3">
            <tbody>
              {cart.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  dispatch={dispatch}
                  cart={cart}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-4 my-3 text-center text-capitalize ">
          <form>
            <h2>Envío</h2>

            <input
              type="text"
              name="provincia"
              id="provincia"
              className="form-control mb-2"
              placeholder="Provincia"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
            />
            <input
              type="text"
              name="canton"
              id="canton"
              className="form-control mb-2"
              placeholder="Cantón"
              value={canton}
              onChange={(e) => setCanton(e.target.value)}
            />

            <input
              type="text"
              name="distrito"
              id="distrito"
              className="form-control mb-2"
              placeholder="Distrito"
              value={distrito}
              onChange={(e) => setDistrito(e.target.value)}
            />

            <input
              type="text"
              name="address"
              id="address"
              className="form-control mb-2"
              placeholder="Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              type="text"
              name="phone"
              id="phone"
              className="form-control mb-2"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </form>
          <h4 className="text-dark  text-capitalize text-left mt-5 ml-0 pl-0">
            Subtotal: <span>₡{subTotal}</span>
          </h4>
          <h4 className="text-dark  text-capitalize text-left ml-0 pl-0 ">
            Tax: <span className="ml-5  pl-2">₡{tax}</span>
          </h4>

          <h4 className="text-dark  text-capitalize text-left ml-0 pl-0">
            Total: <span className="ml-4 pl-3">₡{total}</span>
          </h4>
          <h1
            className="justify-content-center"
            style={{ marginLeft: "2rem", marginRight: "2rem" }}
          >
            <Link href={auth.user ? "#!" : "/signin"}>
              <a
                className="btn btn-primary my-5 justify-content-start"
                onClick={handlePayment}
                style={{ marginLeft: "2rem", marginRight: "2rem" }}
              >
                Proceed with payment
              </a>
            </Link>
          </h1>
        </div>

        <div
          style={{
            borderStyle: "groove",
            padding: "1rem",
          }}
        >
          <h4 className="text-dark text-capitalize">
            Terminos y condiciones de envío
          </h4>
          <p>Correos de Costa Rica 1 - 3 dias hábiles</p>
          <p>
            El servicio de entrega a su domicilio, abarca todo el territorio
            nacional con acceso adecuado vía terrestre, (dentro o fuera del Área
            Metropolitana) y sus precios varían dependiendo el lugar donde se
            realice la entrega y este monto será especificado en la factura de
            cobro. Los pagos realizados por los servicios de envío no están
            sujetos a devolución.
          </p>
        </div>
      </div>
    );
  }
}
