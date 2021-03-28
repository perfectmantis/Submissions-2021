import smtplib
from multiprocessing import Queue
qu = Queue()

def account_info():
    try:
        with open('data\\account_info.txt', 'r') as f:
            info = f.read().split()
            email = info[2]
            password = info[3]
        return email,password
    except Exception:
        email = password = ""
        return email,password


def sendEmail(to, content, qu):
    try:
        email,password = account_info()
        server = smtplib.SMTP('smtp.gmail.com',587)
        server.ehlo()
        server.starttls()
        server.login(email,password)
        server.sendmail(email,to, content)
        server.close()
    except Exception as err:
        # print
        qu.put(err)

# email,password = account_info()

