from requests import get
from tasks.speak import tts
from multiprocessing import Queue
qu = Queue()

def ip():
    try:
        ip = get('https://api.ipify.org').text
        # print
        qu.put(f"your IP address is: {ip}")
        tts.speak(f"your IP address is {ip}")
    except Exception:
        # print
        qu.put("Not able to find IP address!")
        tts.speak("Not able to find IP address")