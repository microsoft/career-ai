import React from "react";
import { usePrompts } from "../../hooks/usePrompts";
import { H1, H2 } from "../../components/Typography";
import { usePageTracking } from "../../hooks/usePageTracking";
import { Spinner } from "../../components/Spinner";
import "../../Pages.css"; // Importing a new CSS file for custom styling

export function AboutScreen(): React.ReactElement {
  usePageTracking("AboutScreen");
  const [prompt, setPrompt, savePrompts, reloadPrompts, isLoading] =
    usePrompts();

  const handlePromptUpdated = (name: string, value: string) => {
    setPrompt({ ...prompt, [name]: value });
  };

  return (
    <div className="about-container">
      <H1>About Us</H1>

      <section className="about-section">
        <H2>Mission</H2>
        <p className="section-description">
          To empower people with disabilities and the nonprogits that serve them by providing technology, resources and tools that open the door
          to career exploration and support the journey towards meaningful employment.
        </p>
      </section>

      <section className="about-section">
        <H2>Gamify AI</H2>
        <p className="section-description">
          We partnered with NW Works to build and app that provides a safe, low-risk environment for people with disabilities
          to explore career options and gain valuable skillsets to support their mission to empower individuals with disabilities
          in securing and sustaining meaningful employment.
        </p>
      </section>

      <section className="team-section">
        <H2>The Team</H2>
        <ul className="team-list">
        <li className="team-member">
            <strong>Augustus Willman</strong> - <span className="team-description">Accessibility</span>
          </li>
          <li className="team-member">
            <strong>Won Song</strong> - <span className="team-description">Front End Development</span>
          </li>
          <li className="team-member">
            <strong>David Berquist</strong> - <span className="team-description">AI Development</span>
          </li>
          <li className="team-member">
            <strong>Ryan Pethel</strong> - <span className="team-description">Front End Development</span>
          </li>
          <li className="team-member">
            <strong>Giovanni Ferioli</strong> - <span className="team-description">Back End Development</span>
          </li>
          <li className="team-member">
            <strong>Carlos Rodriguez</strong> - <span className="team-description">Back End Development</span>
          </li>
          <li className="team-member">
            <strong>Michelle Jones</strong> - <span className="team-description">Project Support</span>
          </li>
          <li className="team-member">
            <strong>Teresa Wong</strong> - <span className="team-description">Accessibility</span>
          </li>
          <li className="team-member">
            <strong>Tricia McIntosh</strong> - <span className="team-description">Project Support</span>
          </li>
          <li className="team-member">
            <strong>Balinda Moreland</strong> - <span className="team-description">Product Advisor</span>
          </li>
          <li className="team-member">
            <strong>Ryan Johnson</strong> - <span className="team-description">General Development</span>
          </li>
        </ul>



      </section>

      <Spinner show={isLoading} />
    </div>
  );
}
