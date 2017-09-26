from __future__ import print_function

# We'll need numpy for some mathematical operations
import numpy as np
import scipy
import os
# matplotlib for displaying the output
import matplotlib.pyplot as plt
import matplotlib.style as ms
ms.use('seaborn-muted')
# %matplotlib inline
# and IPython.display for audio output
import IPython.display
# Librosa for audio
import librosa
# And the display module for visualization
import librosa.display


# class cmpAverage( object ):

def getValue(self, path, filename):

	print('this is path', path)
	print('this is filename', filename)
	# audio_path = "../audio/Electro-loop-120-bpm.wav"
	audio_path = path + filename;
	# audio_path = "../audio/Hip-hop-drum-beat-116-bpm.wav"
	audio_path2 = "../audio/average.wav"

	song, songSr = librosa.load( audio_path, sr=44100 )
	kick, kickSr = librosa.load( audio_path2, sr=44100)

	# cosY : cosine similarity of y and y2
	# res : array of expected fit time
	cosY = []
	res = []

	# print(len(song))

	global min
	min = 10

	for i in range(0, len(song) - len(kick)) :
	    cosY.append(scipy.spatial.distance.cosine( song[i:i+len(kick)], kick[0:len(kick)]))
	    if(cosY[i] < min) :
	        min = cosY[i]
	# print("yeah" , i, min)

	# find expected point
	global index
	index = -1

	for i in range(0, len(song) - len(kick)) :
	    if(abs(cosY[i] - min) < 0.02) :
	        if(index == -1) :
	            index = i
	            res.append(i)            
	        elif(i-index>1) :
	            index = i
	            res.append(i)
	        else : 
	            index = i
	
	results = []
	# print expected time
	for i in range(0, len(res)) :
		results.append(float(res[i])/44100)

	print("finish")
	return results

# print("finish")

# librosa.display.waveplot( song, 44100 )
#librosa.display.waveplot( y2, 44100)