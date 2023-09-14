from flask import Flask, send_from_directory, request
from modules.open_ai import OpenAI
from modules.message_history import MessageHistory
import json
from uuid import uuid4
from config import Config

import re

app = Flask(__name__)
message_history = MessageHistory()


@app.route('/')
def home():
    return send_from_directory(directory="./static", path="index.html")


@app.route('/ask', methods=['POST'])
def build_model():
    
    payload = json.loads(request.data)
    print(payload)
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

        if "**Outcome:**" in response or "**Scenario:**" in response or "**Options**" in response:
            parse_gpt_response(response)

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

# This private method should probably live in its own file
# Method works but sometimes GPT will return the syntax
# **Outcome: this is the outcome** and when it does
# logic goes out of whack. 
def parse_gpt_response(response):
    
    splitted_body = re.split('(\*\*.*?\*\*)', response)
    outcome_idx = splitted_body.index("**Outcome:**")+1
    scenario_idx = splitted_body.index("**Scenario:**")+1
    options_idx = splitted_body.index("**Options:**")+1

    outcome_str = splitted_body[outcome_idx]
    scenario_str = splitted_body[scenario_idx]
    options_str = splitted_body[options_idx]

    splitted_options = re.split('([1-9]\.)', options_str)

    options_1 = splitted_options.index("1.")+1
    options_2 = splitted_options.index("2.")+1
    options_3 = splitted_options.index("3.")+1

    options = [splitted_options[options_1],splitted_options[options_2],splitted_options[options_3]]
    json_body = {"outcome": outcome_str,"scenario": scenario_str, "options":options }
    
    return json_body


if __name__ == '__main__':
    app.run(port=8080, host="0.0.0.0")
