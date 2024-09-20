import React from "react";
import { H1 } from "../../components/Typography";
import { H2 } from "../../components/Typography";
import { usePageTracking } from "../../hooks/usePageTracking";

export function AboutScreen(): React.ReactElement {
  usePageTracking("AboutScreen");

  return (
    <div>
      <H1>About Us</H1>
      <div className="game-screen-margin-top">
        <H2>Mission</H2>
        <p>
          To empower people with disabilities and the nonprogits that serve them by providing technology, resources and tools that open the door
          to career exploration and support the journey towards meaningful employment.
        </p>
      </div>
      <div className="game-screen-margin-top">
        <H2>Gamify AI</H2>
        <p>
          We partnered with NW Works to build and app that provides a safe, low-risk environment for people with disabilities
          to explore career options and gain valuable skillsets to support their mission to empower individuals with disabilities
          in securing and sustaining meaningful employment.
        </p>
      </div>
      <div className="game-screen-margin-top">
        <H2>Our Team</H2>
        <ul>
          <li className="team-member"><p>Augustus Willman - Accessibility</p></li>
          <li className="team-member"><p>Won Song - Front End Development</p></li>
          <li className="team-member"><p>David Berquist - AI Development</p></li>
          <li className="team-member"><p>Ryan Pethel - Front End Development</p></li>
          <li className="team-member"><p>Giovanni Ferioli - Back End Development</p></li>
          <li className="team-member"><p>Carlos Rodriguez - Back End Development</p></li>
          <li className="team-member"><p>Michelle Jones - Project Support</p></li>
          <li className="team-member"><p>Teresa Wong - Accessibility</p></li>
          <li className="team-member"><p>Tricia McIntosh - Project Support</p></li>
          <li className="team-member"><p>Balinda Moreland - Product Advisor</p></li>
          <li className="team-member"><p>Ryan Johnson - General Development</p></li>
        </ul>
      </div>
    </div>
  );
}