import React from "react";
import "./Nav.scss";

export function Nav(): React.ReactElement {
  return (
    <aside className="nav-root">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
