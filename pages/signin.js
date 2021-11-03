import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Signin() {
  return (
    <div>
      <Head>
        <title>Sign in page</title>
      </Head>

      <form className="mx-auto my-4" style={{ maxWidth: "500px" }}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We all never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        <p className="my-2">
          You do not have an account?{" "}
          <Link href="/register">
            <a style={{ color: "crimson" }}>Register Now</a>
          </Link>
        </p>
      </form>
    </div>
  );
}
