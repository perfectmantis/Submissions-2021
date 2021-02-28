import os
import cv2
import pickle
from tasks.vision.rec_fac import recognize,train
from tasks.speak import tts

id = ""
nmS = ""
def chk_nm():
    global nmS
    nm="tasks\\vision\\rec_fac\\models\\nm"
    try:
        nmS = pickle.loads(open(nm, "rb").read())
    except Exception:
        pass

def nmSlist():
    global nmS
    nmSlst = []
    for i in nmS:
        if i not in nmSlst:
            nmSlst.append(i)
    print(*nmSlst,sep="\n")

def reg_me():
    global id,nmS
    chk_nm()
    nmSlist()
    tts.speak("Enter your name")
    while True:
        id = input('Enter your name: ')
        if id == "cancel":
            return
        if id in nmS:
            tts.speak("Name already exist. Type again or Type 'cancel' to abort.")
            print("Name already exist. Type again or Type 'cancel' to abort.")
        else:
            main()
            break

def add_face():
    global id,nmS
    chk_nm()
    id = recognize.main()
    print(id)
    if id == "" or id == "Unknown":
        tts.speak("Data not found")
        print ("Data not found!")
        return
    else:
        tts.speak("Do I recognise you correctly? Type 'y' for Yes, 'n' for No or anything else to abort.")
        conf = input("Do I recognise you correctly? Type 'y' for Yes, 'n' for No or anything else to abort: ")
        if conf == "y":
            pass
        elif conf == "n":
            nmSlist()
            while True:
                tts.speak("Find your name from the list and type here or Type 'cancel' to abort")
                nam = input("Find your name from the list and type here or Type 'cancel' to abort: ")
                if nam == "cancel":
                    return
                if nam in nmS:
                    break
                else:
                    tts.speak("Incorrect entry")
                    print("Incorrect entry!")
        else:
            tts.speak("Invalid entry")
            print("Invalid entry!")
            return
    main()

def main():
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
        print("Directory " , path+str(id),  " Created ")
        sampleN=1
    except FileExistsError:
        print("Directory " , path+str(id) ,  " already exists")
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

