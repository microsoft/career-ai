import time
import traceback
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

            telemetry.info(
                "HttpRequest",
                {
                    "duration": duration,
                    "status": response.status_code,
                    "correlationId": request.headers.get("x-correlation-id", ""),
                },
            )

            return response

        # Catch-all route for client-side routing
        @app.route("/", defaults={"path": ""})
        @app.route("/<path:path>")
        def catch_all(path):
            print(path)
            if path != "" and (path.startswith("static/") or "." in path):
                return send_from_directory("client", path)
            return send_from_directory(directory="./client", path="index.html")

        # @app.route('/')
        # def home():
        #     print("index", request.url)
        #     return send_from_directory(directory="./static", path="index.html")

        # @app.route('/<path:path>')
        # def static_file(path):
        #     print(path)

        #     return send_from_directory('static', path)

        # @app.route('/static/<path:path>')
        # def static_file_2(path):
        #     print(path)

        #     return send_from_directory('static', path)

    @staticmethod
    def register_game_routes(app, initial_career_game, telemetry):
        career_game = initial_career_game

        @app.route("/api/career-game/start", methods=["POST"])
        def start_career_game():
            request_body = request.json
            career_choice = request_body.get("careerChoice", "")
            if career_choice == "":
                return (
                    jsonify(
                        {"error": "BadRequest", "message": "careerChoice is required"}
                    ),
                    400,
                )

            try:
                response = career_game.start_game(career_choice)

                return jsonify(response), 200
            except Exception as e:
                print(e)
                traceback.print_exc()
                return (
                    jsonify(
                        {"error": "GameError", "message": "Game could not be started"}
                    ),
                    500,
                )

        @app.route("/api/career-game/continue", methods=["POST"])
        def continue_career_game():
            request_body = request.json
            conversation_id = request_body.get("conversationId", "")
            user_response = request_body.get("response", "")
            if conversation_id == "" or user_response == "":
                return (
                    jsonify(
                        {
                            "error": "BadRequest",
                            "message": "conversationId and response are required",
                        }
                    ),
                    400,
                )

            try:
                response = career_game.continue_game(
                    conversation_id, user_response)

                return jsonify(response), 200
            except Exception as e:
                return (
                    jsonify(
                        {"error": "GameError", "message": "Game could not be continued"}
                    ),
                    500,
                )

        @app.route("/api/career-game/complete", methods=["POST"])
        def complete_career_game():
            request_body = request.json
            conversation_id = request_body.get("conversationId", "")
            user_response = request_body.get("response", "")
            if conversation_id == "" or user_response == "":
                return (
                    jsonify(
                        {
                            "error": "BadRequest",
                            "message": "conversationId and response are required",
                        }
                    ),
                    400,
                )

            try:
                response = career_game.complete_game(
                    conversation_id, user_response)

                return jsonify(response), 200
            except Exception as e:
                return (
                    jsonify(
                        {"error": "GameError", "message": "Game could not be completed"}
                    ),
                    500,
                )

        @app.route("/api/career-game/validate-career", methods=["POST"])
        def validate_career():
            request_body = request.json
            user_response = request_body.get("response", "")
            if user_response == "":
                return (
                    jsonify(
                        {
                            "error": "BadRequest",
                            "message": "user response is required",
                        }
                    ),
                    400,
                )

            try:
                response = career_game.validate(user_response)
                return jsonify(response), 200
            except Exception as e:
                return (
                    jsonify(
                        {"error": "GameError", "message": "Game could not be completed"}
                    ),
                    500,
                )

        # @app.route("/api/career-game/admin/prompts", methods=["GET"])
        # def get_career_game_prompts():
        #     return jsonify(career_game.get_current_prompts()), 200

        # @app.route("/api/career-game/admin/prompts", methods=["POST"])
        # def update_career_game_prompts():
        #     request_body = request.json
        #     preGamePrompt = request_body.get("preGamePrompt", "")
        #     userResponsePrompt = request_body.get("userResponsePrompt", "")
        #     postGamePrompt = request_body.get("postGamePrompt", "")

        #     if preGamePrompt == "" or userResponsePrompt == "" or postGamePrompt == "":
        #         return (
        #             jsonify(
        #                 {"error": "BadRequest", "message": "All prompts are required"}
        #             ),
        #             400,
        #         )

        #     try:
        #         Config.update_configs(app, "preGamePrompt", preGamePrompt)
        #         Config.update_configs(app, "userResponsePrompt", userResponsePrompt)
        #         Config.update_configs(app, "postGamePrompt", postGamePrompt)

        #         game_prompts = {
        #             "preGamePrompt": app.config["preGamePrompt"],
        #             "userResponsePrompt": app.config["userResponsePrompt"],
        #             "postGamePrompt": app.config["postGamePrompt"],
        #         }
        #         career_game.update_prompts(game_prompts)
        #     except:
        #         return (
        #             jsonify(
        #                 {"error": "GameError", "message": "Game could not be reloaded"}
        #             ),
        #             500,
        #         )

        #     return "", 204
