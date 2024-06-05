---
author:
- Joash Naidoo
date: "2023-01-05T00:00:00+02:00"
draft: false
title: Basic Neural Network
---

Below you will find a canvas to draw all English alphanumeric characters, and have the neural network model I trained with the ever-popular MNIST dataset, and now running in your browser, guess what character you drew. Bare in mind the model is only about 83% accurate. Also for better results, please ensure the line you draw are continuous. 

{{< neuralnet-app >}}

## Code to train model

```python
import numpy as np
import pandas as pd
import tensorflow as tf
import matplotlib.pyplot as plt

# Get Familiar with the input data

temp_data = pd.read_csv("emnist-bymerge-train.csv", nrows=20)
print(temp_data.head(5))

train_lbl = temp_data['24']
train_img = temp_data.drop('24', axis=1)

# Normalize and shape data
train_img = train_img / 255.0 
train_img = train_img.values.reshape(train_img.shape[0], 28, 28)

# Rotate image to be right-side up
for i in range(len(train_img)):
    train_img[i] = np.fliplr(train_img[i])
    train_img[i] = np.rot90(train_img[i])
    
plt.imshow(train_img[3])
plt.show()
print(train_lbl[3])

# Create Model and Compile Model
# Input layer shape is same as MNIST
# Some Capital and Lower letters are identical and therefore can be represented by a single 
# output neuron. Therefore only 47 output classes as opposed to 52
model = tf.keras.Sequential([
    tf.keras.layers.Flatten(input_shape=(28, 28)),
    tf.keras.layers.Dense(512, activation='sigmoid'),
    tf.keras.layers.Dense(128, activation='sigmoid'),
    tf.keras.layers.Dense(47, activation='softmax')
])
model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

def preprocess(chunk):
    
    # Extract label from image data
    train_lbl = chunk['24']
    train_img = chunk.drop('24', axis=1)
    
    # Normalize and shape data
    train_img = train_img / 255.0 
    train_img = train_img.values.reshape(train_img.shape[0], 28, 28)
    
    # Rotate image to be right-side up
    for i in range(len(train_img)):
        train_img[i] = np.fliplr(train_img[i])
        train_img[i] = np.rot90(train_img[i])
        
    return train_img, train_lbl

# Train Model in chunks
for chunk in pd.read_csv("emnist-bymerge-train.csv", chunksize=100000):
    chunk_img, chunk_lbl = preprocess(chunk)
    model.fit(chunk_img, chunk_lbl)

# Get Test Data
test_df = pd.read_csv('emnist-balanced-test.csv')
test_df.head(5)

# Format Test Data
test_lbl = test_df['41']
test_img = test_df.drop('41', axis=1)
test_img = test_img / 255.0 # Normalize data
test_img = test_img.values.reshape(test_img.shape[0], 28, 28, 1)
for i in range(len(test_img)):
    test_img[i] = np.fliplr(test_img[i])
    test_img[i] = np.rot90(test_img[i])

# Evaluate the Model
model.evaluate(test_img, test_lbl)

# Save model for Angular App
import tensorflowjs as tfjs
tfjs.converters.save_keras_model(model, "./")
```


