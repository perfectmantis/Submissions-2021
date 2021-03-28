from tasks.speak import tts
import os
import pyautogui as gui
from datetime import datetime
import time
from multiprocessing import Queue
qu = Queue()
now = datetime.now()

def switch_window():
    gui.keyDown('alt')
    gui.press('tab')
    time.sleep(1)
    gui.keyUp('alt')

def shutdown_system():
    # print
    qu.put("System shutting down .....")
    tts.speak("system shutting down")
    os.system('shutdown -s -t 10') 

def abort_shutdown_system():
    # print
    qu.put("system shutting down abort.")
    tts.speak("system shutting down abort")
    os.system('shutdown -a') 

def restart_system():
    # print
    qu.put("Restarting system .....")
    tts.speak("restarting system")
    os.system('shutdown -r')
    
def sleep_system():
    # print
    qu.put("System ready going to sleep .....")
    tts.speak("system ready going to sleep")
    os.system('rundll32.exe powrprof.dll,SetSuspendState 0,1,0')

def hibernate():
    # print
    qu.put("Hibernating .....")
    tts.speak("Hibernating")
    os.system("shutdown -h")

def log_off():
    # print
    qu.put("Signing out .....")
    tts.speak("Signing out")
    os.system("shutdown -l")

def tell_time():
    strTime = now.strftime("%I:%M %p")    
    # print
    qu.put(f"Current time is {strTime}")
    tts.speak(f"current time is {strTime}")

def tell_date():
    strDate = now.strftime("%d/%B/%Y")
    # print
    qu.put(f"Today is {strDate}")
    tts.speak(f"Today is {strDate}")