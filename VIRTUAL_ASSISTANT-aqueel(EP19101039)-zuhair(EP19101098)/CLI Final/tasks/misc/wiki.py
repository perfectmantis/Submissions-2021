import wikipedia
from tasks.speak import tts
from tasks.speak import rec_vic

def wiki():
    try:
        tts.speak("What do you want to search?")
        print("What do you want to search?")
        query = rec_vic.nlproc().lower()
        tts.speak("searching .....")
        print("searching .....")
        results = wikipedia.summary(query, sentences=2)
        tts.speak("According to wikipedia .....")
        tts.speak(results)
    except Exception as err:
        print(err)