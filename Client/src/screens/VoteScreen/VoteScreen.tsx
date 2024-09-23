import React from "react";
import { H1 } from "../../components/Typography";
import { H2 } from "../../components/Typography";
import { usePageTracking } from "../../hooks/usePageTracking";

export function VoteScreen(): React.ReactElement {
    usePageTracking("VoteScreen");

    return (
        <div>
            <H1>Vote here!</H1>
            <div className="game-screen-margin-top">
                <H2>Why vote for us?</H2>
                <p>
                    Vote for CareerCraft in this year's Hack for Good!
                    Our project is an interactive platform designed to
                    empower adults with disabilities by helping them
                    explore careers and build essential skills through
                    engaging stories and scenarios. We believe
                    CareerCraft can make a lasting impact in supporting
                    meaningful career exploration. Your vote can help
                    make this vision a reality—support us in creating a
                    tool that fosters learning and opportunity for all!
                    Click or tap the button below to cast your vote.
                </p>
                <div className="game-screen-margin-top">
                </div>
                <div className="game-screen-margin-top">
                    <a href="https://hackbox.microsoft.com/hackathons/hackathon2024/project/61190" target="_blank"><img src="/Click_to_vote_button.png" alt="CareerCraft Vote Button" className="vote-logo" /></a>
                </div>
            </div>
        </div>
    );
}
