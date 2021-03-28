import webbrowser
from tasks.speak import tts
from tasks.speak import rec_vic
from multiprocessing import Queue
qu = Queue()

def open_google(qu):
    # print
    qu.put("opening google .....")
    tts.speak("opening google")
    webbrowser.open("https://www.google.com")

def search_google(qu):
    # print
    qu.put("What do you want to search?")
    tts.speak("What do you want to search?")
    query = rec_vic.nlproc(qu).lower()
    g_url="https://www.google.com/search?q="
    webbrowser.open(g_url+query)