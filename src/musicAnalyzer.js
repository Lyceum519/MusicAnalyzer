import getDecodeData from './util/getDecodeData.js'

getDecodeData( function( audioBuffer ) {
	var convert = new Uint8Array( audioBuffer.getChannelData( 0 ).buffer );
	var convert2 = new Uint8Array( audioBuffer.getChannelData( 1 ).buffer );

	console.log(audioBuffer);
	console.log(convert);
	console.log(convert2);
});