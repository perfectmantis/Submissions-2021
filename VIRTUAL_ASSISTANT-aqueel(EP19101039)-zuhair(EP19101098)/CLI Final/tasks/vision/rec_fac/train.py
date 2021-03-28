import cv2
import imutils.paths as paths
import face_recognition
import pickle
import os

def main():
    try:
        # Create target Directory
        os.mkdir("tasks\\vision\\rec_fac\\models")
    except:
        pass
    dataset = "tasks\\vision\\rec_fac\\dataset\\"
    module = "tasks\\vision\\rec_fac\\models\\encoding.pickle"
    enc="tasks\\vision\\rec_fac\\models\\en"
    nm="tasks\\vision\\rec_fac\\models\\nm"
    imagepaths = list(paths.list_images(dataset))
    try:
        knownEncodings = pickle.loads(open(enc, "rb").read())
    except Exception:
        knownEncodings = []
    try:
        knownNames = pickle.loads(open(nm, "rb").read())
    except Exception:
        knownNames = []

    for (i, imagePath) in enumerate(imagepaths):
        print("[INFO] processing image {}/{}".format(i + 1,len(imagepaths)))
        name = imagePath.split(os.path.sep)[-2]
        image = cv2.imread(imagePath)
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)	
        boxes = face_recognition.face_locations(rgb, model= "hog")
        encodings = face_recognition.face_encodings(rgb, boxes)
        for encoding in encodings:
            knownEncodings.append(encoding)
            knownNames.append(name)
            print("[INFO] serializing encodings...")
            data = {"encodings": knownEncodings, "names": knownNames}
            output = open(module, "wb") 
            pickle.dump(data, output)
            output.close()

            encdata = knownEncodings
            encoutput = open(enc, "wb") 
            pickle.dump(encdata, encoutput)
            encoutput.close()

            nmdata = knownNames
            nmoutput = open(nm, "wb") 
            pickle.dump(nmdata, nmoutput)
            nmoutput.close()
    delfol = os.listdir(dataset)
    for i in delfol:
        os.system("rmdir /s / q " + dataset + "\"" + i + "\"")
