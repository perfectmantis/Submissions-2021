from time import sleep
from infi.systray import SysTrayIcon
import tkinter
from tkinter import *
import tkinter.ttk as ttk
from tkinter import simpledialog,messagebox #,scrolledtext
import multiprocessing as mp
from multiprocessing import Queue
qu = Queue()
var_thq = ""

def pa_strt(qu):
    from tasks.speak import welc
    from core import netck
    from tasks.speak import rec_vic
    from tasks import tasklist
    netck.netck(qu)
    welc.welcom(qu)
    while True:
        query = rec_vic.nlproc(qu).lower()
        #tasks
        tasklist.tsklst(query, qu)

class stat_chk():
    def __init__(self, _rt, _fnc, _tmdl):
        self.rt = _rt
        self.fnc = _fnc
        self.tmdl = _tmdl
        self.chk_rn = False

    def _chk_rn( self ): return self.chk_rn 

    def chk_stp( self ): self.chk_rn = False

    def chk_strt( self ):
        self.chk_rn = True
        self._go()

    def _go( self ):
        if self.chk_rn :
            self.fnc() 
            self.rt.after( self.tmdl, self._go)

class sys_tray():
    def __init__(self, _fnc):
        self.fnc = _fnc

    def pas_thq(self, sysTrayIcon):
        global var_thq 
        var_thq = "exit"

    def stray_dst(self, sysTrayIcon):
        self.systrayicon.shutdown()

    # def setng(self, sysTrayIcon):
    #     pass

    def stray_strt(self, sysTrayIcon):
        menu_options = ()# (('Settings', None, self.setng),)
        self.systrayicon = SysTrayIcon("va.ico", "Virtual Assistant", menu_options, on_quit=self.pas_thq)
        self.systrayicon.start()

class chk_thq():
    def __init__(self, _rt, _fnc):
        self.rt = _rt
        self.fnc = _fnc
    
    def thq_strt(self):
        self.fnc()
        self.rt.after(1 , self.thq_strt)

