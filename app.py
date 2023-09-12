from flask import Flask, send_from_directory, request
from modules.open_ai import OpenAI
from modules.message_history import MessageHistory
import json
from uuid import uuid4

app = Flask(__name__)
message_history = MessageHistory()


@app.route('/')
def home():
    return send_from_directory(directory="./static", path="index.html")


@app.route('/ask', methods=['POST'])
def build_model():
    payload = json.loads(request.data)
    conversation_id = payload['conversationId'] if payload['conversationId'] is not None else uuid4()

    message_history.append_user_message(conversation_id, payload['prompt'])
    messages = message_history.get_messages(conversation_id)

    try:
        response = OpenAI(payload['account'], payload['model'], payload['apikey']).complete(messages)
        message_history.append_assistant_message(conversation_id, response)

        return {
            'conversationId': conversation_id,
            'response': response
        }
    except Exception as ex:
        return str(ex), 500


@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)


if __name__ == '__main__':
    app.run()
