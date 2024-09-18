from flask import Flask
from flask_cors import CORS

from configs.config import Config
from configs.routes import Routes
from modules.message_history import MessageHistory
from modules.career_game import CareerGame
from modules.telemetry import Telemetry
from modules.open_ai2 import OpenAI2


def build_system():
    app = Flask(__name__, static_folder='client', static_url_path='/client')
    Config.load_configs(app)
    if not (app.config["is_production"]):
        CORS(app)

    return app, Telemetry(app.config["appInsightsConnectionString"],
                          "CareerCraftAPI",
                          custom_props={"production": app.config["is_production"]})


def build_game(app, telemetry):
    message_history = MessageHistory()
    scenarios = 10 #This value would be tied to the users selection from the UI, set to 10 for now
    open_ai = OpenAI2(app.config["openAIKey"],
                      app.config["openAIModel"], telemetry, scenarios)
    game_prompts = {
        "preGamePrompt": app.config["preGamePrompt"],
        "userResponsePrompt": app.config["userResponsePrompt"],
    }

    return CareerGame(game_prompts, message_history, open_ai, telemetry)


if __name__ == '__main__':
    app, telemetry = build_system()
    career_game = build_game(app, telemetry)

    Routes.register_game_routes(app, career_game, telemetry)
    Routes.register_system_routes(app, telemetry)

    app.run(port=8080, host="0.0.0.0")
