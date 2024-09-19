import React from "react";
import { usePrompts } from "../../hooks/usePrompts";
import { H1 } from "../../components/Typography";
import { usePageTracking } from "../../hooks/usePageTracking";
import "../../Pages.css"; // Importing a new CSS file for custom styling

export function ContactUsScreen(): React.ReactElement {
  usePageTracking("ContactUsScreen");
    usePrompts();

  return (
    <div className="contact-container">
      <H1>Contact Us</H1>

      <div className="contact-info">
        <p>Email: <a href="mailto:awillman@microsoft.com">awillman@microsoft.com</a></p>
      </div>

    </div>
  );
}

