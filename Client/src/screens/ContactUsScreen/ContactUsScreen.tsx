import React from "react";
import { usePrompts } from "../../hooks/usePrompts";
import { TextField } from "../../components/Form/TextField/TextField";
import { H1 } from "../../components/Typography";
import { ButtonBar } from "../../components/Form/Button/ButtonBar";
import { PrimaryButton } from "../../components/Form/Button";
import { DefaultButton } from "../../components/Form/Button/DefaultButton";
import { usePageTracking } from "../../hooks/usePageTracking";
import { Spinner } from "../../components/Spinner";

export function ContactUsScreen(): React.ReactElement {
  usePageTracking("ContactUsScreen");
  const [prompt, setPrompt, savePrompts, reloadPrompts, isLoading] =
    usePrompts();

  const handlePromptUpdated = (name: string, value: string) => {
    setPrompt({ ...prompt, [name]: value });
  };

  return (
    <>
      <H1>Contact Us</H1>

      <p>
      Contact Info <br></br>
      </p>

      <Spinner show={isLoading} />
    </>
  );
}
