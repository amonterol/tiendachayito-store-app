import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-center text-white mt-5 ">
      <div className="container p-4 pb-0">
        {/*  <!-- Section: Social media --> */}
        <section className="mb-4">
          {/*  <!-- Facebook --> */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook-f" aria-hidden="true">
              {" "}
            </i>
          </a>

          {/*  <!-- Twitter --> */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter" aria-hidden="true"></i>
          </a>

          {/* <!-- Google --> */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-google" aria-hidden="true"></i>
          </a>

          {/*  <!-- Instagram --> */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram" aria-hidden="true"></i>
          </a>

          {/*  <!-- Linkedin --> */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-linkedin-in" aria-hidden="true"></i>
          </a>

          {/*   <!-- Github --> */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-github" aria-hidden="true"></i>
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
