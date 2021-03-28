from tasks.speak import tts
import requests

def netck():
    url = "http://www.google.com/"
    timeout = 2
    try:
        _ = requests.get(url, timeout=timeout)
        tts.speak("Internet Connected")
        print("Internet Connected.")
        return False
    except requests.ConnectionError:
        tts.speak("No internet connection. I will not be able to work properly without internet!")
        print("No internet connection. I will not be able to work properly without internet!")
        return False