from tasks.speak import tts
import requests
from multiprocessing import Queue
qu = Queue()

def netck(qu):
    url = "http://www.google.com/"
    timeout = 2
    try:
        _ = requests.get(url, timeout=timeout)
        # print
        qu.put("Internet Connected.")
        tts.speak("Internet Connected")
        # return False
    except requests.ConnectionError:
        # print
        qu.put("No internet connection. I will not be able to work properly without internet!")
        tts.speak("No internet connection. I will not be able to work properly without internet!")
        # return False