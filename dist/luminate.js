/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _lum = __webpack_require__(1);
	
	var _lum2 = _interopRequireDefault(_lum);
	
	var _toggler = __webpack_require__(2);
	
	var _toggler2 = _interopRequireDefault(_toggler);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_lum2.default.register(_toggler2.default);
	
	window.Lum = _lum2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		version: '0.0.1',
	
		register: function register(module) {
			this._baseModules.push(module);
		},
	
		start: function start() {
			var container = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = this._baseModules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var module = _step.value;
	
					module.start(container);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		},
	
		_baseModules: []
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _lum = __webpack_require__(1);
	
	var _lum2 = _interopRequireDefault(_lum);
	
	var _base = __webpack_require__(3);
	
	var _base2 = _interopRequireDefault(_base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _base2.default.extend({
		directive: 'toggler',
	
		events: {
	
			init: function init() {
				console.log(this);
			}
		}
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _element = __webpack_require__(4);
	
	var Element = _interopRequireWildcard(_element);
	
	var _parser = __webpack_require__(5);
	
	var Parser = _interopRequireWildcard(_parser);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Base = function () {
		_createClass(Base, null, [{
			key: 'getSelector',
			value: function getSelector() {
				var Module = this;
	
				var d = Module.directive;
				return '[' + d + '],[data-' + d + ']';
			}
		}, {
			key: 'getSettings',
			value: function getSettings(element) {
				var Module = this;
	
				var d = Module.directive;
				var s = element.getAttribute('data-' + d) || element.getAttribute(d);
	
				return Parser.settings(s);
			}
		}, {
			key: 'extend',
			value: function extend(settings) {
				var SuperModule = this;
				var Module = function (_SuperModule) {
					_inherits(Module, _SuperModule);
	
					function Module() {
						_classCallCheck(this, Module);
	
						return _possibleConstructorReturn(this, Object.getPrototypeOf(Module).apply(this, arguments));
					}
	
					return Module;
				}(SuperModule);
	
				if (settings.methods) {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = Object.keys(settings.methods)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var name = _step.value;
	
							var method = settings.methods[name];
							Module.prototype[name] = method;
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
				}
	
				Module.getSelector = SuperModule.getSelector;
				Module.getSettings = SuperModule.getSettings;
				Module.extend = SuperModule.extend;
				Module.start = SuperModule.start;
	
				Module.directive = settings.directive;
				Module.modules = Object.assign({}, SuperModule.modules, settings.modules);
				Module.defaults = Object.assign({}, SuperModule.defaults, settings.defaults);
				Module.methods = Module.prototype;
				Module.events = Object.assign({}, SuperModule.events, settings.events);
	
				return Module;
			}
		}, {
			key: 'start',
			value: function start() {
				var container = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
				var owner = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
				var Module = this;
				var elements = container.querySelectorAll(Module.getSelector());
	
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = Array.from(elements)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var element = _step2.value;
	
						if (owner) {
							var ownerElement = Element.closest(element, owner.getSelector());
							if (ownerElement !== owner.$element) {
								continue;
							}
						}
	
						var settings = Module.getSettings(element);
						new Module(element, settings, owner);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}]);
	
		function Base(element) {
			var settings = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			var owner = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
			_classCallCheck(this, Base);
	
			var Module = this.constructor;
	
			Module.events.beforeInit.call(this, {
				element: element,
				settings: settings
			});
	
			this.$element = element;
			this.$owner = owner;
			this.$owns = [];
	
			Element.data(element, Module.directive, this);
	
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;
	
			try {
				for (var _iterator3 = Object.keys(Module.modules)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var property = _step3.value;
	
					var SubModule = Module.modules[property];
	
					SubModule.start(element, this);
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}
	
			Module.events.init.call(this);
		}
	
		return Base;
	}();
	
	exports.default = Base;
	
	
	Base.directive = null;
	Base.modules = {};
	Base.defaults = {};
	Base.methods = Base.prototype;
	Base.events = {
		beforeInit: function beforeInit() {},
		init: function init() {},
		beforeDestroy: function beforeDestroy() {},
		destroy: function destroy() {}
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.closest = closest;
	exports.data = data;
	function closest(element, selector) {
		if (element.closest) {
			return element.closest(selector);
		}
	
		var currentElement = element;
		while (currentElement) {
			if (currentElement.matches(selector)) {
				return currentElement;
			}
	
			currentElement = currentElement.parentElement;
		}
	
		return null;
	}
	
	var expando = "lum-" + Date.now().toString(36) + "_";
	function data(element, property, value) {
		var expandoProperty = expando + property;
	
		if (value !== undefined) {
			element[expandoProperty] = value;
		}
	
		return element[expandoProperty];
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.settings = settings;
	function settings() {
		var string = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
		var parsed = {};
	
		var parts = string.trim().split(/\s+/);
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var part = _step.value;
	
				var item = part.split(':');
				parsed[item[0]] = item[1] || true;
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	
		return parsed;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=luminate.js.map