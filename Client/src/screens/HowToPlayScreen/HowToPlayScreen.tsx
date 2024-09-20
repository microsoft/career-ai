import React from "react";
import { H1 } from "../../components/Typography";
import { H2 } from "../../components/Typography";
import { usePageTracking } from "../../hooks/usePageTracking";
import { Carousel } from "../../components/Carousel/Carousel";

export function HowToPlayScreen(): React.ReactElement {
    usePageTracking("HowToPlayScreen");

    return (
        <div>
            <H1>How To Play</H1>
            <div className="game-screen-margin-top">
                <H2>Guidance</H2>
                <p>
                    This game helps you explore career options and
                    gain valuable skillsets along the way. To get
                    started, please enter your first name, a career
                    that interests you how many rounds you want to
                    play. Each round will consist of a Scenario and
                    3 Options for you to choose from that will lead
                    to the next Scenario. After all the rounds finish,
                    we will recap the learnings.  Have fun and happy
                    learning! Look for a surprise at the end as well.
                </p>
            </div>
            <div className="game-screen-margin-top">
                <Carousel images={["/game-guide-1.png", "/game-guide-2.png", "/game-guide-3.png", "/game-guide-4.png"]} />
            </div>
        </div>
    );
}
