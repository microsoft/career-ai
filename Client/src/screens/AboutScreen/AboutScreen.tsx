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
        <H2>Career Craft</H2>
        <p className="section-description">
          Career Craft provides a safe, simulated environment where users can
          explore different career paths. For each career chosen, users are
          presented with scenarios specific to that profession. Each scenario
          provides three choices, and the user's decisions influence their
          career trajectory in the app.
        </p>
      </section>

      <section className="team-section">
        <H2>The Team</H2>
        <ul className="team-list">
          <li className="team-member">
            <strong>Augustus Willman</strong> - <span className="team-description">Lead Developer. Augustus has 10 years of experience in full-stack development and is passionate about creating impactful web applications.</span>
          </li>
          <li className="team-member">
            <strong>Wong Song</strong> - <span className="team-description">UX/UI Designer. Wong specializes in designing intuitive interfaces that focus on user experience and accessibility.</span>
          </li>
          <li className="team-member">
            <strong>Ryan Pethel</strong> - <span className="team-description">Backend Engineer. Ryan is a master in database management and building robust server-side logic.</span>
          </li>
          <li className="team-member">
            <strong>David Berquist</strong> - <span className="team-description">Backend Engineer. Ryan is a master in database management and building robust server-side logic.</span>
          </li>
          <li className="team-member">
            <strong>Giovanni Ferioli</strong> - <span className="team-description">Frontend Engineer. Giovanni brings creativity to the team, focusing on dynamic and responsive front-end designs.</span>
          </li>
          <li className="team-member">
            <strong>Carlos Rodriguez</strong> - <span className="team-description">Product Manager. Carlos ensures that the team’s projects are aligned with user needs and business goals.</span>
          </li>
        </ul>



      </section>

      <Spinner show={isLoading} />
    </div>
  );
}
