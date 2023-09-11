from flask import Flask, send_from_directory, request
from modules.open_ai import OpenAI
import json

app = Flask(__name__)


@app.route('/')
def home():
    return send_from_directory(directory="./static", path="index.html")


@app.route('/ask', methods=['POST'])
def build_model():
    payload = json.loads(request.data)
    response = OpenAI(payload['account'], payload['model']).ask(prompt=payload['prompt'], key=payload['apikey'])

    return response


@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)


if __name__ == '__main__':
    app.run()
