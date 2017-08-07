var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source;
var temp = new Uint8Array(1200);

// 외부 파일에서 사용할 수 있도록 처리한 함수
// 콜백을 이용해서 리턴값을 넘겨줌
var getDecodeData = function (callback) {

  // Promise를 이용해서 decodeAudioData 함수 내 비동기 작업이 끝난 후 값을 받아서 처리함
  // Promise 선언
  var _promise = function() {
    return new Promise(function (resolve, reject) {
      decodeAudioData(resolve, reject);
    });
  };

  // Promise 실행
  _promise()
    .then(function (data) {
      // 성공시
      console.log('success');
      callback(data);
    }, function (error) {
      // 실패시 
      console.error(error);
      callback(null);
    });
}

// 실제 오디오 데이터를 디코딩하는 함수
var decodeAudioData = function(resolve, reject) {
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

      resolve(buffer);

      return buffer;
    },
    function(e) {
      console.log("Error with decoding audio data" + e.err); 

      reject('fail');
    });
  }

  request.send();
}

// 외부에서 함수를 쓸 수 있게 처리
export default getDecodeData