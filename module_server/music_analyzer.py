import numpy as np
import scipy
import os

# Librosa for audio
import librosa
# And the display module for visualization
import librosa.display

near_zero = __import__( 'near_zero' );

class MusicAnalyzer( object ):
	self.DIR_NAME = "../audio/kick/";
	self.filenames = [];

	def __init__( self, path = "../audio/kick/" ) :
		self.DIR_NAME = path;

	def search( self ):
		try:
			global filenames
			self.filenames = os.listdir(dirname)
		except PermissionError:
			pass

	def filterZero( self, y_data ):
		start = 0
		end = -1

		for i in range( 0, len( y_data ) ):
			if (y_data[i] == 0 or (y_data[i]< near_zero.MAX and y_data[i]> near_zero.MIN )):
				if( end == -1 ):
					start += 1;
				else:
					end += 1;
			else:
				end = 1;

		return y_data[ start, len( y_data ) - end ];


	def saveFiles( self ):
		audio_path = os.path.join( self.DIR_NAME, filename );



