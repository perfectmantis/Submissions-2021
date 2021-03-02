import pandas as pd
import numpy as np
import pickle

from sklearn.linear_model  import LogisticRegression
from sklearn.neural_network import MLPClassifier
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report,confusion_matrix


def TrainModel(filename = 'crx.data', test_size = 0.25, model = 'lgr', solver = 'lbfgs', hidden_layer_sizes=(8,8,8), max_iter = 10000):

    #Reading data Credit card applications data
    df = pd.read_csv(filename, header=None) 

    #Handling the missing values
    df = df.replace('?', np.nan)
    df = df.dropna()
    #Preprocessing the data
    for index in range(len(df.columns)):
        le = preprocessing.LabelEncoder()
        le.fit(df[index])
        enfilename = 'Data\le' + str(index) + '.pkl'
        pickle.dump(le, open(enfilename, 'wb'))
        df[index] = le.transform(df[index])
    #Splitting the dataset into train and test sets
    target_column = [15]
    predictors = list(set(list(df.columns))-set(target_column))
    lfilename = 'Data\\max.list'
    pickle.dump(df[predictors].max(), open(lfilename, 'wb'))
    df[predictors] = df[predictors]/df[predictors].max()
    X = df[predictors].values
    Y = df[target_column].values
    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size = test_size, random_state=40)



    #Fitting a logistic regression model to the train set
    if model == 'nn':
        TM = MLPClassifier(hidden_layer_sizes=hidden_layer_sizes, activation='logistic', solver = solver, max_iter=max_iter)
    elif model == 'lgr':
        TM = LogisticRegression(solver=solver, max_iter=max_iter)
        
        
    TM.fit(X_train,y_train.ravel())
    predict_train = TM.predict(X_train)
    predict_test = TM.predict(X_test)

    # save the model to disk
    filename = 'Data\\' + model + '.sav'
    pickle.dump(TM, open(filename, 'wb'))

    

    #Making predictions and evaluating performance
    print(confusion_matrix(y_train,predict_train))
    print(classification_report(y_train,predict_train))

    print(confusion_matrix(y_test,predict_test))
    print(classification_report(y_test,predict_test))

    
    return TM.score(X_test,y_test)
    
