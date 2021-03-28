from tasks.speak import tts
import os
import pyautogui as gui
from datetime import datetime
import time
 
now = datetime.now()
def switch_window():
    gui.keyDown('alt')
    gui.press('tab')
    time.sleep(1)
    gui.keyUp('alt')

def shutdown_system():
    tts.speak("system shutting down")
    print("system shutting down .....")
    os.system('shutdown -s -t 10') 

def abort_shutdown_system():
    tts.speak("system shutting down abort")
    print("system shutting down abort.")
    os.system('shutdown -a') 

def restart_system():
    tts.speak("restarting system")
    print("restarting system .....")
    os.system('shutdown -r')
    
def sleep_system():
    tts.speak("system ready going to sleep")
    print("system ready going to sleep .....")
    os.system('rundll32.exe powrprof.dll,SetSuspendState 0,1,0')

def hibernate():
    tts.speak("Hibernating")
    print("Hibernating .....")
    os.system("shutdown -h")

def log_off():
    tts.speak("Signing out")
    print("Signing out .....")
    os.system("shutdown -l")

def tell_time():
    strTime = now.strftime("%I%p:%M")    
    tts.speak(f"current time is {strTime} minutes")
    print(f"current time is {strTime} minutes")

def tell_date():
    strDate = now.strftime("%d/%B/%Y")
    tts.speak(f"Today is {strDate}")
    print(f"Today is {strDate}")