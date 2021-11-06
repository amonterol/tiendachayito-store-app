import React from "react";
import NavBar2 from "./NavBar2";
import Notify from "./Notify";
import Modal from "./Modal";
import TopNavBar from "./TopNavBar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <TopNavBar />
      <div className="container">
        <NavBar2 />
        <Notify />
        <Modal />
        {children}
      </div>
      <Footer />
    </>
  );
}
