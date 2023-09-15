import openai

class OpenAI2():
    def __init__(self, key, model = 'gpt-4'):
        self.key = key
        self.model = model
        openai.api_key = key

    def chat(self, messageContext = "", requiredWords = [], responses = 3, attempts = 3):
        for i in range(attempts):
            allResponses = openai.ChatCompletion.create(model = self.model, messages = messageContext, n = responses).choices
            for response in allResponses:
                content = response.message.content
                content_dict = dict()
                try:
                    content_dict = json.loads(content)
                except:
                    continue
                if all([word in content for word in requiredWords]):
                    return content_dict