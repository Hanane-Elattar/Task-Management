import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-secondary mb-4">
      <div className="container d-flex justify-content-center">
        <a className="navbar-brand text-center fs-3 fw-bold text-white mt-4" href="/">
          Task Management
        </a>
      </div>
    </nav>
  );
}
