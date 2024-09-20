import React from "react";
import { H1 } from "../../components/Typography";
import { H2 } from "../../components/Typography";
import { usePageTracking } from "../../hooks/usePageTracking";

export function ContactUsScreen(): React.ReactElement {
  usePageTracking("ContactUsScreen");

  return (
    <div>
      <H1>Contact Us</H1>
      <p>We're here to assist you every step 
        of the way! Whether you have questions, 
        need support, or simply want to share 
        your thoughts, we encourage you to 
        contact us. Your feedback is crucial, 
        and we're eager to hear your ideas, 
        suggestions, or just to chat about your 
        gaming experiences. Reach out with 
        confidence knowing your voice matters to 
        us. We're not just listening; we're 
        ready to engage and enhance your journey 
        with us.</p>
      <div className="game-screen-margin-top">
        <H2>Email: <a className="contact-link" href="mailto:awillman@microsoft.com">awillman@microsoft.com</a></H2>
      </div>
    </div>
  );
}
