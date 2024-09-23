import React from "react";
import "./Footer.scss";

export function Footer(): React.ReactElement {
  return (
    <footer className="footer">
      <div>
        <a href="https://hackbox.microsoft.com/hackathons/hackathon2024/project/61190" target="_blank"><img src="slogan.png" alt="CareerCraft is a Microsoft Hackathon project" className="ms-nav-logo" /></a>
        {/* <a href="https://hackbox.microsoft.com/hackathons/hackathon2024/project/61190" target="_blank"><img src="/Click_to_vote_button.png" alt="CareerCraft Vote Button" className="vote-logo" /></a> */}
      </div>
    </footer>
  );
}
