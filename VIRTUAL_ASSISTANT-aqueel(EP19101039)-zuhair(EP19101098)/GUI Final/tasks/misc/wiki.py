import wikipedia
from tasks.speak import tts
from tasks.speak import rec_vic
from multiprocessing import Queue
qu = Queue()

def wiki(qu):
    try:
        # print
        qu.put("What do you want to search?")
        tts.speak("What do you want to search?")
        query = rec_vic.nlproc().lower()
        # print
        qu.put("searching .....")
        tts.speak("searching .....")
        results = wikipedia.summary(query, sentences=2)
        # print
        qu.put("According to wikipedia .....")
        tts.speak("According to wikipedia .....")
        qu.put(results)
        tts.speak(results)
    except Exception as err:
        # print
        qu.put(err)