import requests
import json
import logging
import instructor
from pydantic import BaseModel
from openai import AzureOpenAI

logger = logging.getLogger(__name__)


class OpenAI:
    def __init__(
        self,
        api_version: str,
        key,
        openai_endpoint: str,
        model: str,
        max_tokens: int,
        stream: bool,
        telemetry,
    ):
        self.model = model
        self.key = key
        self.max_tokens = max_tokens
        self.stream = stream
        self.telemetry = telemetry
        self.client = instructor.from_openai(
            AzureOpenAI(
                api_key=self.key,
                api_version=api_version,
                azure_endpoint=openai_endpoint,
            ),
        )

    def make_request(
        self, messages: list[str], response_model: BaseModel, retries: int
    ):
        for run in range(retries):
            try:
                response, completion = (
                    self.client.chat.completions.create_with_completion(
                        model=self.model,
                        messages=messages,
                        max_tokens=self.max_tokens,
                        stream=self.stream,
                        response_model=response_model,
                    )
                )

                print("Tokens used:", completion.usage)
                return response
            except Exception as e:
                error = str(e)
                logger.info(
                    f"Encountered exception while making gpt4o request: {error}"
                )
                raise
