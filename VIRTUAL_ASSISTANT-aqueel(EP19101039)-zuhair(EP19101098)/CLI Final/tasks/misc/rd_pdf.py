from tasks.speak import tts
import PyPDF2

def pdf_read():
    try:
        book = open('PDFs\\read.pdf','rb') # enter PDF name by replacing 'read'
        pdfreader = PyPDF2.PdfFileReader(book)
        pages = pdfreader.numPages
        tts.speak(f"Total pages are: {pages}")
        print(f"Total pages are: {pages}")
        tts.speak("which page i have to read?")
        print("Which page I have to read?")
        rdpg = int(input("Enter page number. "))
        rdpg = rdpg - 1
        page = pdfreader.getPage(rdpg)
        text = page.extractText()
        tts.speak(text)
    except Exception:
        tts.speak("Not able to read anything!")
        print("Not able to read anything!")