def main():
    class paGui(Frame):
        def __init__( self,  *args, **kwargs ):#master
            # self.master = master
            super().__init__(*args, **kwargs)
            # ensure a consistent GUI size
            self.grid_propagate(False)
            # implement stretchability
            self.grid_rowconfigure(0, weight=1)
            self.grid_columnconfigure(0, weight=1)

            self.lbl_conv = Label(self,text = "Conversation:",
                font=("calibri Bold", 12), bg='#fbf8f4', fg='#404446')
            # self.lbl_conv.grid(row=0, column=0, padx=4, pady=5, sticky=W)
            self.lbl_conv.place(x = 0,y = 0)

            # self.txt_conv = scrolledtext.ScrolledText(self, width=53, height=15,
            #     relief='flat', font=("calibri", 11))
            self.txt_conv = tkinter.Text(self, bg='#fbf8f4', fg='#404446')
            # self.txt_conv.grid(row=1, column=0, columnspan=2, padx=3)
            self.txt_conv.place(x = 0,y = 27,width = 290,height=290)
            self.txt_conv.tag_config('human', background="#009688", foreground="white")
            self.txt_conv.tag_config('va', background="lightgrey", foreground="black")
            self.txt_conv.tag_config('lst', background="lightblue", foreground="black")
            self.txt_conv.tag_config('g', background="white",
                foreground="white",font=("Open Sans", 2))

            self.scrollb = ttk.Scrollbar(self, command=self.txt_conv.yview)
            # self.scrollb.grid(row=2, column=1, sticky=E)
            self.txt_conv['yscrollcommand'] = self.scrollb.set
            self.scrollb.place(x = 290,y = 27,width = 10,height = 280)
            # place(x = 50,y = 50,width = 400,height = 400)

            self.btn_st = Button(self,text = "Start", command = self.mp_strt,
                font=("calibri bold", 10), fg = 'white', bg='#009688',
                relief='groove', border=2, activebackground='#1d2027', activeforeground='#009688',
                disabledforeground="#404446")
            # self.btn_st.grid(row=2, column=0, ipadx=10, padx=4, pady=5, sticky=W)
            self.btn_st.place(x = 25,y = 321,width = 50,height = 25)

            self.btn_stp = Button(self,text = "Stop", command = self.chk_of,
                font=("calibri bold", 10), fg = 'white', bg='#607d8b',
                relief='groove', border=2, activebackground='#1d2027', activeforeground='#9e9e9e')
            # self.btn_stp.grid(row=2, column=0, ipadx=10, padx=4, pady=5, sticky=E)
            self.btn_stp.place(x = 125,y = 321,width = 50,height = 25)

            self.btn_ext = Button(self,text = "Exit", command = self.ext,
                font=("calibri bold", 10), fg = 'white', bg='#de624b',
                relief='groove', border=2, activebackground='#1d2027', activeforeground='#de624b')
            # self.btn_ext.grid(row=2, column=1, ipadx=13, padx=4, pady=5, sticky=E)
            self.btn_ext.place(x = 225,y = 321,width = 50,height = 25)

            self.stat = stat_chk(self, self.chk_on, 1) # function
            self.tray_ico = sys_tray(self.ext)
            self.tray_ico.stray_strt(SysTrayIcon)
            self.lst_chk = 0
            self.chk_thq = chk_thq(self, self.thq_chker)
            self.chk_thq.thq_strt()

        def mp_strt( self ):
            self.btn_st.config(state=DISABLED)
            self.proc = mp.Process(target = pa_strt, args=(qu,))
            self.proc.daemon = True
            self.proc.start()
            self.stat.chk_strt()

        def chk_on( self ):
            if (self.proc.is_alive()):
                try:
                    self.txt_qu = qu.get(0)
                    if self.lst_chk == 1 and self.txt_qu == "Enter your name:" or self.lst_chk == 1 and self.txt_qu == "Find your name from the list and type:":
                        self.lst_chk = 0
                    if self.lst_chk == 1:
                        self.txt_conv.insert('end', self.txt_qu+"\n", 'lst')
                        self.txt_conv.insert('end', "\n",'g')
                    else:
                        if "PDFPG" in self.txt_qu:
                            self.USER_INP = simpledialog.askinteger(title="Page Number",
                                                        prompt="Enter Page Number:")
                            qu.put(self.USER_INP)
                            self.txt_conv.insert('end', "Page Number: "+(str(self.USER_INP))+"\n")
                            self.txt_conv.insert('end', "\n",'g')
                            sleep(1)
                        elif "REG1PER2" in self.txt_qu:
                            self.USER_INP = simpledialog.askstring(title="Name",
                                prompt="Enter Your Name:")
                            sleep(0.5)
                            if self.USER_INP == None:
                                qu.put(self.USER_INP)
                                self.txt_conv.insert('end', "CANCEL\n")
                                self.txt_conv.insert('end', "\n",'g')
                            elif self.USER_INP == "":
                                qu.put(self.USER_INP)
                            else:
                                self.txt_conv.insert('end', self.USER_INP+"\n")
                                self.txt_conv.insert('end', "\n",'g')
                                qu.put(self.USER_INP.lower())
                            sleep(0.5)
                        elif "CON1FAC2" in self.txt_qu:
                            self.txt_conv.insert('end', "Do I identifying you correctly?\n", 'va')
                            self.txt_conv.insert('end', "\n",'g')
                            self.USER_INP = messagebox.askyesnocancel("Answer",
                                "Do I identifying you correctly?")
                            if self.USER_INP == True:
                                self.txt_conv.insert('end', "YES\n")
                                self.txt_conv.insert('end', "\n",'g')
                            elif self.USER_INP == False:
                                self.txt_conv.insert('end', "NO\n")
                                self.txt_conv.insert('end', "\n",'g')
                            else:
                                self.txt_conv.insert('end', "CANCEL\n")
                                self.txt_conv.insert('end', "\n",'g')
                            qu.put(self.USER_INP)
                            sleep(1)
                        elif "ADD1FAC2" in self.txt_qu:
                            self.USER_INP = simpledialog.askstring(title="Name",
                                prompt="Enter Your Name:")
                            sleep(0.5)
                            if self.USER_INP == None:
                                qu.put(self.USER_INP)
                                self.txt_conv.insert('end', "CANCEL\n")
                                self.txt_conv.insert('end', "\n",'g')
                            elif self.USER_INP == "":
                                qu.put(self.USER_INP)
                            else:
                                self.txt_conv.insert('end', self.USER_INP+"\n")
                                self.txt_conv.insert('end', "\n",'g')
                                qu.put(self.USER_INP.lower())
                            sleep(0.5)
                        else:
                            if "You said" in (self.txt_qu.split(':')[0]):
                                self.txt_conv.insert('end', self.txt_qu+"\n", 'human')
                                self.txt_conv.insert('end', "\n",'g')
                            else:
                                if self.txt_qu == "These names are already registered:":
                                    self.lst_chk = 1
                                self.txt_conv.insert('end', self.txt_qu+"\n", 'va')
                                self.txt_conv.insert('end', "\n",'g')
                except:
                    pass
                self.txt_conv.see(tkinter.END)
            else:
                self.btn_st.config(state=NORMAL)
                self.stat.chk_stp()

        def chk_of( self ):
            self.stat.chk_stp()
            try:
                self.proc.terminate()
            except:
                pass
            self.btn_st.config(state=NORMAL)
            
        def ext( self ):
            self.tray_ico.stray_dst(SysTrayIcon)
            root.destroy()

        def thq_chker(self):
            global var_thq
            if var_thq:
                self.ext()

    root = Tk()
    setx = root.winfo_screenwidth()-(300+20)
    sety = root.winfo_screenheight()-(350+85)
    root.resizable(0, 0)
    root.geometry("300x350+%d+%d"%(setx,sety))
    # root.wm_attributes('-transparent','white')
    # root.configure(bg='#20232a')
    # root.overrideredirect(True)
    gui = paGui(root)
    gui.pack(fill="both", expand=True)
    gui.config(width=600, height=600, relief=FLAT, bg='#fbf8f4')
    gui.txt_conv.config(font=("Open Sans", 10), undo=True, wrap='word')
    gui.txt_conv.config(relief="flat")
    root.title("Virtual Assistant")
    root.iconbitmap("va.ico")
    style = ttk.Style()
    style.theme_use('clam')
    root.mainloop()

if __name__ == "__main__": 
    main()
