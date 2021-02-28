import speech_recognition as sr
from tasks.speak import tts
from core import state

def nlproc():
    r = sr.Recognizer()
    try:
        with sr.Microphone() as source:
            if state.state != 0:
                print("Listning....")
            r.adjust_for_ambient_noise(source)
            audio = r.listen(source)
            if state.state != 0:
                print("Recognising....") 
            text = r.recognize_google(audio)
            print("You said: "+text)
    # except Exception:
    #     speak("Error! Network connection lost")
    #     print("Network connection error") 
    #     return "none"
    except sr.UnknownValueError as err:
        if state.state != 0:
            tts.speak("I didn't understand, what you are trying to say?")
        return "none"
    except sr.RequestError as e:
        print("Request Failed; {0}".format(e))
        return "none"
    
    return text