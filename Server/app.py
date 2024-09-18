from flask import Flask
from flask_cors import CORS
import logging

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
    open_ai = OpenAI2(app.config["openAIKey"],
                      app.config["openAIModel"], telemetry)
    game_prompts = {
        "preGamePrompt": app.config["preGamePrompt"],
        "userResponsePrompt": app.config["userResponsePrompt"],
        "postGamePrompt": app.config["postGamePrompt"],
    }

    return CareerGame(game_prompts=game_prompts, message_history=message_history, open_ai=open_ai, telemetry=telemetry, logger=app.logger)


if __name__ == '__main__':
    app, telemetry = build_system()
    career_game = build_game(app, telemetry)

    Routes.register_game_routes(app, career_game, telemetry)
    Routes.register_system_routes(app, telemetry)

    logging.basicConfig(level=logging.DEBUG, # Change this to logging.INFO for production
                    format='%(asctime)s %(levelname)s: %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S')

    app.run(port=8080, host="0.0.0.0",debug=True)
