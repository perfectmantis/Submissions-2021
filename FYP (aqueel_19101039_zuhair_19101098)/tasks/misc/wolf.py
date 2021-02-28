# Python program to 
# demonstrate creation of an 
# assistant using wolf ram API 
from tasks.speak import tts
from tasks.speak import rec_vic
import wolframalpha

def wolf():
    try:
        tts.speak("feel free to ask any question.")
        print("Feel free to ask any question.")
        # Taking input from user 
        question = rec_vic.nlproc().lower()

        # App id obtained by the above steps 
        app_id = 'V56XQ4-23QA5RPPQ9' 

        # Instance of wolf ram alpha 
        # client class 
        client = wolframalpha.Client(app_id) 

        # Stores the response from 
        # wolf ram alpha 
        res = client.query(question)

        # Includes only text from the response 
        answer = next(res.results).text 

        tts.speak(answer)
    except Exception:
        tts.speak("Right now, I am not able to answer.")
        print("Right now, I am not able to answer.")
