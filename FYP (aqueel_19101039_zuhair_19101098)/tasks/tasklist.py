from tasks.speak import tts
from tasks.speak import rec_vic
from tasks.vision.rec_gen import gender
from tasks.vision.rec_fac import create_dataset,recognize
from tasks.misc import wiki,open_browser,fbot,youtube,google,play_av,rd_pdf
from tasks.misc import notepad,sleep,sys,ip,memail,wolf,chatbot
import random
import pyjokes

def tsklst(query):
    if "wikipedia" in query:
        wiki.wiki()
    elif 'open youtube' in query:
        youtube.open_youtube()
    elif 'youtube' in query or "open video online" in query:
        youtube.youtube()
    elif 'open github' in query:
        open_browser.open_github()
    elif 'open facebook' in query:
        open_browser.open_facebook()
    elif 'login facebook' in query:
        fbot.fb_login()   
    elif 'open instagram' in query:
        open_browser.open_instagram() 
    elif 'open google' in query:
        google.open_google()
    elif 'search google' in query :
        google.search_google()
    elif 'open yahoo' in query:
        open_browser.open_yahoo()  
    elif 'open gmail' in query:
        open_browser.open_gmail()
    elif 'open snapdeal' in query:
        open_browser.open_snapdeal
    elif 'open amazon' in query or 'shop online' in query:
        open_browser.open_amazon()
    elif 'open flipkart' in query:
        open_browser.open_flipkart() 
    elif 'open ebay' in query:
        open_browser.open_ebay()
    elif 'close chrome' in query:
        open_browser.close_chrome()
    elif 'music from pc' in query or "music" in query or "play music" in query:
        play_av.music()
    elif 'video from pc' in query or "video" in query or "play video" in query:
        play_av.video()
    elif "write note" in query:
        notepad.write_note()
    elif 'show note' in query :
        notepad.open_note()
    elif 'close note' in query :
        notepad.close_note()
    elif 'read pdf' in query :
        rd_pdf.pdf_read()
    elif 'ip address' in query :
        ip.ip()
    elif 'joke' in query:
        tts.speak(pyjokes.get_joke())
    elif 'send email' in query or 'email' in query:
        try:
            tts.speak("what should I type?")
            print("What should I type?")
            query = rec_vic.nlproc().lower()
            to = "im.aqueel@gmail.com"
            memail.sendEmail(to, query)
            tts.speak("Email has been sent!")
            print("Email has been sent!")
        except Exception as err:
            print(err)
            # tts.speak("I am not able to send email.")
    elif 'switch window' in query:
        sys.switch_window()
    elif "shutdown system" in query:
        sys.shutdown_system()
    elif "cancel shutdown" in query:
        sys.abort_shutdown_system()
    elif "restart system" in query:
        sys.restart_system()
    elif "sleep system" in query:
        sys.sleep_system()
    elif "hibernate" in query:
        sys.hibernate()
    elif "log off" in query:
        sys.log_off()
    elif 'time' in query or 'what time is it?' in query:
        sys.tell_time()
    elif 'date' in query or 'what date today?' in query:
        sys.tell_date()
    elif 'exit' in query or 'abort' in query or 'stop' in query or 'bye' in query or 'quit' in query or 'good bye' in query:
        ex_exit = ['good bye','ok','see you later']
        ans_q = random.choice(ex_exit)
        tts.speak(ans_q)
        print(ans_q)
        exit()
    elif 'sleep' in query:
        sleep.sleep()
    elif "what's up" in query or 'how are you' in query:
        stMsgs = ['Just doing my thing!', 'I am fine!', 'Nice!', 'I am nice and full of energy','i am ok !']
        ans_q = random.choice(stMsgs)
        tts.speak(ans_q)
        print(ans_q)
        tts.speak("Tell me about you!")
        how_are_you = rec_vic.nlproc().lower()
        if 'fine' in how_are_you or 'happy' in how_are_you or 'ok' in how_are_you:
            tts.speak("Good!")
            print("Good!") 
        elif 'not good' in how_are_you or 'sad' in how_are_you or 'upset' in how_are_you:
            tts.speak("oh sorry")  
            print("Oh, sorry!") 
    elif "who are you" in query or "about you" in query or "your details" in query:
        tts.speak("I am your virtual assistent an A I based computer program. Ok Lets Start!")
        print("I am your virtual assistent an A I based computer program. Ok Lets Start!")
    elif "hello" in query or "hello assistant" in query:
        id = recognize.main()
        titl = ""
        if id == "" or id == "Unknown":
            gen = gender.regen()
            id = ""
            if gen == 'Male':
                titl = 'Sir'
            elif gen == 'Female':
                titl = 'Miss'
            else:
                titl=""
        tts.speak("Hello! "+titl+id+" How May I Help you?")
        print("Hello! "+titl+id+" How May I Help you?")
    elif "your name" in query or "sweat name" in query:
        tts.speak("I have no name I am just a virtual assistent.")
        print("I have no name I am just a virtual assistent.")
    elif "answer me" in query:
        wolf.wolf()
    elif "recognise me" in query:
        tts.speak("Let see, how you are?")
        print("Let see, how you are?")
        id = recognize.main()
        if id == "" or id == "Unknown":
            tts.speak("I don't know you.")
            print("I don't know you.")
        else:
            tts.speak("I know you. Your name is "+id)
            print("I know you. Your name is "+id)
    elif "register identity" in query:
        tts.speak("Face registration in progress.")
        print("Face registration in progress .....")
        create_dataset.reg_me()
        tts.speak("Face registration complete.")
        print("Face registration complete .....")
    elif "add face data" in query:
        tts.speak("Face data entry in progress.")
        print("Face data entry in progress .....")
        create_dataset.add_face()
        tts.speak("Face data entry in complete.")
        print("Face data entry in complete .....")
    else:
        chatbot.chat(query)