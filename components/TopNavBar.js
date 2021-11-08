import React from "react";
import Link from "next/link";

export default function TopNav() {
  return (
    <>
      <div
        className="d-flex justify-content-between"
        style={{ background: "#0c71a5" }}
      >
        <div>
          <ul className="nav justify-content-center">
            <li className="nav-item pr-0">
              <Link href="mailto:info@tiendachayito.com">
                <a
                  className="nav-link"
                  style={{
                    maxHeight: "30px",
                    color: "black",
                  }}
                >
                  <i className="far fa-envelope" aria-hidden="true"></i>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="mailto:tiendachayitosaraguez@gmail.com">
                <a
                  className="nav-link pl-0"
                  style={{ maxHeight: "30px", color: "black" }}
                >
                  <span style={{ color: "black" }}>
                    tiendachayitosaraguez@gmail.com
                  </span>
                </a>
              </Link>
            </li>
            <li className="nav-item mt-2">
              <i
                className="fas fa-phone pr-2"
                aria-hidden="true"
                style={{
                  maxHeight: "15px",
                  color: "black",
                }}
              ></i>
              <span>2453-2711 | 8496-6773</span>
            </li>
          </ul>
        </div>

        <div>
          <ul className="nav justify-content-center ">
            <li className="nav-item ">
              <Link
                href="https://fb.com/templatemo"
                target="_blank"
                rel="noreferrer"
              >
                <a className="nav-link m-0 pl-1 pr-1 ">
                  <i
                    className="fab fa-facebook-f "
                    aria-hidden="true"
                    style={{ maxHeight: "30px", color: "black" }}
                  ></i>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <a className="nav-link pl-1 pr-1 ">
                  <i
                    className="fab fa-instagram "
                    aria-hidden="true"
                    style={{ maxHeight: "30px", color: "black" }}
                  ></i>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
              >
                <a className="nav-link pl-1 pr-1">
                  <i
                    className="fab fa-twitter"
                    aria-hidden="true"
                    style={{ maxHeight: "30px", color: "black" }}
                  ></i>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="https://web.whatsapp.com/"
                target="_blank"
                rel="noreferrer"
              >
                <a className="nav-link pl-1 pr-1">
                  <i
                    className="fab fa-whatsapp "
                    aria-hidden="true"
                    style={{ maxHeight: "30px", color: "black" }}
                  ></i>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
