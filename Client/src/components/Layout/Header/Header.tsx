import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

export function Header(): React.ReactElement {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const handleMobileMenuButtonClicked = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const navContainerClassNames = ["nav-container"];
  if (showMobileMenu) {
    navContainerClassNames.push("show-mobile-menu");
  }

  return (
    <header className="header-root">
      <button
        className="header-mobile-menu"
        title="Toggle menu"
        aria-expanded={showMobileMenu}
        aria-haspopup="menu"
        onClick={handleMobileMenuButtonClicked}
      >
        <div className="header-mobile-bar"></div>
        <div className="header-mobile-bar"></div>
        <div className="header-mobile-bar"></div>
      </button>

      <div className="brand-container">
        <Link to="/" title="Go to CareerCraft Home page" className="brand">
          <img
            src="Flat_logo_linear.png"
            alt="CareerCraft logo"
            className="header-logo"
          />
        </Link>
      </div>

      <nav className={navContainerClassNames.join(" ")}>
        <ul className="nav-list">
          <li className="nav-list-item">
            <Link to="/" title="Go to Career game page">
              Career game
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/howToPlay" title="How to play">
              How to play
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/about" title="Go to CareerCraft About Us page">
              About Us
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/partners" title="Go to Partners page">
              Partners
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/contact" title="Go to CareerCraft Contact Us page">
              Contact Us
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/vote" title="Go to CareerCraft Vote page">
              Vote for us
            </Link>
          </li>
          {/* <li className="nav-list-item">
            <Link to="/admin" title="Go to CareerCraft admin page">
              Admin
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
