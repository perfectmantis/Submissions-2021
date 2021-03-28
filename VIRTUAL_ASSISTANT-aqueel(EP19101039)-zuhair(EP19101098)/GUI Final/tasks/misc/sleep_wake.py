from core import state
from tasks.speak import tts
from tasks.speak import rec_vic
from multiprocessing import Queue
qu = Queue()

def sleep_wake(qu):
    state.state = 0
    tts.speak("sleeping now")
    # print
    qu.put("Sleeping now. zzzzzzz !")
    while True:
        query = rec_vic.nlproc(qu).lower()
        if 'wake up' in query:
            # print
            qu.put("Hi, I am back.")
            tts.speak("Hi, i am back")
            state.state = 1
            break