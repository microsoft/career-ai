import requests
import json


class OpenAI():
    base_url = 'https://%s.azure-api.net/openai/deployments/%s/chat/completions?api-version=2023-07-01-preview'

    def __init__(self, account, deployment_name):
        self.account = account
        self.deployment_name = deployment_name

    def ask(self, prompt, key):
        response = requests.request(
            'post',
            self.base_url % (self.account, self.deployment_name),
            headers={
                "api-key": f"{key}",
                "Content-Type": "application/json"
            },
            data=json.dumps({
                "messages": [
                    {
                        "role": "user",
                        "content": f"{prompt}"
                    }
                ],
                "temperature": 0.7,
                "top_p": 0.95,
                "frequency_penalty": 0,
                "presence_penalty": 0,
                "max_tokens": 2048,
                "stop": None
            })
        )

        json_obj = json.loads(response.text)
        # TODO: Need to do more validation on the responses
        message = json_obj['choices'][0]['message']['content']

        return message
