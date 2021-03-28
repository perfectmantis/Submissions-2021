from tasks.speak import tts
from tasks.speak import rec_vic
from tasks.vision.rec_gen import gender
from tasks.vision.rec_fac import create_dataset,recognize
from tasks.misc import wiki,open_browser,fbot,youtube,google,play_av,rd_pdf
from tasks.misc import notepad,sleep_wake,sys,ip,memail,wolf,chatbot
import random
import pyjokes
from multiprocessing import Queue
qu = Queue()

def tsklst(query, qu):
    if "wikipedia" in query:
        wiki.wiki(qu)
    elif 'open youtube' in query:
        youtube.open_youtube(qu)
    elif 'youtube' in query or "open video online" in query:
        youtube.youtube(qu)
    elif 'open github' in query:
        open_browser.open_github(qu)
    elif 'open facebook' in query:
        open_browser.open_facebook(qu)
    elif 'login facebook' in query:
        fbot.fb_login()   
    elif 'open instagram' in query:
        open_browser.open_instagram(qu) 
    elif 'open google' in query:
        google.open_google(qu)
    elif 'search google' in query :
        google.search_google(qu)
    elif 'open yahoo' in query:
        open_browser.open_yahoo(qu)  
    elif 'open gmail' in query:
        open_browser.open_gmail(qu)
    elif 'open snapdeal' in query:
        open_browser.open_snapdeal(qu)
    elif 'open amazon' in query or 'shop online' in query:
        open_browser.open_amazon(qu)
    elif 'open flipkart' in query:
        open_browser.open_flipkart(qu) 
    elif 'open ebay' in query:
        open_browser.open_ebay(qu)
    elif 'close chrome' in query:
        open_browser.close_chrome(qu)
    elif 'music from pc' in query or "music" in query or "play music" in query:
        play_av.music(qu)
    elif 'video from pc' in query or "video" in query or "play video" in query:
        play_av.video(qu)
    elif "write note" in query:
        notepad.write_note(qu)
    elif 'show note' in query :
        notepad.open_note(qu)
    elif 'close note' in query :
        notepad.close_note(qu)
    elif 'read pdf' in query or 'pdf' in query:
        rd_pdf.pdf_read(qu)
    elif 'ip address' in query :
        ip.ip(qu)
    elif 'joke' in query:
        jok = (pyjokes.get_joke())
        # print
        qu.put(jok)
        tts.speak(jok)
    elif 'send email' in query or 'email' in query:
        try:
            # print
            qu.put("What should I type?")
            tts.speak("what should I type?")
            query = rec_vic.nlproc(qu).lower()
            to = "im.aqueel@gmail.com"
            memail.sendEmail(to, query, qu)
            # print
            qu.put("Email has been sent!")
            tts.speak("Email has been sent!")
        except Exception as err:
            # print
            qu.put(err)
            tts.speak("I am afraid I can't do this.")
    elif 'switch window' in query:
        sys.switch_window(qu)
    elif "shutdown system" in query:
        sys.shutdown_system(qu)
    elif "cancel shutdown" in query:
        sys.abort_shutdown_system(qu)
    elif "restart system" in query:
        sys.restart_system(qu)
    elif "sleep system" in query:
        sys.sleep_system(qu)
    elif "hibernate" in query:
        sys.hibernate(qu)
    elif "log off" in query:
        sys.log_off(qu)
    elif 'time' in query or 'what time is it?' in query:
        sys.tell_time(qu)
    elif 'date' in query or 'what date today?' in query:
        sys.tell_date(qu)
    elif 'exit' in query or 'abort' in query or 'stop' in query or 'bye' in query or 'quit' in query or 'good bye' in query:
        ex_exit = ['Good bye','Ok','See you later']
        ans_q = random.choice(ex_exit)
        # print
        qu.put(ans_q)
        tts.speak(ans_q)
        exit()
    elif 'sleep' in query:
        sleep_wake.sleep_wake(qu)
    elif "what's up" in query or 'how are you' in query:
        stMsgs = ['Just doing my thing!', 'I am fine!', 'Nice!', 'I am nice and full of energy','I am ok!']
        ans_q = random.choice(stMsgs)
        # print
        qu.put(ans_q)
        tts.speak(ans_q)
        # print
        qu.put("Tell me about you!")
        tts.speak("Tell me about you!")
        how_are_you = rec_vic.nlproc(qu).lower()
        if 'fine' in how_are_you or 'happy' in how_are_you or 'ok' in how_are_you:
            # print
            qu.put("Good!")
            tts.speak("Good!")
        elif 'not good' in how_are_you or 'sad' in how_are_you or 'upset' in how_are_you:
            # print
            qu.put("Oh, sorry!")
            tts.speak("oh sorry")
    elif "who are you" in query or "about you" in query or "your details" in query:
        # print
        qu.put("I am your virtual assistant. AI based computer program.")
        tts.speak("I am your virtual assistant. A I based computer program.")
    elif "hello" in query or "hello assistant" in query:
        id = recognize.main()
        titl = ""
        if id == "" or id == "Unknown":
            gen = gender.regen(qu)
            id = ""
            if gen == 'Male':
                titl = 'Sir'
            elif gen == 'Female':
                titl = 'Miss'
            else:
                titl=""
        # print
        qu.put("Hello! "+titl+id+" How May I Help you?")
        tts.speak("Hello! "+titl+id+" How May I Help you?")
    elif "your name" in query or "sweat name" in query:
        # print
        qu.put("Call me whatever you want. I have no name.")
        tts.speak("Call me whatever you want. I have no name.")
    elif "answer me" in query:
        wolf.wolf(qu)
    elif "recognize me" in query or "recognize" in query or "recognise me" in query or "recognise" in query or "do you know me" in query or "you know me" in query or "know me" in query:
        # print
        qu.put("Let see, who you are?")
        tts.speak("Let see, who you are?")
        id = recognize.main()
        if id == "" or id == "Unknown":
            # print
            qu.put("I don't know you.")
            tts.speak("I don't know you.")
        else:
            # print
            qu.put("I know you. Your name is "+id)
            tts.speak("I know you. Your name is "+id)
    elif "register identity" in query or "register face" in query or "identity" in query or "register me" in query:
        # print
        qu.put("Face registration in progress .....")
        tts.speak("Face registration in progress.")
        create_dataset.reg_me(qu)
        # print
        qu.put("Process complete.")
        tts.speak("Process complete.")
    elif "add face data" in query or "face data" in query:
        # print
        qu.put("Face data entry in progress .....")
        tts.speak("Face data entry in progress.")
        create_dataset.add_face(qu)
        # print
        qu.put("Process complete.")
        tts.speak("Process complete.")
    else:
        chatbot.chat(query, qu)
