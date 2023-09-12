from flask import Flask, send_from_directory, request
from modules.open_ai import OpenAI
from modules.message_history import MessageHistory
import json
from uuid import uuid4
from config import Config

app = Flask(__name__)
message_history = MessageHistory()


@app.route('/')
def home():
    return send_from_directory(directory="./static", path="index.html")


@app.route('/ask', methods=['POST'])
def build_model():
    payload = json.loads(request.data)
    conversation_id = None
    if payload['conversationId'] == "":
        conversation_id = str(uuid4())
        message_history.append_system_message(conversation_id, payload['system-prompt'])
    else:
        conversation_id = payload['conversationId']
        if payload['prompt'] == "":
            prompt = payload['user-response']
        else:
            prompt = payload['prompt'].replace("{0}", payload['user-response'])
        message_history.append_user_message(conversation_id, prompt)

    try:
        messages = message_history.get_messages(conversation_id)
        response = OpenAI(Config.instance, Config.model, Config.apiKey).complete(messages)
        message_history.append_assistant_message(conversation_id, response)

        return {
            'conversationId': conversation_id,
            'response': response,
            'messages': message_history.get_messages(conversation_id)
        }
    except Exception as ex:
        return str(ex), 500


@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)


if __name__ == '__main__':
    app.run(port=8080, host="0.0.0.0")
