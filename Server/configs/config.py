import os
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient


class Config:
    @staticmethod
    def load_configs(app):
        app.config["keyvault_uri"] = os.getenv(
            "keyvault_uri",  "https://keyvault-careercraft.vault.azure.net/")
        app.config["is_production"] = os.getenv(
            "environment",  "NonProd") == "Prod"

        credential = DefaultAzureCredential()

        client = SecretClient(app.config.get("keyvault_uri"), credential)
        secret_properties = client.list_properties_of_secrets()

        for secret_property in secret_properties:
            app.config[secret_property.name] = client.get_secret(
                secret_property.name).value

    def update_configs(app, key, value):
        credential = DefaultAzureCredential()

        client = SecretClient(app.config.get("keyvault_uri"), credential)
        client.set_secret(key, value)

        Config.load_configs(app)
