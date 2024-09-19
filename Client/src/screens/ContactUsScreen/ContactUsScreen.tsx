import React from "react";
import { usePrompts } from "../../hooks/usePrompts";
import { H1 } from "../../components/Typography";
import { usePageTracking } from "../../hooks/usePageTracking";
import { Spinner } from "../../components/Spinner";
import "../../Pages.css"; // Importing a new CSS file for custom styling

export function ContactUsScreen(): React.ReactElement {
  usePageTracking("ContactUsScreen");
  const [prompt, setPrompt, savePrompts, reloadPrompts, isLoading] =
    usePrompts();

  const handlePromptUpdated = (name: string, value: string) => {
    setPrompt({ ...prompt, [name]: value });
  };

  return (
    <div className="contact-container">
      <H1>Contact Us</H1>

      <div className="contact-info">
        <p>Email: <a href="mailto:info@nwworks.com">info@nwworks.com</a></p>
        <p>Phone: <a href="tel:540-667-0809">540-667-0809</a></p>
        <p>Address: 3085 Shawnee Drive, Winchester, VA 22601</p>
      </div>

      <Spinner show={isLoading} />
    </div>
  );
}

