import pyrebase
import os
from flask import *
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 1024*1024*2
app.config['UPLOAD_EXTENSIONS'] = ['.jpg', '.png', '.gif', '.jfif']
app.config['UPLOAD_PATH'] = 'static\\uploads'
config = {
	"apiKey": "AIzaSyBzNKpyWA3IZylmoADID5UydcyQNgD1tz4",
    "authDomain": "test-6d43b.firebaseapp.com",
    "databaseURL": "https://test-6d43b-default-rtdb.firebaseio.com",
    "projectId": "test-6d43b",
    "storageBucket": "test-6d43b.appspot.com",
    "messagingSenderId": "673745269646",
    "appId": "1:673745269646:web:0c879c0156a16e71eeaadf",
    "measurementId": "G-LXQ63VSK3Q"
}
global ID
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()


@app.route('/upload', methods=['GET', 'POST'])
def uploads():
    if request.method == 'POST':
       uploaded_file = request.files.get('file')
       if uploaded_file.filename != '':
           file_ext = os.path.splitext(uploaded_file.filename)[1]
           if file_ext not in app.config['UPLOAD_EXTENSIONS']:
               abort(400)
       file = uploaded_file.filename
       print(file)
       os.system(f"python detect.py --weights best.pt --conf 0.4 --source {file}")
          # path = os.path.join(app.config['UPLOAD_PATH'], uploaded_file.filename)
           #uploaded_file.save(path)
           #files = os.listdir(app.config['UPLOAD_PATH'])
           #files = uploaded_file.filename
           #print(files)
           #return render_template('view.html', upfiles = files)



    return render_template('uploads.html')

@app.route('/uploads/<filename>')
def upload(filename):
    return send_from_directory(app.config['UPLOAD_PATH'], filename)


@app.route('/')
@app.route('/index',  methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        email = request.form['user_email']
        password = request.form['user_pwd']
        try:
            auth.sign_in_with_email_and_password(email, password)
            return redirect(url_for('uploads'))

        except:
            unsuccessful = 'Please check your credentials'
            return render_template('index.html',vmsg = unsuccessful)
    return render_template('index.html')


@app.route('/create_account',  methods=['GET', 'POST'])
def create_account():
    if request.method == 'POST':
        pwd0 = request.form['user_pwd0']
        pwd1 = request.form['user_pwd1']
        if pwd0 == pwd1:
            try:
             uname = request.form['uname']
             fname = request.form['fname']
             y = request.form['x']
             email = request.form['user_email']
             password = request.form['user_pwd1']
             auth.create_user_with_email_and_password(email, password)
             user = auth.sign_in_with_email_and_password(email, password)
             user = auth.refresh(user['refreshToken'])
             id = user['userId']
             if y == '3':
               data = {'Id':id, 'User Name':uname, 'Father Name':fname, 'Type':"Student"}
               db.child("users").child(id).set(data)
             elif y=='2':
                data = {'Id':id, 'User Name': uname, 'Father Name': fname, 'Type': "Employee/Teacher"}
                db.child("users").child(id).set(data)
             #print(uname, fname, y, id)
             return render_template('index.html')
            except:
              acc_exist = 'This Email exists or password may be short(min:6chars)'
              return render_template('create_account.html', exist_message = acc_exist)

    return render_template('create_account.html')


@app.route('/del2', methods = ['GET', 'POST'])
def delete2():
   if request.method == 'POST':
       uname=request.form['uname']
       fname = request.form['fname']
       y = request.form['x']
       print('updated')
       return delete3(uname,fname, y)

   return render_template('del2.html')


@app.route('/del1', methods = ['GET', 'POST'])
def delete1():
    if request.method == 'POST':
        email = request.form['user_email']
        password = request.form['user_pwd']
        try:
            global ID
            auth.sign_in_with_email_and_password(email, password)
            user = auth.sign_in_with_email_and_password(email, password)
            user = auth.refresh(user['refreshToken'])
            ID = user['userId']
            #user = db.child("users").order_by_child("ID").equal_to(id).get()
           # for person in user.each():
           #     uname = person.val()['User Name']
          #      fname = person.val()['Father Name']
            #    type = person.val()['Type']

            print('returning')
            return redirect(url_for('delete2'))
        except:
            unsuccessful = 'Please check your credentials'
            return render_template('del1.html', vmsg=unsuccessful)
    return render_template('del1.html')


def delete3(uname, fname, y):
    global ID
    print(ID)
    if y == '3':
        db.child("users").child(ID).update({'User Name': uname, 'Father Name': fname, 'Type': "Student"})
    elif y == '2':
        db.child("users").child(ID).update({'User Name': uname, 'Father Name': fname, 'Type': "Employee/Teacher"})
    print(uname, fname)
    message = 'Updated'
    return render_template('index.html', vmsg=message)


@app.route('/reset_pwd', methods = ['GET', 'POST'])
def forgot_pwd():
    if request.method == 'POST':
        email = request.form['user_email']
        auth.send_password_reset_email(email)
        msg='reset password link sent to your email account'
        return render_template('index.html', vmsg=msg)
    return render_template('reset_password.html')


if __name__ == '__main__':
  app.run()