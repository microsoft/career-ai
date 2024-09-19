import React from "react";
import { usePrompts } from "../../hooks/usePrompts";
import { H1, H2 } from "../../components/Typography";
import { usePageTracking } from "../../hooks/usePageTracking";
import "../../Pages.css"; // Importing a new CSS file for custom styling

export function PartnersScreen(): React.ReactElement {
  usePageTracking("PartnersScreen");
    usePrompts();

  return (
    <>
    <H1>Our Partners</H1>
      <div className="partners-container">
        <ul className="partners-list">
          <li className="partner-item">
            <H2>NW Works</H2>
            <p className="partner-description">
              Since its founding in 1970, NW Works has been a support system,
              helping adults with disabilities and individuals encountering
              barriers to employment develop skills and find stable, rewarding
              jobs.<br></br>
              <a href="https://www.nwworks.com/">NWW Web</a>
            </p>
          </li>
        </ul>
      </div>

    </>
  );
}
