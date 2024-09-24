import json

from uuid import uuid4
from time import time

from pydantic import BaseModel, Field


class CareerGame:
    def __init__(self, game_prompts, message_history, open_ai, telemetry, logger):
        self.game_prompts = game_prompts
        self.message_history = message_history
        self.open_ai = open_ai
        self.career_image = None
        self.telemetry = telemetry
        self.logger = logger

    def update_prompts(self, game_prompts):
        self.logger.debug("Updating game prompts to: {}".format(game_prompts))
        self.game_prompts = game_prompts

    def get_current_prompts(self):
        return self.game_prompts

    def start_game(self, career_choice):
        self.logger.debug(
            "Starting new game with career choice: {}".format(career_choice)
        )
        conversation_id = str(uuid4())
        self.logger.debug("NewGameStarted", {"conversationId": conversation_id})
        self.message_history.append_system_message(
            conversation_id, self.game_prompts["preGamePrompt"]
        )
        self.message_history.append_user_message(
            conversation_id,
            self.game_prompts["userResponsePrompt"].format(career_choice),
        )
        self.career_image = self.open_ai.make_dall_e_request(career_choice)
        return self.__process_game__(conversation_id, response_model=Rounds)

    def continue_game(self, conversation_id, user_choice):

        self.message_history.append_user_message(
            conversation_id, self.game_prompts["userResponsePrompt"].format(user_choice)
        )

        return self.__process_game__(
            conversation_id=conversation_id, response_model=Rounds
        )

    def complete_game(self, conversation_id, user_choice):
        self.message_history.append_user_message(
            conversation_id, self.game_prompts["postGamePrompt"].format(user_choice)
        )

        return self.__process_game__(conversation_id, response_model=Final_page)

    def __process_game__(self, conversation_id, response_model):
        messages = self.message_history.get_messages(conversation_id)
        response = None

        while response is None:
            try:
                open_ai_response = self.open_ai.make_request(
                    messages, response_model=response_model, retries=1
                )
                print("open_ai_response: ", open_ai_response)
                if open_ai_response is None:
                    continue

                response = json.loads(open_ai_response.model_dump_json())
                print(f"response: {response}")
            except Exception as e:
                # TODO: Can we give it a max retries?

                self.telemetry.debug(
                    "RetryingOpenAIChat",
                    {"conversationId": conversation_id, "error": str(e)},
                )
                time.sleep(5)

        self.message_history.append_assistant_message(
            conversation_id, json.dumps(response)
        )

        return {"conversationId": conversation_id, "round": response, "careerImageURL": self.career_image}

    def validate(self, user_choice):
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "validate if the following career choice is valid: "
                        + user_choice,
                    }
                ],
            },
        ]
        open_ai_response = self.open_ai.make_request(
            messages=messages, response_model=ValidCareerChoice, retries=3
        )
        response = json.loads(open_ai_response.model_dump_json())
        print(f"response: {response}")

        return response


class Rounds(BaseModel):
    outcome: str = Field(
        description="The outcome of the previous scenario and some background information if necessary"
    )
    scenario: str = Field(description="The scenario that the user is in.")
    options: list[str] = Field(
        description="The 3 options the user has to choose from. Do not include list formatting just add the string."
    )


class ValidCareerChoice(BaseModel):
    isValid: bool = Field(
        description="Whether the career choice is valid or not. NSFW content is not valid."
    )


class Final_page(BaseModel):
    summary: str = Field("A brief summary of the career game just played")
    lessons: list[str] = Field("All the lessons learned from the career game")
