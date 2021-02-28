from requests import get
from tasks.speak import tts

def ip():
    try:
        ip = get('https://api.ipify.org').text
        tts.speak(f"your IP address is {ip}")
        print(f"your IP address is {ip}")
    except Exception:
        tts.speak("Not able to find IP address")
        print("Not able to find IP address!")