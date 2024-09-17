import React from "react";
import "./Footer.scss";

export function Footer(): React.ReactElement {
  return (
    <footer className="footer">
      <div>
        <img
          src="Microsoft.png"
          alt="Microsoft logo"
          className="footer-logo"
        />
      </div>
    </footer>
  );
}
