from selenium import webdriver
# from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time

def account_info():
    try:
        with open('data\\account_info.txt', 'r') as f:
            info = f.read().split()
            email = info[0]
            password = info[1]
        return email,password
    except Exception:
        email = password = ""
        return email,password

def fb_login():
    try:
        email,password = account_info()
        # options = Options() 
        options = Options().add_argument("start-maximized")
        driver = webdriver.Chrome(options = options)

        driver.get("https://www.facebook.com/login/")

        email_xpath = '//*[@id="email"]'
        password_xpath = '//*[@id="pass"]'
        login_xpath = '//*[@id="loginbutton"]'

        time.sleep(2)

        driver.find_element_by_xpath(email_xpath).send_keys(email)
        time.sleep(0.5)
        driver.find_element_by_xpath(password_xpath).send_keys(password)
        time.sleep(0.5)
        driver.find_element_by_xpath(login_xpath).click()
        time.sleep(0.5)
    except:
        return

