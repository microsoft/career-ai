from flask import Flask, send_from_directory, request
from flask_cors import CORS, cross_origin

from modules.open_ai import OpenAI
from modules.message_history import MessageHistory
import json
from uuid import uuid4
from config import Config

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

message_history = MessageHistory()


@app.route('/')
def home():
    return send_from_directory(directory="./static", path="index.html")

def user_response(payload):
    if payload['prompt'] == "":
        prompt = payload['user_response']
    else:
        prompt = payload['prompt'].replace("{0}", payload['user_response'])

    return prompt

def find_valid_response(choices):
    for choice in choices:        
        try:
           content = choice["message"]["content"]
           choice_dict = json.loads(content)
           return choice_dict
        except:
            print("choice did not work")
    return None
    

def talk_to_openai(conversation_id,number_of_responses=1):
    try:
        messages = message_history.get_messages(conversation_id)
        valid_response_dict = None
        while valid_response_dict is None:
        
            choices = OpenAI(Config.instance, Config.model, Config.apiKey).complete(messages, number_of_responses=number_of_responses)
            valid_response_dict = find_valid_response(choices)

        valid_response_json = json.dumps(valid_response_dict)

        message_history.append_assistant_message(conversation_id, (valid_response_json))

        return {
            'conversationId': conversation_id,
            'response': (valid_response_json),
            'messages': message_history.get_messages(conversation_id)
        }
    
    except Exception as ex:
        return str(ex), 500
  


@app.route('/ask', methods=['POST'])
def build_model():
    payload = json.loads(request.data)
    conversation_id = None
    if payload['conversationId'] == "":
        conversation_id = str(uuid4())
        message_history.append_system_message(conversation_id, payload['system_prompt'])
        if not(payload['user_response'] == ""):
            message_history.append_user_message(conversation_id, user_response(payload))
    else:
        conversation_id = payload['conversationId']
        message_history.append_user_message(conversation_id, user_response(payload))

    json_response = talk_to_openai(conversation_id,10)

    return json_response

    

@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)


if __name__ == '__main__':
    app.run(port=8080, host="0.0.0.0")
