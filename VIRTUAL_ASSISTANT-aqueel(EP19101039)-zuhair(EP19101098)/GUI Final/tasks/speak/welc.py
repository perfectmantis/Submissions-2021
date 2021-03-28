from tasks.vision.rec_gen import gender
from tasks.vision.rec_fac import recognize
from tasks.speak import tts
import datetime
from multiprocessing import Queue
qu = Queue()

def welcom(qu):
    id = recognize.main()
    titl = ""
    if id == "" or id == "Unknown":
        gen = gender.regen(qu)
        id = ""
        if gen == 'Male':
            titl = 'Sir'
        elif gen == 'Female':
            titl = 'Miss'
        else:
            titl=""
    hour = int(datetime.datetime.now().hour)
    if hour >= 4 and hour<12:
        # print
        qu.put("Good morning "+titl+id+", I am your virtual assistant. How May I Help you?")
        tts.speak("Good morning "+titl+id+", I am your virtual assistant. How May I Help you?")
    elif hour>=12 and hour<17:
        # print
        qu.put("Good afternoon "+titl+id+", I am your virtual assistant. How May I Help you?")
        tts.speak("Good afternoon "+titl+id+", I am your virtual assistant. How May I Help you?")
    elif hour>=17 and hour<21:
        # print
        qu.put("Good evening "+titl+id+", I am your virtual assistant. How May I Help you?")
        tts.speak("Good evening "+titl+id+", I am your virtual assistant. How May I Help you?")
    else:
        # print
        qu.put("Hi "+titl+id+", I am your virtual assistant. How May I Help you?")
        tts.speak("hi "+titl+id+", I am your virtual assistant. How May I Help you?")
