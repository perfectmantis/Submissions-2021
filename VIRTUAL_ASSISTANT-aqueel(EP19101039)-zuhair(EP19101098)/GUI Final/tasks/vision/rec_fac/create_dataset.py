import os
import cv2
import pickle
from time import sleep
from tasks.vision.rec_fac import recognize,train
from tasks.speak import tts
from multiprocessing import Queue
qu = Queue()

id = ""
nmS = ""
def chk_nm():
    global nmS
    nm="tasks\\vision\\rec_fac\\models\\nm"
    try:
        nmS = pickle.loads(open(nm, "rb").read())
    except Exception:
        pass

def nmSlist(qu):
    global nmS
    nmSlst = []
    for i in nmS:
        if i not in nmSlst:
            nmSlst.append(i)
    if not nmSlst:
        pass
    else:
        qu.put("These names are already registered:")
        tts.speak("These names are already registered:")
        for i in nmSlst:
            # print(*nmSlst,sep="\n")
            qu.put(i)
            sleep(0.1)

def reg_me(qu):
    global id,nmS
    chk_nm()
    nmSlist(qu)
    qu.put("Enter your name:")
    tts.speak("Enter your name.")
    while True:
        qu.put("REG1PER2")
        sleep(1)
        while qu.empty() == True:
            pass
        #print >>> Input
        id = qu.get(0)
        if id == None:
            tts.speak("Canceled.")
            return
        elif id == "":
            pass
        elif id in nmS:
            # print
            qu.put("Name already exist. Type again.")
            tts.speak("Name already exist. Type again.")
        else:
            break
    main(qu)

def add_face(qu):
    global id,nmS
    chk_nm()
    id = recognize.main()
    if id == "" or id == "Unknown":
        # print
        qu.put("Data not found!")
        tts.speak("Data not found")
        return
    else:
        # print
        qu.put("Are you? "+id)
        tts.speak("Are you?, "+id)
        # print
        tts.speak("Do I identifying you correctly?")
        qu.put("CON1FAC2")
        sleep(0.5)
        while qu.empty() == True:
            pass
        #print >>> Input
        conf = qu.get(0)
        if conf == True:
            main(qu)
            return
        elif conf == False:
            nmSlist(qu)
            #print
            qu.put("Find your name from the list and type:")
            tts.speak("Find your name from the list and type.")
            while True:
                qu.put("ADD1FAC2")
                sleep(1)
                while qu.empty() == True:
                    pass
                #print >>> Input
                nam = qu.get(0)
                if nam == None:
                    tts.speak("Canceled.")
                    return
                elif nam in nmS:
                    main(qu)
                    return
                else:
                    qu.put("Name does not match! Type again.")
                    tts.speak("Name does not match. Type again.")
        else:
            # print
            tts.speak("Canceled.")
            return

def main(qu):
    global id
    path = "tasks\\vision\\rec_fac\\dataset\\"
    face_cascade = cv2.CascadeClassifier('tasks\\vision\\rec_fac\\haar\\haarcascade_frontalface_default.xml')
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    try:
        # Create target Directory
        os.mkdir(path)
    except:
        pass

    sampleN=0
    try:
        # Create target Directory
        os.mkdir(path+str(id))
        # print
        qu.put("Directory \"" + path+str(id)+  "\" Created ")
        sampleN=1
    except FileExistsError:
        # print
        qu.put("Directory \"" + path+str(id) +  "\" already exists")
        lst = os.listdir(path+str(id))
        for lst in os.listdir(path+str(id)):
            if lst.endswith('.jpg') :
                try:
                    n=int(os.path.splitext(lst)[0])
                except:
                    pass
                if sampleN <=n:
                    sampleN = n
        sampleN=sampleN+1
    stp = sampleN
    try:
        while True:
            ret, img = cap.read()
            frame = img.copy()
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.3, 5)
            for (x,y,w,h) in faces:
                cv2.imwrite(path+str(id)+ "\\" +str(sampleN)+ ".jpg",frame[y:y+h, x:x+w])#, gray[y:y+h, x:x+w])
                sampleN=sampleN+1
                cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)
                cv2.putText(img, "Image count: "+str(sampleN), (10, 20), cv2.FONT_HERSHEY_SIMPLEX,0.75, (0, 255, 0), 1)
                cv2.waitKey(100)
            cv2.imshow('img',img)
            cv2.waitKey(1)
            if sampleN - stp >= 50:
                break

        cap.release()
        cv2.destroyAllWindows()
        train.main()
    except:
        return

