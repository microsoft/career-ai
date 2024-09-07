from flask import send_from_directory, request, jsonify

class Routes:

    @staticmethod
    def register_system_routes(app, telemetry):
        @app.route('/')
        def home():
            return send_from_directory(directory="./static", path="index.html")

        @app.route('/<path:path>')
        def static_file(path):
            return send_from_directory('static', path)

    @staticmethod
    def register_game_routes(app, career_game, telemetry):
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
                resposne = career_game.start_game(career_choice);

                return jsonify(resposne)
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
                resposne = career_game.continue_game(conversation_id, user_response);

                return jsonify(resposne)
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

