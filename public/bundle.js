/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	__webpack_require__(3);

	var _GameOfLife = __webpack_require__(7);

	var _GameOfLife2 = _interopRequireDefault(_GameOfLife);

	var _patternsAdderGif = __webpack_require__(13);

	var _patternsAdderGif2 = _interopRequireDefault(_patternsAdderGif);

	var _patternsPuftrnGif = __webpack_require__(14);

	var _patternsPuftrnGif2 = _interopRequireDefault(_patternsPuftrnGif);

	var _patternsP136Gif = __webpack_require__(15);

	var _patternsP136Gif2 = _interopRequireDefault(_patternsP136Gif);

	var _patternsOut2Png = __webpack_require__(16);

	var _patternsOut2Png2 = _interopRequireDefault(_patternsOut2Png);

	var _imagesOrigPng = __webpack_require__(17);

	var _imagesOrigPng2 = _interopRequireDefault(_imagesOrigPng);

	var game = undefined;

	var p = new Image();
	var orig = new Image();

	p.src = _patternsOut2Png2['default'];
	orig.src = _imagesOrigPng2['default'];

	p.onload = function () {
	    orig.onload = function () {
	        var scale = parseInt(window.innerHeight * 1.0 / p.height);

	        // display original image
	        drawBg(orig, p.width * scale, p.height * scale);

	        // create game from image
	        game = new _GameOfLife2['default']('grid', p.width, p.height, p, scale, hideBg);

	        // game = new GameOfLife('grid', p.width, p.height, p)

	        // set start btn listener
	        initStartBtn();
	    };
	};

	function initStartBtn() {
	    document.getElementById('btn-start').addEventListener('click', function () {
	        setTimeout(function () {
	            game.start();
	        }, 1000);
	    });
	}

	function hideBg() {
	    var bgCanvas = document.getElementById('bg');
	    bgCanvas.style.opacity = 0;
	}

	function drawBg(img, w, h) {
	    var bgCanvas = document.getElementById('bg');
	    var bgContext = bgCanvas.getContext('2d');
	    bgCanvas.width = w;
	    bgCanvas.height = h;
	    bgContext.drawImage(img, 0, 0, w, h);
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(8)['default'];

	var _classCallCheck = __webpack_require__(12)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var GameOfLife = (function () {
	    function GameOfLife(canvasId, width, height, pattern, scale, onStart) {
	        if (width === undefined) width = 100;
	        if (height === undefined) height = 100;

	        _classCallCheck(this, GameOfLife);

	        // canvas size
	        this.size = {
	            x: width,
	            y: height
	        };

	        // starting pattern
	        this.pattern = pattern;

	        // frame per second of drawing
	        this.startFps = 5;
	        this.fps = 15;

	        // scale of grid
	        this.scale = parseInt(scale);

	        // callbacks
	        this.onStart = onStart;

	        // color of live cel
	        this.cellColor = 'rgba(255, 69, 0, 0.8)';

	        // create empty grid
	        var rows = new Array(height);rows.fill(1);
	        this.grid = rows.map(function (row) {
	            row = new Uint8Array(width);row.fill(1);
	            return row;
	        });

	        // size canvas and get context
	        var canvas = document.getElementById(canvasId);
	        canvas.width = '' + width;
	        canvas.height = '' + height;
	        canvas.style.opacity = 0;

	        this.context = canvas.getContext('2d');
	    }

	    _createClass(GameOfLife, [{
	        key: 'start',
	        value: function start() {
	            var _this = this;

	            // populate board
	            // load pattern if passed in
	            if (this.pattern) {
	                this.load(this.pattern);
	            }
	            // else load random
	            else {
	                    this.random();
	                }

	            // show canvas
	            this.context.canvas.style.opacity = 1;

	            // callback
	            setTimeout(function () {
	                _this.onStart();
	            }, 1000);

	            // start
	            setTimeout(function () {
	                _this.tick();
	            }, 3000);
	        }
	    }, {
	        key: 'load',
	        value: function load(pat) {
	            var _this2 = this;

	            // clear canvas and draw pattern
	            this.context.clearRect(0, 0, this.size.x, this.size.y);
	            this.context.drawImage(pat, 0, 0);

	            // get cell data from pixels
	            var imageData = this.context.getImageData(0, 0, this.size.x, this.size.y);
	            var data = imageData.data;

	            // create grid out of pattern
	            this.grid = this.grid.map(function (row, x) {
	                return row.map(function (cell, y) {
	                    var i = (x * _this2.size.x + y) * 4;
	                    return data[i + 3] > 0 ? 1 : 0;
	                });
	            });

	            this.draw();
	        }
	    }, {
	        key: 'checkers',
	        value: function checkers() {
	            // populate grid randomly
	            this.grid = this.grid.map(function (row, x) {
	                return row.map(function (cell, y) {
	                    return (x + y) % 2 == 1;
	                });
	            });

	            this.draw();
	        }
	    }, {
	        key: 'random',
	        value: function random() {
	            // populate grid randomly
	            this.grid = this.grid.map(function (row) {
	                return row.map(function (cell) {
	                    return Math.random() > 0.75 ? 1 : 0;
	                });
	            });
	            this.draw();
	        }
	    }, {
	        key: 'tick',
	        value: function tick() {
	            var _this3 = this;

	            this.update();
	            this.draw();

	            var fps = this.startFps < this.fps ? this.startFps += 0.5 : this.fps;

	            // set interval of draw frame
	            setTimeout(function () {
	                requestAnimationFrame(function () {
	                    _this3.tick();
	                });
	            }, 1000 / fps);
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            var _this4 = this;

	            this.grid = this.grid.map(function (row, x) {
	                return row.map(function (cell, y) {
	                    var n = _this4.neighbours(x, y);
	                    // if live cell
	                    if (cell) {
	                        // if has < 2 live neighbours, die
	                        if (n < 2) return 0;

	                        // if has 2-3 live neighbours, live
	                        else if (n == 2 || n == 3) return 1;

	                            // if > 3 live neighbours, die
	                            else if (n > 3) return 0;
	                    }
	                    // if dead cell
	                    else {
	                            // if has 3 live neighbours, becomes live
	                            if (n == 3) return 1;

	                            // else, remain dead
	                            return 0;
	                        }
	                });
	            });
	        }
	    }, {
	        key: 'neighbours',
	        value: function neighbours(x, y) {
	            // get number of live neighbours for cell

	            var neighbours = 0;

	            var top = x > 0;
	            var bottom = x < this.grid.length - 1;
	            var left = y > 0;
	            var right = y < this.grid[x].length - 1;

	            if (top) {
	                neighbours = this.grid[x - 1][y] ? neighbours + 1 : neighbours;
	            }
	            if (bottom) {
	                neighbours = this.grid[x + 1][y] ? neighbours + 1 : neighbours;
	            }
	            if (left) {
	                neighbours = this.grid[x][y - 1] ? neighbours + 1 : neighbours;
	            }
	            if (right) {
	                neighbours = this.grid[x][y + 1] ? neighbours + 1 : neighbours;
	            }
	            if (top && left) {
	                neighbours = this.grid[x - 1][y - 1] ? neighbours + 1 : neighbours;
	            }
	            if (top && right) {
	                neighbours = this.grid[x - 1][y + 1] ? neighbours + 1 : neighbours;
	            }
	            if (bottom && left) {
	                neighbours = this.grid[x + 1][y - 1] ? neighbours + 1 : neighbours;
	            }
	            if (bottom && right) {
	                neighbours = this.grid[x + 1][y + 1] ? neighbours + 1 : neighbours;
	            }

	            return neighbours;
	        }
	    }, {
	        key: 'scaleDraw',
	        value: function scaleDraw(s) {
	            var _this5 = this;

	            this.context.canvas.width = this.size.x * s;
	            this.context.canvas.height = this.size.y * s;
	            this.context.scale(s, s);

	            this.context.fillStyle = this.cellColor;
	            this.grid.forEach(function (row, x) {
	                row.forEach(function (cell, y) {
	                    if (cell) {
	                        _this5.context.fillRect(y, x, 1, 1);
	                    }
	                });
	            });
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            this.scaleDraw(this.scale);
	        }
	    }]);

	    return GameOfLife;
	})();

	exports['default'] = GameOfLife;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(9)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(10), __esModule: true };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "e91d8db116424ceb31711c5d12e861c1.gif";

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "8c8fbba5691499811f065b0c4d2b76e8.gif";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "003d01ac9b757997461d8fb54839ed0e.gif";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "7825399dfb2360e5b419ff0de91c4c1a.png";

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "6ccb639e53f42c5f33515f8760e18d9c.png";

/***/ }
/******/ ]);