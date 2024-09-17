import React from "react";
import "./LeftNav.scss";
import { Link } from "react-router-dom";

export function LeftNav(): React.ReactElement {
  return (
    <aside className="nav-root">
      <nav>
        <img
          src="Flat_logo_linear.png"
          alt="CareerCraft logo"
          className="nav-logo"
        />
        <ul>
          <li className="left-nav-items">
            <Link to="/" title="Go to CareerCraft About Us page">
              About Us
            </Link>
          </li>
          <li className="left-nav-items">
            <Link to="/admin" title="Go to CareerCraft admin page">
              Admin
            </Link>
          </li>
        </ul>
      </nav>
      {/* <img
          src="slogan.png"
          alt="CareerCraft logo"
          className="ms-nav-logo"
        /> */}
    </aside>
  );
}
