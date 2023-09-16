import requests
import json


class OpenAI():
    base_url = 'https://%s.azure-api.net/openai/deployments/%s/chat/completions?api-version=2023-07-01-preview'

    def __init__(self, account, deployment_name, key):
        self.account = account
        self.deployment_name = deployment_name
        self.key = key

    def complete(self, messages, temperature=0.7, top_p=0.95, frequency_penalty=0, presence_penalty=0, max_tokens=2048, number_of_responses=5,
                 stop=None):
        response = requests.request(
            'post',
            self.base_url % (self.account, self.deployment_name),
            headers={
                "api-key": f"{self.key}",
                "Content-Type": "application/json"
            },
            data=json.dumps({
                "messages": messages,
                "temperature": temperature,
                "top_p": top_p,
                "frequency_penalty": frequency_penalty,
                "presence_penalty": presence_penalty,
                "max_tokens": max_tokens,
                "stop": stop,
                "n":number_of_responses
            })
        )

        json_obj = json.loads(response.text)

        if response.status_code != 200:
            print("found error inside call")
            print(json_obj)
            raise Exception(json_obj['message'])

        # choices = json_obj['choices'][0]['message']['content']
        choices = json_obj['choices']
        print(len(choices))
        return choices
