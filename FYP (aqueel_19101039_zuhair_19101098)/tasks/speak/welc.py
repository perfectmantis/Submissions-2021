from tasks.vision.rec_gen import gender
from tasks.vision.rec_fac import recognize
from tasks.speak import tts
import datetime


def welcom():
    id = recognize.main()
    titl = ""
    if id == "" or id == "Unknown":
        gen = gender.regen()
        id = ""
        if gen == 'Male':
            titl = 'Sir'
        elif gen == 'Female':
            titl = 'Miss'
        else:
            titl=""
    hour = int(datetime.datetime.now().hour)
    if hour >= 4 and hour<12:
        tts.speak("Good morning "+titl+id+", i am your virtual assistent. How May I Help you?")
        print("Good morning "+titl+id+", i am your virtual assistent. How May I Help you?")
    elif hour>=12 and hour<17:
        tts.speak("Good afternoon "+titl+id+", i am your virtual assistent. How May I Help you?")
        print("Good afternoon "+titl+id+", i am your virtual assistent. How May I Help you?")
    elif hour>=17 and hour<21:
        tts.speak("Good evening "+titl+id+", i am your virtual assistent. How May I Help you?")
        print("Good evening "+titl+id+", i am your virtual assistent. How May I Help you?")
    else:
        tts.speak("hi "+titl+id+", i am your virtual assistent. How May I Help you?")
        print("Hi "+titl+id+", i am your virtual assistent. How May I Help you?")

