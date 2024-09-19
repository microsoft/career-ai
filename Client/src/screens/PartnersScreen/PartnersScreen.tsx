import React from "react";
import { usePrompts } from "../../hooks/usePrompts";
import { TextField } from "../../components/Form/TextField/TextField";
import { H1, H2 } from "../../components/Typography";
import { ButtonBar } from "../../components/Form/Button/ButtonBar";
import { PrimaryButton } from "../../components/Form/Button";
import { DefaultButton } from "../../components/Form/Button/DefaultButton";
import { usePageTracking } from "../../hooks/usePageTracking";
import { Spinner } from "../../components/Spinner";
import "../../Pages.css"; // Importing a new CSS file for custom styling

export function PartnersScreen(): React.ReactElement {
  usePageTracking("PartnersScreen");
  const [prompt, setPrompt, savePrompts, reloadPrompts, isLoading] =
    usePrompts();

  const handlePromptUpdated = (name: string, value: string) => {
    setPrompt({ ...prompt, [name]: value });
  };

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
              jobs.
            </p>
          </li>
          <li className="partner-item">
            <H2>Microsoft</H2>
            <p className="partner-description">
              The Hackathon is an annual event at Microsoft where employees
              collaborate on innovative projects that solve real-world problems.
            </p>
          </li>
        </ul>
      </div>

      <Spinner show={isLoading} />
    </>
  );
}
