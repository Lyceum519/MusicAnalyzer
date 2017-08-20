# first commit

from __future__ import print_function

import numpy as np


# matplotlib for displaying the output
import matplotlib.pyplot as plt
import matplotlib.style as ms
ms.use('seaborn-muted')


# and IPython.display for audio output
import IPython.display


# Librosa for audio
import librosa
# And the display module for visualization
import librosa.display

audio_path = '/audio/Drum1.mp3'
y, sr = librosa.load(audio_path)


IPython.display.Audio(data=y, rate=sr)

tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)

print('Estimated tempo: {:.2f} beats per minute'.format(tempo))

# 4. Convert the frame indices of beat events into timestamps
beat_times = librosa.frames_to_time(beat_frames, sr=sr)

print('Saving output to beat_times.csv')
librosa.output.times_csv('/Users/suhyunjeon/Downloads/beat_times.csv', beat_times)


print(tempo)
print(beat_frames)
print(beat_times)
