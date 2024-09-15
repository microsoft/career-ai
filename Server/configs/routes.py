import time

from flask import send_from_directory, request, jsonify
from .config import Config


class Routes:
    @staticmethod
    def register_system_routes(app, telemetry):
        @app.before_request
        def before_request():
            request.start_time = time.time()

        @app.after_request
        def after_request(response):
            end_time = time.time()
            duration = (end_time - request.start_time) * 1000

            telemetry.info("HttpRequest", {
                "duration": duration,
                "status": response.status_code,
                "correlationId": request.headers.get("x-correlation-id", ""),
            })

            return response

        @app.route('/')
        def home():
            return send_from_directory(directory="./static", path="index.html")

        @app.route('/<path:path>')
        def static_file(path):
            return send_from_directory('static', path)

    @staticmethod
    def register_game_routes(app, initial_career_game, telemetry):
        career_game = initial_career_game

        @app.route('/api/career-game/start', methods=['POST'])
        def start_career_game():
            request_body = request.json
            career_choice = request_body.get('careerChoice', "")
            if career_choice == "":
                return jsonify({
                    "error": "BadRequest",
                    "message": "careerChoice is required"
                }), 400

            try:
                resposne = career_game.start_game(career_choice)

                return jsonify(resposne), 200
            except Exception as e:
                return jsonify({
                    "error": "GameError",
                    "message": "Game could not be started"
                }), 500

        @app.route('/api/career-game/continue', methods=['POST'])
        def continue_career_game():
            request_body = request.json
            conversation_id = request_body.get('conversationId', "")
            user_response = request_body.get('response', "")
            if conversation_id == "" or user_response == "":
                return jsonify({
                    "error": "BadRequest",
                    "message": "conversationId and response are required"
                }), 400

            try:
                resposne = career_game.continue_game(
                    conversation_id, user_response)

                return jsonify(resposne), 200
            except Exception as e:
                return jsonify({
                    "error": "GameError",
                    "message": "Game could not be continued"
                }), 500

        @app.route('/api/career-game/complete', methods=['POST'])
        def complete_career_game():
            return jsonify({
                "error": "GameError",
                "message": "Game could not be completed"
            }), 500

        @app.route('/api/career-game/admin/prompts', methods=['GET'])
        def get_career_game_prompts():
            return jsonify(career_game.get_current_prompts()), 200

        @app.route('/api/career-game/admin/prompts', methods=['POST'])
        def update_career_game_prompts():
            request_body = request.json
            preGamePrompt = request_body.get('preGamePrompt', "")
            userResponsePrompt = request_body.get('userResponsePrompt', "")

            if preGamePrompt == "" or userResponsePrompt == "":
                return jsonify({
                    "error": "BadRequest",
                    "message": "preGamePrompt and userResponsePrompt are required"
                }), 400

            try:
                Config.update_configs(app, "preGamePrompt", preGamePrompt)
                Config.update_configs(
                    app, "userResponsePrompt", userResponsePrompt)

                game_prompts = {
                    "preGamePrompt": app.config["preGamePrompt"],
                    "userResponsePrompt": app.config["userResponsePrompt"],
                }
                career_game.update_prompts(game_prompts)
            except:
                return jsonify({
                    "error": "GameError",
                    "message": "Game could not be reloaded"
                }), 500

            return '', 204
