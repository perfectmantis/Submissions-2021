import webbrowser
from tasks.speak import tts
import os

def open_github():
    webbrowser.open("https://www.github.com")
    tts.speak("opening github") 
    print("opening github .....")  
def open_facebook():
    webbrowser.open("https://www.facebook.com")
    tts.speak("opening facebook")  
    print("opening facebook .....")      
def open_instagram():
    webbrowser.open("https://www.instagram.com")
    tts.speak("opening instagram")    
    print("opening instagram .....")  
def open_yahoo():
    webbrowser.open("https://www.yahoo.com")
    tts.speak("opening yahoo")   
    print("opening yahoo .....")   
def open_gmail():
    webbrowser.open("https://mail.google.com")
    tts.speak("opening google mail") 
    print("opening google mail .....") 
def open_snapdeal():
    webbrowser.open("https://www.snapdeal.com") 
    tts.speak("opening snapdeal")
    print("opening snapdeal .....")
def open_amazon():
    webbrowser.open("https://www.amazon.com")
    tts.speak("opening amazon")
    print("opening amazon .....")
def open_flipkart():
    webbrowser.open("https://www.flipkart.com")
    tts.speak("opening flipkart")   
    print("opening flipkart .....")   
def open_ebay():
    webbrowser.open("https://www.ebay.com")
    tts.speak("opening ebay")
    print("opening ebay .....")
def close_chrome():
    tts.speak("closing chrome")
    print("closing chrome .....")
    os.system("TASKKILL /F /IM chrome.exe")