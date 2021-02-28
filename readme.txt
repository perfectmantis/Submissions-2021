1)Create an account on firebase
2)Create a new project over there
3)Go to project overview and then project settings
4)Copy the firebase config assigned to you
5)Paste this all in config of main.py
6)Go in authentication and then in sign in method and enable email and password feature.
6)Other than that some dependencies to be installed for flask and firebase:
pip install flask
pip install pyrebase4
pip install firebase
7)For running yolov5 inferences other dependencies are given in requirements.txt file which must be installed.

extras:
when model is tested yolov5 results are saved in runs folder!!!

note(important):
https://github.com/ultralytics/yolov5
clone yolov5 repo from here!!
use best.pt weight for inferences!