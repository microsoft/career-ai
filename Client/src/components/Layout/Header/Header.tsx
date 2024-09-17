import React from "react";
import "./Header.scss";

export function Header(): React.ReactElement {
  return (
    <header className="header-root">
      <a href="/" title="Go to CareerCraft home page" className="brand-link">
        <div className="brand">
          <img
            src="Flat_logo_linear.png"
            // src="CareerCraft_logo_white_no_border_with_slogan_large.png"
            alt="CareerCraft logo"
            className="header-logo"
          />
        </div>
      </a>
    </header>
  );
}
