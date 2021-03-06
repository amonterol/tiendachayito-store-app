/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";

export default function NavBar2() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("__tienda__chayito__cart01");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
    return router.push("/");
  };

  const adminRouter = () => {
    return (
      <>
        <Link href="/users">
          <a className="dropdown-item">Users</a>
        </Link>
        <Link href="/create">
          <a className="dropdown-item">Create Product</a>
        </Link>
        <Link href="/categories">
          <a className="dropdown-item">Categories</a>
        </Link>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          {auth.user.name}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link href="/account">
            <a className="dropdown-item">Account</a>
          </Link>
          {auth.user.role === "admin" && adminRouter()}
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </li>
    );
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ background: "white" }}
    >
      {/*       <Link href="/">
        <a
          className="navbar-brand m-0 p-0"
          style={{
            background: "white",
            color: "#23a646",
            fontSize: "2.5rem",
            fontWeight: "500",
          }}
        >
          TIENDA CHAYITO{" "}
        </a>
      </Link> */}

      <Link href="/">
        <a className="navbar-brand m-0 p-0" style={{ background: "white" }}>
          <img
            src="https://res.cloudinary.com/abmontero/image/upload/v1636401273/test/jcxo28vztougsdzvsuhc.png"
            alt="Tienda Chayito"
            width="180px"
            height="125px"
          />
        </a>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavDropdown"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/product">
              <a className={"nav-link" + isActive("/product")}>Productos</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/women-products">
              <a className={"nav-link" + isActive("/women-products")}>Damas</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/men-products">
              <a className={"nav-link" + isActive("/men-products")}>
                Caballeros
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/girls-products">
              <a className={"nav-link" + isActive("/girls-products")}>Ni??as</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/boys-products">
              <a className={"nav-link" + isActive("/boys-products")}>Ni??os</a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/accesories-products">
              <a className={"nav-link" + isActive("/accesories-products")}>
                Accesorios
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/fabrics-products">
              <a className={"nav-link" + isActive("/fabrics-products")}>
                Telas
              </a>
            </Link>
          </li>
          <li className="nav-item" style={{ marginRight: "2.5rem" }}>
            <Link href="/uniform-products">
              <a className={"nav-link" + isActive("/uniform-products")}>
                Uniformes
              </a>
            </Link>
          </li>

          {(Object.keys(auth).length === 0 || auth.user.role !== "admin") && (
            <li className="nav-item">
              <Link href="/cart">
                <a className={"nav-link" + isActive("/cart")}>
                  <i
                    className="fas fa-shopping-cart position-relative"
                    aria-hidden="true"
                  >
                    <span
                      className="position-absolute"
                      style={{
                        padding: "3px 6px",
                        background: "#ed143dc2",
                        borderRadius: "50%",
                        top: "-10px",
                        right: "-10px",
                        color: "white",
                        fontSize: "14px",
                      }}
                    >
                      {cart.length}
                    </span>
                    Cart
                  </i>
                </a>
              </Link>
            </li>
          )}
          {Object.keys(auth).length === 0 ? (
            <li className="nav-item">
              <Link href="/signin">
                <a className={"nav-link" + isActive("/signin")}>
                  <i className="fas fa-user" aria-hidden="true"></i> Sign in
                </a>
              </Link>
            </li>
          ) : (
            loggedRouter()
          )}
        </ul>
      </div>
    </nav>
  );
}
