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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Statistics = __webpack_require__(1);

	var _Statistics2 = _interopRequireDefault(_Statistics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = new _Statistics2.default();
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GoogleAnalytics = __webpack_require__(2);

	var _GoogleAnalytics2 = _interopRequireDefault(_GoogleAnalytics);

	var _YaMetrika = __webpack_require__(4);

	var _YaMetrika2 = _interopRequireDefault(_YaMetrika);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Statistics = function () {
	  function Statistics(prop) {
	    _classCallCheck(this, Statistics);

	    this.counters = {
	      google: new _GoogleAnalytics2.default(),
	      yandex: new _YaMetrika2.default()
	    };
	  }

	  _createClass(Statistics, [{
	    key: 'init',
	    value: function init() {
	      for (var name in this.counters) {
	        this.counters[name].init();
	      }

	      this._initialized = Promise.resolve(true);
	    }
	  }, {
	    key: 'event',
	    value: function event(_event) {
	      var counters = Object.values(this.counters);
	      return Promise.all(counters.map(function (counter) {
	        return counter.send(_event);
	      }));
	    }
	  }, {
	    key: 'pageview',
	    value: function pageview(page) {
	      var counters = Object.values(this.counters);
	      return Promise.all(counters.map(function (counter) {
	        return counter.pageview(page);
	      }));
	    }
	  }]);

	  return Statistics;
	}();

	exports.default = Statistics;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var loaded = false;

	var checkLimit = 10;
	var counter = 0;
	var checkGoogleAnalyticsIsLoaded = function checkGoogleAnalyticsIsLoaded(resolve) {
	  if (window.ga && window.ga.create) {
	    resolve();
	  } else {
	    counter++;
	    if (counter < checkLimit) {
	      setTimeout(function () {
	        checkGoogleAnalyticsIsLoaded(resolve);
	      }, 200);
	    } else {
	      resolve();
	    }
	  }
	};

	var loadGoogleAnalytics = function loadGoogleAnalytics() {
	  if (!loaded) {
	    /* eslint-disable */
	    loaded = new Promise(function (resolve) {
	      checkGoogleAnalyticsIsLoaded(resolve);
	    });

	    (function (i, s, o, g, r, a, m) {
	      i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
	        (i[r].q = i[r].q || []).push(arguments);
	      }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
	    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
	    /* eslint-enable */
	  }
	  return loaded;
	};

	var createGoogleAnalyticsCounter = function createGoogleAnalyticsCounter() {
	  window.ga('create', _config.gaTrackingID, 'auto');
	};

	var GoogleAnalytics = function () {
	  function GoogleAnalytics() {
	    _classCallCheck(this, GoogleAnalytics);
	  }

	  _createClass(GoogleAnalytics, [{
	    key: 'init',
	    value: function init() {
	      this.loaded = loadGoogleAnalytics().then(function () {
	        createGoogleAnalyticsCounter();
	      });
	    }
	  }, {
	    key: 'send',
	    value: function send(event) {
	      return this.loaded.then(function () {
	        return new Promise(function (resolve, reject) {
	          if (typeof window.ga === 'function') {
	            window.ga('send', 'event', {
	              eventCategory: _config.gaCategory,
	              eventAction: event.action,
	              eventLabel: event.label || _config.gaLabel,
	              hitCallback: resolve,
	              hitCallbackFail: reject
	            });
	          }
	        });
	      });
	    }
	  }, {
	    key: 'pageview',
	    value: function pageview(page) {
	      return this.loaded.then(function () {
	        if (typeof window.ga === 'function') {
	          window.ga('set', 'page', page);
	          window.ga('send', 'pageview');
	        }
	      });
	    }
	  }]);

	  return GoogleAnalytics;
	}();

	exports.default = GoogleAnalytics;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var gaTrackingID = exports.gaTrackingID = 'UA-69093127-9';
	var gaCategory = exports.gaCategory = 'catalog';
	var gaLabel = exports.gaLabel = '';

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var YaMetrika = function () {
	  function YaMetrika() {
	    _classCallCheck(this, YaMetrika);
	  }

	  _createClass(YaMetrika, [{
	    key: "init",
	    value: function init() {}
	  }, {
	    key: "send",
	    value: function send(event) {
	      return Promise.resolve(true);
	    }
	  }, {
	    key: "pageview",
	    value: function pageview(page) {
	      return Promise.resolve(true);
	    }
	  }]);

	  return YaMetrika;
	}();

	exports.default = YaMetrika;
	module.exports = exports["default"];

/***/ }
/******/ ]);