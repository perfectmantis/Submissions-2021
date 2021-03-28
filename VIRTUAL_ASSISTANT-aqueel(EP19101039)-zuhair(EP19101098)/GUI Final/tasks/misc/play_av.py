from tasks.speak import tts
import os
import random
from multiprocessing import Queue
qu = Queue()

def music(qu):
    try:
        # print
        qu.put("Ok i am playing music .....")
        tts.speak("ok i am playing music")
        music_dir = './music'
        for lst in os.listdir(music_dir):
            if lst.endswith('.mp3'):
                music = os.listdir(music_dir)
        rnd = random.choice(music)
        os.startfile(os.path.join(music_dir,rnd))
    except Exception:
        # print
        qu.put("Not able to play music right now!")
        tts.speak("Not able to play music right now")

def video(qu):
    try:
        # print
        qu.put("Ok i am playing videos .....")
        tts.speak("ok i am playing videos")
        video_dir = './video'
        for lst in os.listdir(video_dir):
            if lst.endswith('.mp4'):
                videos = os.listdir(video_dir)
        rnd = random.choice(videos)
        os.startfile(os.path.join(video_dir,rnd))
    except Exception:
        # print
        qu.put("Not able to play video right now!")
        tts.speak("Not able to play video right now")