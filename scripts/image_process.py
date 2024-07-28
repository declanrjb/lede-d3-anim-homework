import pandas as pd
import os
from PIL import Image 

batch_size = 150

all_images = os.listdir('../data/star-photos')

num_batches = 4
image_batch = all_images[0:(batch_size * num_batches)]

for image_file in image_batch:
    img = Image.open('../data/star-photos/' + image_file)
    img.save('../data/photos-clean/' + image_file)

img_files = ['data/photos-clean/' + image for image in image_batch]

directory = {}

for i in range(0,num_batches):
    directory['step' + str(i)] = img_files[(i*batch_size):((i+1)*batch_size)]


df = pd.DataFrame(directory)
df.to_csv('../data/image_directory.csv')