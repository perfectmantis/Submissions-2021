from chatterbot import ChatBot
# from chatterbot.trainers import ChatterBotCorpusTrainer
from tasks.speak import tts

def chat(query):
    if 'none' not in query:
        res = chatbot.get_response(query)
        print(res)
        tts.speak(res)


chatbot = ChatBot(
    "AI bot",
    logic_adapters=["chatterbot.logic.BestMatch",
    "chatterbot.logic.MathematicalEvaluation",
    # "chatterbot.logic.TimeLogicAdapter"
    ],
    #storage_adapter="chatterbot.storage.MongoDatabaseAdapter"
    storage_adapter="chatterbot.storage.SQLStorageAdapter",
    database_uri='sqlite:///data//database.db'
)

# trainer = ChatterBotCorpusTrainer(chatbot)
# trainer.train(
#     "chatterbot.corpus.english"
# )
# while True:
#     qurey = str(input(">>>"))
#     print(chatbot.get_response(qurey))
#     if 'exit' in qurey:
#         break
