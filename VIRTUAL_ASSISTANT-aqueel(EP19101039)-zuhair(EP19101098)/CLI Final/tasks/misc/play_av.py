from tasks.speak import tts
import os
import random

def music():
    try:
        tts.speak("ok i am playing music")
        print("ok i am playing music .....")
        music_dir = './music'
        for lst in os.listdir(music_dir):
            if lst.endswith('.mp3'):
                music = os.listdir(music_dir)
        rnd = random.choice(music)
        os.startfile(os.path.join(music_dir,rnd))
    except Exception:
        tts.speak("Not able to play music right now")
        print("Not able to play music right now!")

def video():
    try:
        tts.speak("ok i am playing videos")
        print("ok i am playing videos .....")
        video_dir = './video'
        for lst in os.listdir(video_dir):
            if lst.endswith('.mp4'):
                videos = os.listdir(video_dir)
        rnd = random.choice(videos)
        os.startfile(os.path.join(video_dir,rnd))
    except Exception:
        tts.speak("Not able to play video right now")
        print("Not able to play video right now!")