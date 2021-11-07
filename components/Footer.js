import React from "react";

export default function Footer() {
  return (
    <footer
      className=" text-center text-white mt-5 "
      style={{ backgroundColor: "#0a4275" }}
    >
      <div className="container p-4 pb-0">
        <section className="mb-4">
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook-f" aria-hidden="true">
              {" "}
            </i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter" aria-hidden="true"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram" aria-hidden="true"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-whatsapp" aria-hidden="true"></i>
          </a>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2021 Copyright:
        <a className="text-white" href="tiendachayitosaraguez@gmail.com">
          TiendaChayito.com
        </a>
      </div>
    </footer>
  );
}
