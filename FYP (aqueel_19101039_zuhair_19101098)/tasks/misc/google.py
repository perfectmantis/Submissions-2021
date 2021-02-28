import webbrowser
from tasks.speak import tts
from tasks.speak import rec_vic

def open_google():
    webbrowser.open("https://www.google.com")
    tts.speak("opening google")
    print("opening google .....")

def search_google():
    tts.speak("What do you want to search?")
    print("What do you want to search?")
    query = rec_vic.nlproc().lower()
    g_url="https://www.google.com/search?q="
    webbrowser.open(g_url+query)