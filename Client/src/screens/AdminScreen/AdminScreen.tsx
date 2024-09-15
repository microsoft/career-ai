import React from "react";
import { usePrompts } from "../../hooks/usePrompts";
import { TextField } from "../../components/Form/TextField/TextField";
import { H1 } from "../../components/Typography";
import { ButtonBar } from "../../components/Form/Button/ButtonBar";
import { PrimaryButton } from "../../components/Form/Button";
import { DefaultButton } from "../../components/Form/Button/DefaultButton";

export function AdminScreen(): React.ReactElement {
  const [prompt, setPrompt, savePrompts, reloadPrompts] = usePrompts();

  const handlePromptUpdated = (name: string, value: string) => {
    setPrompt({ ...prompt, [name]: value });
  };

  return (
    <>
      <H1>Admin</H1>

      <TextField
        label="Pre-game prompt"
        multiline
        name="preGamePrompt"
        onChange={handlePromptUpdated}
        value={prompt.preGamePrompt || ""}
      />

      <TextField
        label="User response prompt"
        multiline
        name="userResponsePrompt"
        onChange={handlePromptUpdated}
        value={prompt.userResponsePrompt || ""}
      />

      <ButtonBar>
        <PrimaryButton
          title="Save prompts"
          onClick={() => {
            savePrompts(prompt);
          }}
        >
          Save
        </PrimaryButton>
        <DefaultButton title="Reset prompts" onClick={reloadPrompts}>
          Reset
        </DefaultButton>
      </ButtonBar>
    </>
  );
}
