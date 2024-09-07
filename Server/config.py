import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    instance = os.getenv('OPENAI_INSTANCE')
    model = os.getenv('OPENAI_MODEL')
    apiKey = os.getenv('OPENAI_API_KEY')
