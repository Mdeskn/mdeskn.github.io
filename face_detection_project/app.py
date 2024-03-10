from flask import Flask, render_template, request
import cv2 as cv
import numpy as np
from PIL import Image, ImageDraw
import os

app = Flask(__name__)

# Set up face cascade
face_cascade_path = cv.data.haarcascades + 'haarcascade_frontalface_default.xml'
face_cascade = cv.CascadeClassifier(cv.samples.findFile(face_cascade_path))

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return render_template('index.html', error='No file part')
        
        file = request.files['file']
        if file.filename == '':
            return render_template('index.html', error='No selected file')

        if file and allowed_file(file.filename):
            img = Image.open(file)
            gray_img = cv.cvtColor(np.array(img), cv.COLOR_RGB2GRAY)

            # Adjust parameters for better accuracy
            faces = face_cascade.detectMultiScale(gray_img, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

            if faces.any():
                for (x, y, w, h) in faces:
                    draw = ImageDraw.Draw(img)
                    draw.rectangle([x, y, x+w, y+h], outline="red", width=5)

            img_path = os.path.join('static', 'uploads', file.filename)
            img.save(img_path)

            return render_template('index.html', img_path=img_path, faces=faces.tolist())
        else:
            return render_template('index.html', error='File type not allowed')

    return render_template('index.html')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg'}

if __name__ == '__main__':
    app.run(debug=True)
