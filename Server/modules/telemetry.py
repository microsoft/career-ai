from opencensus.ext.azure.log_exporter import AzureLogHandler, AzureEventHandler
import logging
import json


class LoggingLevels:
    INFO = 1
    EVENT = 2
    EXCEPTION = 3


class Telemetry:
    info_count = 0
    event_count = 0

    def __init__(self, connection_string, app_name, operationId="", parentOperationId="", custom_props={}, logging_level=LoggingLevels.INFO):
        self.custom_properties = {}
        self.operationId = operationId
        self.parentOperationId = parentOperationId
        self.connection_string = connection_string
        self.app_name = app_name
        self.logging_level = logging_level
        # For compatibility with the rule engine package
        self.loggerName = app_name

        if (custom_props):
            self.custom_properties.update(custom_props)

        aiLogger = logging.getLogger(app_name)

        # check if azure exporter is already added to this logger. if not then add azure exporter.
        if (len(aiLogger.handlers) <= 0):
            handler = AzureLogHandler(connection_string=connection_string)
            aiLogger.setLevel(logging.DEBUG)
            aiLogger.addHandler(handler)

        self.aiLogger = aiLogger

        # AI event handler
        eventLogger = logging.getLogger('Event_{}'.format(app_name))
        if (len(eventLogger.handlers) <= 0):
            ehandler = AzureEventHandler(connection_string=connection_string)
            eventLogger.setLevel(logging.INFO)
            eventLogger.addHandler(ehandler)

        self.eventLogger = eventLogger

    def __get_custom_props(self, props=None, metrics=None):
        localProps = self.custom_properties.copy()
        if (props):
            localProps.update(props)

        if (metrics):
            localProps.update(metrics)

        return {'traceId': self.operationId, 'spanId': self.parentOperationId, 'custom_dimensions': localProps}

    def info(self, message, props=None, print_props=True):
        if self.logging_level > LoggingLevels.INFO:
            return

        custom_props = self.__get_custom_props(props, None)
        self.aiLogger.info(f"{self.app_name}_{message}", extra=custom_props)
        if print_props:
            print(f"MESSAGE:", message)
            print(f"INFO PROPS:\n{json.dumps(custom_props, indent=4)}")
        self.info_count += 1

        if self.info_count >= 1000:
            for handler in self.aiLogger.handlers:
                handler.flush()
            self.info_count = 0

    def event(self, event, props=None, metrics=None, print_props=True):
        if self.logging_level > LoggingLevels.EVENT:
            return

        custom_props = self.__get_custom_props(props, metrics)
        self.eventLogger.info(f"{self.app_name}_{event}", extra=custom_props)
        if print_props:
            print(f"EVENT:", event)
            print(f"EVENT PROPS:\n{json.dumps(custom_props, indent=4)}")
        self.event_count += 1

        if self.event_count >= 1000:
            for handler in self.eventLogger.handlers:
                handler.flush()
            self.event_count = 0

    def exception(self, ex=None, props=None, metrics=None):
        self.aiLogger.exception(
            ex, extra=self.__get_custom_props(props, metrics))
        self.event_count += 1

    def commit(self):
        for handler in self.aiLogger.handlers:
            handler.flush()

        for handler in self.eventLogger.handlers:
            handler.flush()
