from tasks.speak import welc
from core import netck
from tasks.speak import rec_vic
from tasks import tasklist
import os
#import googletrans

#gt = googletrans.Translator()

# main function                               
if __name__ == "__main__":
    os.system("cls")
    welc.welcom()
    netck.netck()
    while True:
        query = rec_vic.nlproc().lower()
        #tasks
        tasklist.tsklst(query)
