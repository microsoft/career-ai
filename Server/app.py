from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import json
from uuid import uuid4
from config import Config
from modules.open_ai import OpenAI
from modules.message_history import MessageHistory
import time
from speech_to_text import SpeechToText

openai_instance = OpenAI(
    instance=Config.instance,
    model=Config.model,
    key=Config.apiKey
)

speech_to_text = SpeechToText()

app = Flask(__name__)
CORS(app)
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
            # Extract the content
            content = choice["message"]["content"]

            # Strip the code block markers if they exist
            if content.startswith("```") and content.endswith("```"):
                content = content.strip("```json").strip()

            # Attempt to parse the cleaned content as JSON
            content_dict = json.loads(content)
            print(content_dict)
            return content_dict

        except json.JSONDecodeError as e:
            print(f"Response is not valid JSON. Skipping to next choice. Error: {e}")
        except KeyError as e:
            print(f"KeyError: Expected 'message' or 'content' keys not found. Error: {e}")
            continue
    return None

def talk_to_openai(conversation_id, number_of_responses=1):
    try:
        messages = message_history.get_messages(conversation_id)
        valid_response_dict = None

        while valid_response_dict is None:
            print("Looking for valid response...")
            try:
                print("Calling OpenAI API...")
                choices = openai_instance.chat(
                    messages=messages, 
                    number_of_responses=number_of_responses
                )

                valid_response_dict = find_valid_response(choices)
            except Exception as e:
                print(f"Calling OpenAI failed: {e}. Waiting 5 seconds and retrying...")
                time.sleep(5)


        print("Valid response found, converting to JSON...")
        valid_response_json = json.dumps(valid_response_dict)

        print("Appending assistant message to conversation history...")
        message_history.append_assistant_message(conversation_id, valid_response_json)

        print("Returning response...")
        return {
            'conversationId': conversation_id,
            'response': valid_response_json,
            'messages': message_history.get_messages(conversation_id)
        }
    
    except Exception as ex:
        print(f"An error occurred: {ex}")
        return jsonify(error=str(ex)), 500

@app.route('/process_speech', methods=['POST'])
def process_speech():
    data = request.json
    transcript = data.get('transcript')
    # Here you would typically process the transcript with your AI model
    # For now, let's just return a simple response
    ai_response = f"You said: {transcript}"
    return jsonify({"ai_response": ai_response})

@app.route('/ask', methods=['POST'])
def build_model():
    try:
        payload = request.json
        conversation_id = payload.get('conversationId', "")

        print(f"Incoming conversationId from frontend: {conversation_id}")

        if conversation_id == "":
            print("Starting new conversation...")
            conversation_id = str(uuid4())
            message_history.append_system_message(conversation_id, payload['system_prompt'])
            if payload['user_response']:
                print("Appending user response to message history...")
                message_history.append_user_message(conversation_id, user_response(payload))
        else:
            print("Continuing existing conversation...")
            message_history.append_user_message(conversation_id, user_response(payload))

        print("Sending message to OpenAI...")
        json_response = talk_to_openai(conversation_id, 1)
        return jsonify(json_response)

    except Exception as ex:
        print(f"An error occurred in /ask endpoint: {ex}")
        return jsonify(error=str(ex)), 500

@app.route('/<path:path>')
def static_file(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(port=8080, host="0.0.0.0")