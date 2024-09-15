import React from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";

export function Nav(): React.ReactElement {
  return (
    <aside className="nav-root">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
