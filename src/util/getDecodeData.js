var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source;
var temp = new Uint8Array(1200);

// 외부 파일에서 사용할 수 있도록 처리한 함수
// 콜백을 이용해서 리턴값을 넘겨줌
var getDecodeData = function (callback) {
  decodeAudioData(function(buffer){
    callback(buffer);
  });
}

// 실제 오디오 데이터를 디코딩하는 함수
var decodeAudioData = function(callback) {
  source = audioCtx.createBufferSource();

  var request = new XMLHttpRequest();

  request.responseType = 'arraybuffer';
  request.open('GET', '../audio/Odesza_Above_The_Middle.mp3', true);

  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
      source.buffer = buffer;

      // console.log( buffer );

      // var convert = new Uint8Array( buffer.getChannelData( 0 ).buffer );
      // var convert2 = new Uint8Array( buffer.getChannelData( 1 ).buffer );

      // console.log(convert);
      // console.log(convert2);

      // temp = convert.subarray(0, 1200);

      source.connect(audioCtx.destination);
      source.loop = true;

      callback(buffer);

      return buffer;
    },
    function(e) {
      console.log("Error with decoding audio data" + e.err); 
      callback(null);
    });
  }

  request.send();
}

// 외부에서 함수를 쓸 수 있게 처리
export default getDecodeData