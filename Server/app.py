from flask import Flask
from flask_cors import CORS

from configs.config import Config
from configs.routes import Routes
from modules.message_history import MessageHistory
from modules.career_game import CareerGame
from modules.telemetry import Telemetry
from modules.open_ai2 import OpenAI2

def build_system():
    app = Flask(__name__)
    Config.load_configs(app)
    if not(app.config["is_production"]):
        CORS(app)

    return app, Telemetry(app.config["appInsightsConnectionString"], __name__)

def build_game(app, telemetry):
    message_history = MessageHistory()
    open_ai = OpenAI2(app.config["openAIKey"], app.config["openAIModel"], telemetry)
    game_prompts = {
        "preGamePrompt": app.config["preGamePrompt"],
        "userResponsePrompt": app.config["userResponsePrompt"],
    }

    return CareerGame(game_prompts, message_history, open_ai, telemetry)

if __name__ == '__main__':
    app, telemetry = build_system()
    career_game = build_game(app, telemetry)

    Routes.register_system_routes(app, telemetry)
    Routes.register_game_routes(app, career_game, telemetry)

    app.run(port=8080, host="0.0.0.0")
