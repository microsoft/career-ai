import React from "react";
import { usePrompts } from "../../hooks/usePrompts";
import { TextField } from "../../components/Form/TextField/TextField";
import { H1 } from "../../components/Typography";
import { ButtonBar } from "../../components/Form/Button/ButtonBar";
import { PrimaryButton } from "../../components/Form/Button";
import { DefaultButton } from "../../components/Form/Button/DefaultButton";
import { usePageTracking } from "../../hooks/usePageTracking";
import { Spinner } from "../../components/Spinner";

export function AboutScreen(): React.ReactElement {
  usePageTracking("AboutScreen");
  const [prompt, setPrompt, savePrompts, reloadPrompts, isLoading] =
    usePrompts();

  const handlePromptUpdated = (name: string, value: string) => {
    setPrompt({ ...prompt, [name]: value });
  };

  return (
    <>
      <H1>About</H1>

      <p>
      Career Craft provides a safe, simulated environment where users can explore different career paths. <br></br>
      For each career chosen, users are presented with scenarios specific to that profession. <br></br>
      Each scenario provides three choices, and the user's decisions influence their career trajectory in the app.<br></br>
      </p>

      <Spinner show={isLoading} />
    </>
  );
}
