import webbrowser
from tasks.speak import tts
import os
from multiprocessing import Queue
qu = Queue()

def open_github(qu):
    # print
    qu.put("opening github .....")  
    tts.speak("opening github") 
    webbrowser.open("https://www.github.com")
def open_facebook(qu):
    # print
    qu.put("opening facebook .....")    
    tts.speak("opening facebook")  
    webbrowser.open("https://www.facebook.com")
def open_instagram(qu):
    # print
    qu.put("opening instagram .....")  
    tts.speak("opening instagram")
    webbrowser.open("https://www.instagram.com")
def open_yahoo(qu):
    # print
    qu.put("opening yahoo .....")   
    tts.speak("opening yahoo")
    webbrowser.open("https://www.yahoo.com")
def open_gmail(qu):
    # print
    qu.put("opening google mail .....") 
    tts.speak("opening google mail") 
    webbrowser.open("https://mail.google.com")
def open_snapdeal(qu):
    # print
    qu.put("opening snapdeal .....")
    tts.speak("opening snapdeal")
    webbrowser.open("https://www.snapdeal.com") 
def open_amazon(qu):
    # print
    qu.put("opening amazon .....")
    tts.speak("opening amazon")
    webbrowser.open("https://www.amazon.com")
def open_flipkart(qu):
    # print
    qu.put("opening flipkart .....")
    tts.speak("opening flipkart")
    webbrowser.open("https://www.flipkart.com")
def open_ebay(qu):
    # print
    qu.put("opening ebay .....")
    tts.speak("opening ebay")
    webbrowser.open("https://www.ebay.com")
def close_chrome(qu):
    # print
    qu.put("closing chrome .....")
    tts.speak("closing chrome")
    os.system("TASKKILL /F /IM chrome.exe")