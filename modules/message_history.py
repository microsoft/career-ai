class MessageHistory():
    history = {}

    def get_messages(self, conversation_id):
        if conversation_id in self.history:
            return self.history[conversation_id]

        return []

    def append_user_message(self, conversation_id, message):
        messages = self.get_messages(conversation_id)
        messages.append({
            'role': 'user',
            'content': message
        })
        self.__save_messages__(conversation_id, messages)

    def append_system_message(self, conversation_id, message):
        messages = self.get_messages(conversation_id)
        messages.append({
            'role': 'system',
            'content': message
        })
        self.__save_messages__(conversation_id, messages)

    def append_assistant_message(self, conversation_id, message):
        messages = self.get_messages(conversation_id)
        messages.append({
            'role': 'assistant',
            'content': message
        })
        self.__save_messages__(conversation_id, messages)

    def __save_messages__(self, conversation_id, messages):
        self.history[conversation_id] = messages
