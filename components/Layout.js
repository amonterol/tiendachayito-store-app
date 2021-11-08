import React from "react";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";
import TopNavBar from "./TopNavBar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <TopNavBar />
      <div className="container mb-5">
        <NavBar />
        <Notify />
        <Modal />
        {children}
      </div>
      <Footer />
    </>
  );
}
