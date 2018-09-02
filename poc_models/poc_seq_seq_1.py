# -*- coding: utf-8 -*-
import numpy as np
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.utils import to_categorical
from keras.models import Sequential
from keras.layers import Dense, LSTM, Embedding
from keras.callbacks import ModelCheckpoint


data_path = 'F://Samriddha/personal/projects/y_indexer/poc_models/'
train_text = ''
with open(data_path+'output.txt', 'r', encoding='utf8') as f:
    train_text = f.read()

print(train_text)

tokenizer = Tokenizer()
tokenizer.fit_on_texts([train_text])
encoded = tokenizer.texts_to_sequences([train_text])[0]
print(encoded)
print(tokenizer.word_index)
print(len(tokenizer.word_index))

vocabulary_length = len(tokenizer.word_index)+1

sequences = []
for i in range(1, len(encoded)):
    seq = encoded[i-1:i+1]
    sequences.append(seq)
    
print('Total sequences ',len(sequences))

sequences = np.array(sequences)
x, y = sequences[:,0],sequences[:,1]
y = to_categorical(y, num_classes=vocabulary_length)

model = Sequential()
model.add(Embedding(vocabulary_length, 10, input_length=1))
model.add(LSTM(50))
model.add(Dense(vocabulary_length, activation='softmax'))
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
model.summary()

checkpoint = ModelCheckpoint(filepath='oop_lang_unigram.hdf5')
history = model.fit(x, y, epochs=500, batch_size=1, 
                    validation_split=0.2, callbacks=[checkpoint], verbose=2)


model_json = model.to_json()
with open(data_path+'oop_lang_unigram.json', 'w') as f:
    f.write(model_json);

def generate_seq(model, tokenizer, seed_text, n_words):
    in_text, result = seed_text, seed_text
    for i in range(n_words):
        encoded = tokenizer.texts_to_sequences([in_text])[0]
        encoded = np.array(encoded)
        y_hat = model.predict_classes(encoded, verbose=0)
        out_word = ''
        for word, index in tokenizer.word_index.items():
            if index == y_hat:
                out_word = word
        in_text, result = out_word, result + ' '+out_word
    return result

res = generate_seq(model, tokenizer, 'classes', 2)
print(res)





