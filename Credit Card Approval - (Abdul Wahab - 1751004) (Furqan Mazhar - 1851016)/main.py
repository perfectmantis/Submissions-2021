import tkinter as tk
from Training_Model import *

Model = tk.Tk()
Model.wm_title('Credit Card Approval')
icon = tk.PhotoImage(file='Icon\\16x16.png')
Model.iconphoto(False, icon)


canvas1 = tk.Canvas(Model, width = 600, height = 600,  relief = 'raised')
canvas1.pack()
label1 = tk.Label(Model, text='Credit Card Approval')
label1.config(font=('helvetica', 14))
canvas1.create_window(300, 25, window=label1)

Labels = []
Inputs = []
ctslist = [1, 2, 7, 10, 13, 14]
inputoptions = [['b','a'],['u','y','l','t'],['g', 'p', 'gg'], ['c', 'd', 'cc', 'i', 'j', 'k', 'm', 'r', 'q', 'w', 'x', 'e', 'aa', 'ff'],
                ['v', 'h', 'bb', 'j', 'n', 'z', 'dd', 'ff', 'o'], ['t', 'f'], ['t', 'f'], ['t', 'f'], ['g', 'p', 's']]
index = 0
for i in range(15):
    Labels.append(tk.Label(Model, text='A%d: ' %(i)))
    Labels[i].config(font=('helvetica', 10))
    canvas1.create_window(25, 120 + 28 * i, window=Labels[i])
    if i in ctslist:
        Inputs.append(tk.Entry(Model))
        Inputs[i].config(font=('helvetica', 10))
        canvas1.create_window(115, 120 + 28 * i, window=Inputs[i])
        Inputs[i].insert(tk.END, 1.0)
    else:
        Inputs.append(tk.StringVar())
        Inputs[i].set(inputoptions[index][0])
        inputmenu = tk.OptionMenu(Model, Inputs[i], *inputoptions[index])
        canvas1.create_window(68, 120 + 28 * i, window=inputmenu)
        index += 1
    

options = ["Neural Network", "Logistic Regretion"]
option = tk.StringVar()
option.set(options[1])

optionmenu = tk.OptionMenu(Model, option, *options)
canvas1.create_window(450, 110, window=optionmenu)

labeloption = tk.Label(Model, text='Pick a Model: ')
labeloption.config(font=('helvetica', 10))
canvas1.create_window(310, 110, window=labeloption)

labelname = tk.Label(Model, text='Filename: ')
labelname.config(font=('helvetica', 10))
canvas1.create_window(310, 150, window=labelname)
textname = tk.Entry(Model)
textname.config(font=('helvetica', 10))
canvas1.create_window(450, 150, window=textname)
textname.insert(tk.END, 'crx.data')

labelts = tk.Label(Model, text='Test data(0.0 - 1.0): ')
labelts.config(font=('helvetica', 10))
canvas1.create_window(310, 190, window=labelts)
textsize = tk.Entry(Model)
textsize.config(font=('helvetica', 10))
canvas1.create_window(450, 190, window=textsize)
textsize.insert(tk.END, 0.25)

labeliter = tk.Label(Model, text='Maximum iterations: ')
labeliter.config(font=('helvetica', 10))
canvas1.create_window(310, 230, window=labeliter)
textiter = tk.Entry(Model)
textiter.config(font=('helvetica', 10))
canvas1.create_window(450, 230, window=textiter)
textiter.insert(tk.END, 10000)


canvas1.create_rectangle(5, 65, 200, 580)
labelcheck = tk.Label(Model, text='Check for Approval')
labelcheck.config(font=('helvetica', 12))
canvas1.create_window(90, 80, window=labelcheck)

canvas1.create_rectangle(240, 65, 550, 480)
labeltrain = tk.Label(Model, text='Check for Approval')
labeltrain.config(font=('helvetica', 12))
canvas1.create_window(400, 80, window=labeltrain)

labelresult = tk.Label(Model, text= 'Enter data',font=('helvetica', 10))
canvas1.create_window(300, 520, window=labelresult)

labelresult2 = tk.Label(Model, text= '',font=('helvetica', 10))
canvas1.create_window(400, 420, window=labelresult2)

def DoStuff():
    try:
        data = []
        for i in range(15):
            if (i == 2 or i == 7): 
                data.append(np.float64(Inputs[i].get()))
            elif(i == 10 or i == 14):
                data.append(np.float64(Inputs[i].get()))
            else:
                data.append(Inputs[i].get())
        model = ''
        if option.get() == 'Neural Network':
            model = 'nn'
        elif option.get() == 'Logistic Regretion':
            model = 'lgr'
        for i in range(15):
            enfilename = 'Data\\le' + str(i) + '.pkl'
            le = pickle.load(open(enfilename, 'rb'))
            data[i] = le.transform([data[i]])[0]
        
        
        lfilename = 'Data\\max.list'
        datamax = pickle.load(open(lfilename, 'rb'))
        for i in range(15):
            data[i] = data[i] / datamax[i]
        data = np.array([data])
        filename = 'Data\\' + model + '.sav'
        loaded_model = pickle.load(open(filename, 'rb'))
        result = loaded_model.predict(data)
        
        print(result)
        resulttext = ''
        if result[0] == 1:
            resulttext = 'Denied'
        elif result[0] == 0:
            resulttext = 'Approved'
    except:
        resulttext = 'Denied'
    finally:
        labelresult.config(text = 'Application %s' %(resulttext))

def Train():
    model = ''
    if option.get() == 'Neural Network':
        model = 'nn'
    elif option.get() == 'Logistic Regretion':
        model = 'lgr'
    filename = textname.get()
    max_iter = int(textiter.get())
    test_size = float(textsize.get())
    score = TrainModel(filename = filename, max_iter = max_iter, test_size = test_size, model = model)
    labelresult2.config(text = 'The accuracy of %s is %.2f%%' %(option.get(), score * 100))
    
    
buttoncheck = tk.Button(text='Check', command=DoStuff, bg='brown', fg='white', font=('helvetica', 9, 'bold'))
canvas1.create_window(110, 550, window=buttoncheck)

buttontrain = tk.Button(text='Train', command=Train, bg='brown', fg='white', font=('helvetica', 9, 'bold'))
canvas1.create_window(390, 270, window=buttontrain)

Model.mainloop()
