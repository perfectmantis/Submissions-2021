from tasks.speak import tts
import PyPDF2
from multiprocessing import Queue
from time import sleep
qu = Queue()

def pdf_read(qu):
    try:
        book = open('PDFs\\read.pdf','rb') # enter PDF name by replacing 'read'
        pdfreader = PyPDF2.PdfFileReader(book)
        pages = pdfreader.numPages
        # print
        qu.put(f"Total pages are: {pages}")
        tts.speak(f"Total pages are: {pages}")
        # print
        qu.put("Which page I have to read?")
        tts.speak("which page i have to read?")
        qu.put("PDFPG")
        sleep(1)
        while qu.empty() == True:
            # if qu.empty == False:
            #     break
            pass
        rdpg = qu.get(0)
        # rdpg = int(input("Enter page number. "))
        rdpg = rdpg - 1
        page = pdfreader.getPage(rdpg)
        text = page.extractText()
        tts.speak(text)
    except Exception:
        # print
        qu.put("Not able to read anything!")
        tts.speak("Not able to read anything!")
