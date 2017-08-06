export default function getDecodeData() {
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source;
var temp = new Uint8Array( 1200 );

function getData() {
  source = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();

 request.open('GET', '../audio/Odesza_Above_The_Middle.mp3', true);
  request.responseType = 'arraybuffer';


 request.onload = function() {
    var audioData = request.response;

   audioCtx.decodeAudioData(audioData, function(buffer) {
      source.buffer = buffer;
      console.log(buffer.length)
      console.log( buffer );
      var convert = new Uint8Array( buffer.getChannelData( 0 ).buffer );
      var convert2 = new Uint8Array( buffer.getChannelData( 1 ).buffer );
      console.log( convert );
      console.log( convert2 );
      temp = convert.subarray(0, 1200 );
      source.connect(audioCtx.destination);
      source.loop = true;
      return buffer;
   },
    function(e){ console.log("Error with decoding audio data" + e.err); });
 }
 request.send();
}
getData();
}
