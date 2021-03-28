import os
from tasks.speak import tts
from tasks.speak import rec_vic
import datetime
from multiprocessing import Queue
qu = Queue()

def open_note(qu):
    try:
        # spath="notepad.exe"
        # os.startfile(spath)
        # print
        qu.put("Showing Notes .....")
        tts.speak("Showing Notes")
        file = open("note.txt", "r") 
        # print
        qu.put(file.read())
        tts.speak(file.read(6))
    except Exception:
        # print
        qu.put("File not found!")
        tts.speak("File not found")

def close_note(qu):
    # print
    qu.put("closing notepad .....")
    tts.speak("closing notepad")
    os.system("TASKKILL /F /IM notepad.exe")

def write_note(qu):
    # print
    qu.put("What should I write?")
    tts.speak("What should i write?")
    note = rec_vic.nlproc().lower()
    file = open('note.txt', 'w')
    # print
    qu.put("Should i include date and time?")
    tts.speak("Should i include date and time")
    add_time = rec_vic.nlproc().lower()
    if 'yes' in add_time or 'sure' in add_time:
        strTime = datetime.datetime.now().strftime("% H:% M:% S")
        file.write(strTime)
        file.write(" :- ")
        file.write(note)
    else:
        file.write(note)
