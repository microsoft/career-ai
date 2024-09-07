# import os
# import azure.cognitiveservices.speech as speechsdk
# from config import Config


# def recognize_from_microphone():
#     # This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
#     speech_config = speechsdk.SpeechConfig(subscription=Config.subscription, region=Config.region)
#     speech_config.speech_recognition_language="en-US"

#     audio_config = speechsdk.audio.AudioConfig(use_default_microphone=True)
#     speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

#     print("Speak into your microphone.")
#     speech_recognition_result = speech_recognizer.recognize_once_async().get()

#     if speech_recognition_result.reason == speechsdk.ResultReason.RecognizedSpeech:
#         print("Recognized: {}".format(speech_recognition_result.text))
#     elif speech_recognition_result.reason == speechsdk.ResultReason.NoMatch:
#         print("No speech could be recognized: {}".format(speech_recognition_result.no_match_details))
#     elif speech_recognition_result.reason == speechsdk.ResultReason.Canceled:
#         cancellation_details = speech_recognition_result.cancellation_details
#         print("Speech Recognition canceled: {}".format(cancellation_details.reason))
#         if cancellation_details.reason == speechsdk.CancellationReason.Error:
#             print("Error details: {}".format(cancellation_details.error_details))
#             print("Did you set the speech resource key and region values?")

# recognize_from_microphone()



# import os
# import openai
import speech_recognition as speech
from config import Config
from modules.open_ai import OpenAI

openai_instance = OpenAI(
        instance=Config.instance,
        model=Config.model,
        key=Config.apiKey
    )

class SpeechToText:

    def __init__(self):
        self.recognizer = speech.Recognizer()
        self.audio = None
        self.transcript = ""
        # Set OpenAI key
        # openai.api_key = os.getenv('OPENAI_KEY')

    def start_recording(self):
        with speech.Microphone() as source:
            print("Recording...")
            self.audio = self.recognizer.listen(source)

    def stop_recording_and_transcribe(self):
        try:
            self.transcript = self.recognizer.recognize_google(self.audio)
            print("Transcript Generated.")
        except speech.UnknownValueError:
            print("Google Speech Recognition could not understand your audio")
        except speech.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {0}".format(e))

    def generate_response(self):
        model = Config.model
        response = openai_instance.ChatCompletion.create(
            model=model,
            messages=[{"role": "user", "content": self.transcript}],
            max_tokens=150
        )
        return response.choices[0].text.strip()