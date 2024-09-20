import React from "react";
import { H1 } from "../../components/Typography";
import { H2 } from "../../components/Typography";
import { usePageTracking } from "../../hooks/usePageTracking";

export function ContactUsScreen(): React.ReactElement {
  usePageTracking("ContactUsScreen");

  return (
    <div>
      <H1>Contact Us</H1>
      <div className="game-screen-margin-top">
        <H2>Email: <a href="mailto:awillman@microsoft.com">awillman@microsoft.com</a></H2>
      </div>
    </div>
  );
}
