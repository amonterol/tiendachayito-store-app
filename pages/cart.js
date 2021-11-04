import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import CartItem from "../components/CartItem";
import { useRouter } from "next/router";

export default function Cart() {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const [total, setTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  const [callback, setCallback] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(res);
    };

    getTotal();
  }, [cart]);

  if (cart.length === 0) {
    return <h2> You cart is empty</h2>;
  } else {
    return (
      <div className="row mx-auto">
        <Head>
          <title>Cart Page</title>
        </Head>

        <div className="col-md-8 text-secondary table-responsive my-3">
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

        <div className="col-md-4 my-3 text-right text-uppercase text-secondary">
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

          <h3>
            Total: <span className="text-danger">${total}</span>
          </h3>

          <Link href={auth.user ? "#!" : "/signin"}>
            <a className="btn btn-dark my-2" /* onClick={handlePayment} */>
              Proceed with payment
            </a>
          </Link>
        </div>
      </div>
    );
  }
}
