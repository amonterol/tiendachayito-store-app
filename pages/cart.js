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

  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

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
    if (!address || !mobile)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add your address and mobile." },
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
          error: "The product is out of stock or the quantity is insufficient.",
        },
      });
    }

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    auth.user
      ? postData("order", { address, mobile, cart, total }, auth.token).then(
          (res) => {
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
          }
        )
      : null;
  };

  if (cart.length === 0) {
    return <h2> You cart is empty</h2>;
  } else {
    return (
      <div className="row mx-auto" style={{ minHeight: "60vh" }}>
        <Head>
          <title>Cart Page</title>
        </Head>

        <div className="col-md-8  table-responsive my-3">
          <h2 className="text-uppercase">Shopping Cart</h2>

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

        <div className="col-md-4 my-3 text-right text-capitalize ">
          <form>
            <h2>Shipping</h2>

            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              className="form-control mb-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              className="form-control mb-2"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </form>
          <h4 className="text-dark  text-capitalize text-left ml-0 pl-0">
            Subtotal: <span>₡{subTotal}</span>
          </h4>
          <h4 className="text-dark  text-capitalize text-left ml-0 pl-0 ">
            Tax: <span className="ml-5  pl-2">₡{tax}</span>
          </h4>

          <h4 className="text-dark  text-capitalize text-left ml-0 pl-0">
            Total: <span className="ml-4 pl-3">₡{total}</span>
          </h4>

          <Link href={auth.user ? "#!" : "/signin"}>
            <a className="btn btn-primary my-2" onClick={handlePayment}>
              Proceed with payment
            </a>
          </Link>
        </div>
        <div>
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
