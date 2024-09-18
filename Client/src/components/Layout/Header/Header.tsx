import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

export function Header(): React.ReactElement {
  return (
    <header className="header-root">
      <div className="brand-container">
        <Link to="/" title="Go to CareerCraft Home page" className="brand">
          <img
            src="Flat_logo_linear.png"
            alt="CareerCraft logo"
            className="header-logo"
          />
        </Link>
      </div>

      <nav className="nav-container">
        <ul className="nav-list">
          <li className="nav-list-item">
            <Link to="/" title="Go to Career game page">
              Career game
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/" title="Go to CareerCraft About Us page">
              About Us
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/" title="Go to Partners page">
              Partners
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/" title="Go to CareerCraft Contact Us page">
              Contact Us
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/admin" title="Go to CareerCraft admin page">
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
