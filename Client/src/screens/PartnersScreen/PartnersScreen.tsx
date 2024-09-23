import React from "react";
import { H1 } from "../../components/Typography";
import { H2 } from "../../components/Typography";
import { usePageTracking } from "../../hooks/usePageTracking";

export function PartnersScreen(): React.ReactElement {
  usePageTracking("PartnersScreen");

  return (
    <div>
      <H1>Our Partners</H1>
      <div className="game-screen-margin-top">
        <H2>NW Works</H2>
        <p>
          Since its founding in 1970, NW Works has been a support system,
          helping adults with disabilities and individuals encountering
          barriers to employment develop skills and find stable, rewarding
          jobs.
        </p>
        <div className="game-screen-margin-top">

          </div>
          <div className="game-screen-margin-top">
            <H2>Learn More</H2>
            <a href="https://www.nwworks.com/" target="_blank"><img src="/nw-works-logo.png" alt="NW Works Logo" className="nw-works-logo" /></a>
          </div>
      </div>
    </div>
  );
}
