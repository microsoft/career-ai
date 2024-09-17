import React from "react";
import "./Header.scss";

export function Header(): React.ReactElement {
  return (
    <header className="header-root">
      <a href="/" title="Go to CareerCraft home page" className="brand-link">
        <div className="brand">CareerCraft</div>
      </a>
    </header>
  );
}
