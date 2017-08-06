/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var module = __webpack_require__(1);

// console.log('success');
// module.getDecodeData();
// getDecodeData();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// export default function getDecodeData() {
// var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// var source;
// var temp = new Uint8Array( 1200 );

// function getData() {
//   source = audioCtx.createBufferSource();
//   var request = new XMLHttpRequest();

//  request.open('GET', '../../audio/Odesza_Above_The_Middle.mp3', true);
//   request.responseType = 'arraybuffer';


//  request.onload = function() {
//     var audioData = request.response;

//    audioCtx.decodeAudioData(audioData, function(buffer) {
//       source.buffer = buffer;
//       console.log(buffer.length)
//       console.log( buffer );
//       var convert = new Uint8Array( buffer.getChannelData( 0 ).buffer );
//       var convert2 = new Uint8Array( buffer.getChannelData( 1 ).buffer );
//       console.log( convert );
//       console.log( convert2 );
//       temp = convert.subarray(0, 1200 );
//       source.connect(audioCtx.destination);
//       source.loop = true;
//       return buffer;
//    },
//     function(e){ console.log("Error with decoding audio data" + e.err); });
//  }
//  request.send();
// }
// getData();
// }

// var getDecodeData = function() {
//   console.log(1);
  


//   getData();
// };

var getDecodeData = function() {
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var source;
  var temp = new Uint8Array( 1200 );

  source = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();

  request.open('GET', '../../audio/Odesza_Above_The_Middle.mp3', true);
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

module.exports = getDecodeData();

/***/ })
/******/ ]);