import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Logo from "./icons/logoTienda.png";

export default function NavBar() {
  const router = useRouter();

  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">
          <Image src={Logo} alt="Logo" width="165px" height="80px" />
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
            <Link href="/cart">
              <a className={"nav-link" + isActive("/cart")}>
                <i className="fas fa-shopping-cart" aria-hidden="true">
                  Cart
                </i>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/signin">
              <a className={"nav-link" + isActive("/signin")}>
                <i className="fas fa-user" aria-hidden="true">
                  Sign in
                </i>
              </a>
            </Link>
          </li>

          {/*      <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              User Name
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href="#">
                Profile
              </a>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </div>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}
