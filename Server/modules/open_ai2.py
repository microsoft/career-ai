import openai
import json


class OpenAI2():
    def __init__(self, key, model, telemetry):
        self.model = model
        self.telemetry = telemetry

        openai.api_key = key

    def chat(self, messageContext="", requiredWords=[], number_of_responses=1, attempts=3):
        for i in range(attempts):
            try:
                allResponses = openai.ChatCompletion.create(
                    model=self.model,
                    messages=messageContext,
                    n=number_of_responses
                ).choices
                for response in allResponses:
                    content = response.message['content']
                    try:
                        if type(content) == str and content.startswith("```") and content.endswith("```"):
                            content = content.strip(
                            "```json").strip()
                        content = json.loads(content)
                    except json.JSONDecodeError:
                        continue
                    if all(word in content for word in requiredWords):
                        return content
            except openai.error.OpenAIError as e:
                print(e=f"Attempt {i+1} failed with error: {e}")
                continue
        return None
