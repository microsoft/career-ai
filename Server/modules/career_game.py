import json

from uuid import uuid4
from time import time

from pydantic import BaseModel, Field


class CareerGame:
    def __init__(self, game_prompts, message_history, open_ai, telemetry, logger):
        self.game_prompts = game_prompts
        self.message_history = message_history
        self.open_ai = open_ai
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

        # self.logger.debug("message history: {}".format(self.message_history))

        return self.__process_game__(conversation_id)

    def continue_game(self, conversation_id, user_choice):
        # self.logger.debug(
        #     "Continuing game with user choice: {}".format(user_choice))
        self.message_history.append_user_message(
            conversation_id, self.game_prompts["userResponsePrompt"].format(user_choice)
        )

        return self.__process_game__(conversation_id)

    def complete_game(self, conversation_id, user_choice):
        self.message_history.append_user_message(
            conversation_id, self.game_prompts["postGamePrompt"].format(user_choice)
        )

        return self.__process_game__(conversation_id)

    def __process_game__(self, conversation_id):
        messages = self.message_history.get_messages(conversation_id)
        # self.logger.debug("Processing game with messages: {}".format(messages))
        response = None

        while response is None:
            try:
                # This seems to sometimes generate 10 scenarios or 1.... need to make the result consistent
                open_ai_response = self.open_ai.make_request(
                    messages, response_model=Rounds, retries=3
                )
                if open_ai_response is None:
                    continue

                response = json.loads(open_ai_response.model_dump_json())
                print(f"response: {response}")
            except Exception as e:
                # Can we give it a max retries?

                self.telemetry.debug(
                    "RetryingOpenAIChat",
                    {"conversationId": conversation_id, "error": str(e)},
                )
                time.sleep(5)

        self.message_history.append_assistant_message(
            conversation_id, json.dumps(response)
        )

        return {"conversationId": conversation_id, "round": response}


class Rounds(BaseModel):
    outcome: str = Field(
        description="The outcome of the previous scenario and some background information if necessary"
    )
    scenario: str = Field(description="The scenario that the user is in.")
    options: list[str] = Field(
        description="The 3 options the user has to choose from. Do not include list formatting just add the string."
    )
