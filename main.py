import pandas as pd
import re
import nltk
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import *
from sklearn import svm
from sklearn.model_selection import train_test_split
import csv


def predict_data(algorithm, train_data, train_classes, test_data):
    global classifier
    if algorithm == 'Naive Bayes':
        classifier = GaussianNB()
    elif algorithm == 'Multinomial Naive Bayes':
        classifier = MultinomialNB()
    elif algorithm == 'SVM':
        classifier = svm.LinearSVC()

    #train data
    classifier.fit(train_data, train_classes)

    #predict data
    y_pred = classifier.predict(test_data)
    neg_count = 0
    pos_count = 0
    for pred in y_pred:
        if pred == '0':
            neg_count += 1
        else:
            pos_count += 1
    print("Results - Algorithm: %s" % algorithm)
    print("Negative: " + str(neg_count))
    print("Positive: " + str(pos_count))


if __name__ == '__main__':
    print("************ With Stemming ************")
    cv = CountVectorizer(max_features=100000)
    dataset = []
    test_dataset = []
    corpus = []
    #nltk.download('stopwords')

    ''' 
    Reads all tweets from training file and stores it in dataset array 
    '''
    with open('train.csv', mode='r') as train_file:
        csv_reader = csv.DictReader(train_file)
        line_count = 0
        for row in csv_reader:
            if line_count == 100:
                break
            if line_count != 0:
                category = row.get("Sentiment")
                tweet = row.get("SentimentText").strip()
                dataset.append([tweet, category])
            line_count += 1

    dataset = pd.DataFrame(dataset)
    dataset.columns = ["Tweet", "Category"]
    TRAIN_CATEGORIES = dataset.iloc[:, 1].values
    ps = PorterStemmer()
    for i in range(0, line_count-1):
        try:
            text = dataset['Tweet'][i]
            text = ps.stem(text.strip())
            text = re.sub('[^a-zA-Z]', '', text)
            text = text.lower()
            corpus.append(text)
        except Exception as e:
            print("Error at " + str(i))

    TRAIN_TWEETS = cv.fit_transform(corpus).toarray()
    corpus = None
    dataset = None

    with open('test.csv', mode='r') as test_file:
        csv_reader = csv.DictReader(test_file)
        test_line_count = 0
        for row in csv_reader:
            if test_line_count == 20000:
                break
            if test_line_count != 0:
                tweet = row.get("SentimentText").strip()
                test_dataset.append([tweet])
            test_line_count += 1

    test_dataset = pd.DataFrame(test_dataset)
    test_dataset.columns = ["Tweet"]
    test_corpus = []
    for i in range(0, test_line_count-1):
        try:
            text = test_dataset['Tweet'][i]
            text = ps.stem(text.strip())
            text = re.sub('[^a-zA-Z]', '', text)
            text = text.lower()
            text = text.split()
            text = ''.join(text)
            test_corpus.append(text)
        except Exception as e:
            print("Error at " + str(i))

    TEST_TWEETS = cv.transform(test_corpus).toarray()

    predict_data('Naive Bayes', TRAIN_TWEETS, TRAIN_CATEGORIES, TEST_TWEETS)
    predict_data('Multinomial Naive Bayes', TRAIN_TWEETS, TRAIN_CATEGORIES, TEST_TWEETS)
    predict_data('SVM', TRAIN_TWEETS, TRAIN_CATEGORIES, TEST_TWEETS)
