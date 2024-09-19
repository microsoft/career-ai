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
            <strong>Augustus Willman</strong> - <span className="team-description">Team Leader. Augustus is an over-all badass with a natural skill to charm people, which has been key to the conception of this team. Aside from this he is an awesome musician</span>
          </li>
          <li className="team-member">
            <strong>Wong Song</strong> - <span className="team-description">UX/UI Designer. Wong specializes in designing intuitive interfaces that focus on user experience and accessibility.</span>
          </li>
          <li className="team-member">
            <strong>Ryan Pethel</strong> - <span className="team-description">UX/UI Designer. Playing John to Won's Paul, Ryan has provided some cool visuals to Career Craft's Webapp (confetti, anyone?)</span>
          </li>
          <li className="team-member">
            <strong>David Berquist</strong> - <span className="team-description">Backend Engineer. David is a master in database management and building robust server-side logic.</span>
          </li>
          <li className="team-member">
            <strong>Giovanni Ferioli</strong> - <span className="team-description">Backend Engineer. Giovanni is yet another badass who brings mad skills in backend development and git.</span>
          </li>
          <li className="team-member">
            <strong>Carlos Rodriguez</strong> - <span className="team-description">Fullstack Developer. Carlos is a jack-of-all-trades, messing with both, the fronten and the backend code alike.</span>
          </li>
          <li className="team-member">
            <strong>Michelle</strong> - <span className="team-description"></span>
          </li>
          <li className="team-member">
            <strong>Tricia</strong> - <span className="team-description"></span>
          </li>
        </ul>



      </section>

      <Spinner show={isLoading} />
    </div>
  );
}
