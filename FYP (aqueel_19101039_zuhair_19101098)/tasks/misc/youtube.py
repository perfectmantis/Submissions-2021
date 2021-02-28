import webbrowser
from tasks.speak import tts
from tasks.speak import rec_vic
# import pywhatkit as kit
import requests

def open_youtube():
    webbrowser.open("www.youtube.com")
    tts.speak("opening youtube")
    print("opening youtube .....")

def youtube():
    tts.speak("What do you want to play?")
    print("What do you want to play?")
    query = rec_vic.nlproc().lower()
    playonyt(query)

def playonyt(topic):
    """Will play video on following topic, takes about 10 to 15 seconds to load"""
    url = 'https://www.youtube.com/results?q=' + topic
    count = 0
    cont = requests.get(url)
    data = cont.content
    data = str(data)
    lst = data.split('"')
    for i in lst:
        count+=1
        if i == 'WEB_PAGE_TYPE_WATCH':
            break
    if lst[count-5] == "/results":
        raise Exception("No video found.")
    
    #print("Videos found, opening most recent video")
    webbrowser.open("https://www.youtube.com"+lst[count-5])
    return "https://www.youtube.com"+lst[count-5]