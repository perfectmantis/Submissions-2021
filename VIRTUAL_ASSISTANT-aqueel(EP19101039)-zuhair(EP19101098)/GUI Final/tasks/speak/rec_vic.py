import speech_recognition as sr
from tasks.speak import tts
from core import state
from multiprocessing import Queue
from googletrans import Translator

gt = Translator()
qu = Queue()

def nlproc(qu):
    r = sr.Recognizer()
    try:
        with sr.Microphone() as source:
            if state.state != 0:
                # print
                qu.put("Listening .....")
            r.adjust_for_ambient_noise(source)
            audio = r.listen(source)
            if state.state != 0:
                # print
                qu.put("Recognizing .....") 
            text = r.recognize_google(audio)
            # Language detection if as hindi convert to urdu text for output
            try:
                txt_rev = ""
                if  (gt.detect(text)).lang == 'hi':
                    text = gt.translate(text, dest='ur').text
                    for i in ((text).split(' ')):
                        txt_rev = i + " " + txt_rev
                    text = txt_rev
            except:
                pass
            # print
            qu.put("You said: "+text)
    # except Exception:
    #     speak("Error! Network connection lost")
    #     print("Network connection error") 
    #     return "none"
    except sr.UnknownValueError as err:
        if state.state != 0:
            # print
            qu.put("I didn't understand, what you are trying to say?")
            tts.speak("I didn't understand, what you are trying to say?")
        return "none"
    except sr.RequestError as e:
        # print
        # qu.put("Request Failed; {0}".format(e))
        qu.put("Problem occur while recognizing speech!")
        tts.speak("Problem occur while recognizing speech!")
        return "none"

    return text
