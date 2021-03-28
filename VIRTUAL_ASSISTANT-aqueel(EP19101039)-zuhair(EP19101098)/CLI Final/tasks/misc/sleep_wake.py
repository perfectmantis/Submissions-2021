from core import state
from tasks.speak import tts
from tasks.speak import rec_vic

def sleep_wake():
    tts.speak("sleeping now")
    state.state = 0
    print("sleeping now. zzzzzzz !")
    while True:
        query = rec_vic.nlproc().lower()
        if 'wake up' in query:
            tts.speak("Hi, i am back")
            print("Hi, I am back.")
            state.state = 1
            break
