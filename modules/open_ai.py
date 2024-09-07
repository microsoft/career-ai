import requests
import json

class OpenAI:
    def __init__(self, instance, model, key):
        self.instance = instance
        self.model = model
        self.key = key

    def chat(self, messages, temperature=0.7, top_p=0.95, frequency_penalty=0, presence_penalty=0, max_tokens=2048, number_of_responses=5, stop=None):
        try:
            response = requests.post(
                self.instance,
                headers={
                    "Authorization": f"Bearer {self.key}",
                    "Content-Type": "application/json"
                },
                data=json.dumps({
                    "model": self.model,
                    "messages": messages,
                    "temperature": temperature,
                    "top_p": top_p,
                    "frequency_penalty": frequency_penalty,
                    "presence_penalty": presence_penalty,
                    "max_tokens": max_tokens,
                    "n": number_of_responses,
                    "stop": stop
                })
            )

            # Print raw response content for debugging
            print(f"Raw response content: {response.text}")

            # Parse the response as JSON
            json_obj = response.json()

            if response.status_code != 200:
                print("Error occurred during OpenAI API call.")
                print(json_obj)
                raise Exception(json_obj.get('error', {}).get('message', 'Unknown error'))

            # Return the list of choices from the response
            choices = json_obj.get('choices', [])
            print(f"Number of choices received: {len(choices)}")
            return choices

        except requests.exceptions.RequestException as e:
            print(f"RequestException: {e}")
            raise

        except json.JSONDecodeError as e:
            print(f"JSONDecodeError: {e} - Response content: {response.text}")
            raise
