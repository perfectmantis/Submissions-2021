import os
from tasks.speak import tts
from tasks.speak import rec_vic
import datetime

def open_note():
    try:
        # spath="notepad.exe"
        # os.startfile(spath)
        tts.speak("Showing Notes")
        print("Showing Notes .....")
        file = open("note.txt", "r") 
        print(file.read())
        tts.speak(file.read(6))
    except Exception:
        tts.speak("File not found")
        print("File not found!")

def close_note():
    tts.speak("closing notepad")
    print("closing notepad .....")
    os.system("TASKKILL /F /IM notepad.exe")

def write_note():
    tts.speak("What should i write?")
    print("What should I write?")
    note = rec_vic.nlproc().lower()
    file = open('note.txt', 'w')
    tts.speak("Should i include date and time")
    print("Should i include date and time?")
    add_time = rec_vic.nlproc().lower()
    if 'yes' in add_time or 'sure' in add_time:
        strTime = datetime.datetime.now().strftime("% H:% M:% S")
        file.write(strTime)
        file.write(" :- ")
        file.write(note)
    else:
        file.write(note)
