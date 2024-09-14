from uuid import uuid4
from time import time


class CareerGame:
    def __init__(self, game_prompts, message_history, open_ai, telemetry):
        self.game_prompts = game_prompts
        self.message_history = message_history
        self.open_ai = open_ai
        self.telemetry = telemetry

    def update_prompts(self, game_prompts):
        self.game_prompts = game_prompts

    def get_current_prompts(self):
        return self.game_prompts

    def start_game(self, career_choice):
        conversation_id = str(uuid4())
        self.telemetry.info("NewGameStarted", {
            "conversationId": conversation_id
        })
        self.message_history.append_system_message(
            conversation_id, self.game_prompts["preGamePrompt"])
        self.message_history.append_user_message(
            conversation_id, self.game_prompts["userResponsePrompt"].format(career_choice))

        return self.__process_game__(conversation_id)

    def continue_game(self, conversation_id, user_choice):
        self.message_history.append_user_message(
            conversation_id, self.game_prompts["userResponsePrompt"].format(user_choice))

        return self.__process_game__(conversation_id)

    def end_game(self, conversation_id):
        raise NotImplementedError

    def __process_game__(self, conversation_id):
        messages = self.message_history.get_messages(conversation_id)
        response = None

        while response is None:
            try:
                # This seems to sometimes generate 10 scenarios or 1.... need to make the result consistent
                open_ai_response = self.open_ai.chat(messages)

                return open_ai_response
            except Exception as e:
                self.telemetry.info("RetryingOpenAIChat", {
                    "conversationId": conversation_id,
                    "error": str(e)
                })
                time.sleep(5)

        self.message_history.append_assistant_message(
            conversation_id, response)

        return {
            conversation_id,
            response,
        }
