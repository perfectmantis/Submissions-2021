# Python program to 
# demonstrate creation of an 
# assistant using wolf ram API 
from tasks.speak import tts
from tasks.speak import rec_vic
import wolframalpha
from multiprocessing import Queue
qu = Queue()

def wolf(qu):
    try:
        # print
        qu.put("Feel free to ask any question.")
        tts.speak("feel free to ask any question.")
        # Taking input from user 
        question = rec_vic.nlproc(qu).lower()
        if question == "none":
            qu.put("I apologize, I am not able to answer.")
            tts.speak("I apologize, I am not able to answer.")
            return
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
        qu.put(answer)
        tts.speak(answer)
    except Exception:
        # print
        qu.put("I apologize, I am not able to answer.")
        tts.speak("I apologize, I am not able to answer.")
