import cv2

def highlightFace(net, frame, conf_threshold=0.7):
    try:
        frameOpencvDnn=frame.copy()
        frameHeight=frameOpencvDnn.shape[0]
        frameWidth=frameOpencvDnn.shape[1]
        blob=cv2.dnn.blobFromImage(frameOpencvDnn, 1.0, (300, 300), [104, 117, 123], True, False)
        net.setInput(blob)
        detections=net.forward()
        faceBoxes=[]
        for i in range(detections.shape[2]):
            confidence=detections[0,0,i,2]
            if confidence>conf_threshold:
                x1=int(detections[0,0,i,3]*frameWidth)
                y1=int(detections[0,0,i,4]*frameHeight)
                x2=int(detections[0,0,i,5]*frameWidth)
                y2=int(detections[0,0,i,6]*frameHeight)
                faceBoxes.append([x1,y1,x2,y2])
                #cv2.rectangle(frameOpencvDnn, (x1,y1), (x2,y2), (0,255,0), int(round(frameHeight/150)), 8)
        return frameOpencvDnn,faceBoxes
    except AssertionError as err:
        # regen()
        print(err)
    except Exception as err:
        # regen()
        print(err)

def regen():
    gender=""
    try:
        faceProto="tasks\\vision\\rec_gen\\ofd.pbtxt"
        faceModel="tasks\\vision\\rec_gen\\ofd_uint8.pb"
        genderProto="tasks\\vision\\rec_gen\\gd.prototxt"
        genderModel="tasks\\vision\\rec_gen\\gn.caffemodel"
    ##    faceProto="ofd.pbtxt"
    ##    faceModel="ofd_uint8.pb"
    ##    genderProto="gd.prototxt"
    ##    genderModel="gn.caffemodel"

        MODEL_MEAN_VALUES=(78.4263377603, 87.7689143744, 114.895847746)
        genderList=['Male','Female']
        faceNet=cv2.dnn.readNet(faceModel,faceProto)
        genderNet=cv2.dnn.readNet(genderModel,genderProto)
        video=cv2.VideoCapture(0, cv2.CAP_DSHOW)
        padding=20
        cap=0
    
        while cap < 10 : #cv2.waitKey(1)<0
            hasFrame,frame=video.read()
            if not hasFrame:
                cv2.waitKey()
                break
            
            resultImg,faceBoxes=highlightFace(faceNet,frame)
            #if not faceBoxes:
            #    print()

            for faceBox in faceBoxes:
                face=frame[max(0,faceBox[1]-padding):
                        min(faceBox[3]+padding,frame.shape[0]-1),max(0,faceBox[0]-padding)
                        :min(faceBox[2]+padding, frame.shape[1]-1)]
                blob=cv2.dnn.blobFromImage(face, 1.0, (227,227), MODEL_MEAN_VALUES, swapRB=False)
                genderNet.setInput(blob)
                genderPreds=genderNet.forward()
                gender=genderList[genderPreds[0].argmax()]
                #print(f'{gender}')
                #cv2.putText(resultImg, f'{gender}', (faceBox[0], faceBox[1]-10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2, cv2.LINE_AA)
                #cv2.imshow("Detecting gender", resultImg)
            cap = cap + 1
    except AssertionError as err:
        # regen()
        print(err)
    except Exception as err:
        # regen()
        print(err)

    try:
        video.release()
        cv2.destroyAllWindows()
        return gender
    except:
        return gender

#if __name__ == "__main__":
#    print(regen())
# Traceback (most recent call last):
#   File "C:\Users\Misa\Desktop\FYP\Gender-and-Age-Detection-master\gender.py", line 53, in <module>
#     blob=cv2.dnn.blobFromImage(face, 1.0, (227,227), MODEL_MEAN_VALUES, swapRB=False)
# cv2.error: OpenCV(4.5.1) C:\Users\appveyor\AppData\Local\Temp\1\pip-req-build-i1s8y2i1\opencv\modules\imgproc\src\resize.cpp:4051:
#     error: (-215:Assertion failed) !ssize.empty() in function 'cv::resize'
