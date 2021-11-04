import React from "react";
import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";

export default function Cart() {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  if (cart.length === 0) {
    return <h2> You cart is empty</h2>;
  } else {
    return (
      <div>
        <h1>Cart page</h1>
      </div>
    );
  }
}
