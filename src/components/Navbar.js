import React from "react";

function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg">
    <div className="container">
      <h2 className="navbar-h2">Red-Positive</h2>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end links" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link active navbar-links" aria-current="page" href="\#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link navbar-links" href="\#">Add</a>
          </li>
          <li className="nav-item">
            <a className="nav-link navbar-links" href="\#">Data</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    );
}

export default Navbar