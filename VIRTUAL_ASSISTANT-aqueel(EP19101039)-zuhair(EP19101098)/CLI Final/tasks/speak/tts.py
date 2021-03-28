import pyttsx3

try:
    txspk = pyttsx3.init('sapi5')
    voices = txspk.getProperty('voices')
    txspk.setProperty('voice',voices[0].id)
except:
    pass

def speak(audio):
    try:
        txspk.say(audio)
        txspk.runAndWait()
        return False
    except Exception:
        return