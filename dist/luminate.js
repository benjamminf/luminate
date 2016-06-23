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
	
	var _config = __webpack_require__(2);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _toggler = __webpack_require__(3);
	
	var _toggler2 = _interopRequireDefault(_toggler);
	
	var _selector = __webpack_require__(11);
	
	var _selector2 = _interopRequireDefault(_selector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_lum2.default.config = _config2.default;
	
	_lum2.default.register(_toggler2.default);
	_lum2.default.register(_selector2.default);
	
	window.Lum = _lum2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		version: '0.2.0',
	
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
					var Module = _step.value;
	
					Module.start(container);
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		directivePrefix: ''
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _element = __webpack_require__(4);
	
	var Element = _interopRequireWildcard(_element);
	
	var _base = __webpack_require__(5);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _action = __webpack_require__(9);
	
	var _action2 = _interopRequireDefault(_action);
	
	var _class = __webpack_require__(10);
	
	var _class2 = _interopRequireDefault(_class);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = _base2.default.extend({
		directive: 'toggler',
	
		modules: {
			actions: _action2.default,
			classes: _class2.default
		},
	
		defaults: {
			is: 'open',
			transition: false,
			classOpen: 'is-open',
			classClosed: 'is-closed',
			classOpening: 'is-opening',
			classClosing: 'is-closing'
		},
	
		events: {
	
			init: function init() {
				var _this = this;
	
				var Module = this.constructor;
	
				this.toggle(this.$settings.is === 'open', false);
	
				if (this.$settings.transition === true) {
					this.$element.addEventListener('transitionend', function (e) {
						if (e.target === _this.$element) {
							Module.trigger('transitionEnd', { target: _this });
						}
					});
				}
			},
	
			transitionStart: function transitionStart() {
				var classes = this.$element.classList;
	
				if (this.showing) {
					classes.remove(this.$settings.classClosed);
					classes.add(this.$settings.classClosing);
	
					Element.repaint(this.$element);
	
					classes.remove(this.$settings.classClosing);
					classes.add(this.$settings.classOpening);
				} else {
					classes.remove(this.$settings.classOpen);
					classes.add(this.$settings.classOpening);
	
					Element.repaint(this.$element);
	
					classes.remove(this.$settings.classOpening);
					classes.add(this.$settings.classClosing);
				}
			},
	
			transitionEnd: function transitionEnd() {
				var classes = this.$element.classList;
	
				if (this.showing) {
					classes.remove(this.$settings.classOpening);
					classes.add(this.$settings.classOpen);
				} else {
					classes.remove(this.$settings.classClosing);
					classes.add(this.$settings.classClosed);
				}
			}
		},
	
		methods: {
	
			toggle: function toggle(isOpen) {
				var transition = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
				var Module = this.constructor;
				var classes = this.$element.classList;
	
				var oldShowing = this.showing;
				var newShowing = typeof isOpen === 'boolean' ? isOpen : !this.showing;
	
				if (oldShowing !== newShowing) {
					this.showing = newShowing;
	
					if (transition && this.$settings.transition) {
						Module.trigger('transitionStart', { target: this });
					} else {
						classes.remove(this.$settings.classClosing, this.$settings.classOpening);
						classes.toggle(this.$settings.classOpen, this.showing);
						classes.toggle(this.$settings.classClosed, !this.showing);
					}
	
					this.trigger('change', {
						property: 'selected',
						oldValue: oldShowing,
						newValue: newShowing
					});
	
					Module.trigger('toggle', {
						target: this,
						transition: transition
					});
				}
			},
	
			open: function open() {
				var transition = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
				this.toggle(true, transition);
			},
	
			close: function close() {
				var transition = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
				this.toggle(false, transition);
			},
	
			isOpen: function isOpen() {
				return this.showing;
			},
	
			isClosed: function isClosed() {
				return !this.showing;
			}
		}
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.closest = closest;
	exports.data = data;
	exports.repaint = repaint;
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
	
	function repaint() {
		var element = arguments.length <= 0 || arguments[0] === undefined ? document.body : arguments[0];
	
		element.offsetTop;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _config = __webpack_require__(2);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _emitter = __webpack_require__(6);
	
	var _emitter2 = _interopRequireDefault(_emitter);
	
	var _element = __webpack_require__(4);
	
	var Element = _interopRequireWildcard(_element);
	
	var _parser = __webpack_require__(7);
	
	var Parser = _interopRequireWildcard(_parser);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Base = function (_Emitter) {
		_inherits(Base, _Emitter);
	
		_createClass(Base, null, [{
			key: 'getDirective',
			value: function getDirective() {
				var owner = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				var Module = this;
				var d = Module.directive;
	
				if (owner) {
					var OwnerModule = owner.constructor;
					var od = OwnerModule.getDirective(owner.$owner);
	
					return od + '-' + d;
				}
	
				return d;
			}
		}, {
			key: 'getSelector',
			value: function getSelector() {
				var owner = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				var Module = this;
	
				var p = _config2.default.directivePrefix;
				var d = Module.getDirective(owner);
				var selector = ['[' + p + d + ']'];
	
				if (owner) {
					var ref = owner.$element.getAttribute(p + 'ref');
					selector.push('[' + p + d + '\\:' + ref + ']');
				}
	
				return selector.join(',');
			}
		}, {
			key: 'getSettings',
			value: function getSettings(element) {
				var owner = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
				var Module = this;
	
				var p = _config2.default.directivePrefix;
				var d = Module.getDirective(owner);
				var ref = Module.getReference(element, owner);
				var settings = '';
	
				if (ref) {
					settings = element.getAttribute('' + p + d + ':' + ref);
				} else {
					settings = element.getAttribute('' + p + d) || element.getAttribute(d);
				}
	
				return Parser.settings(settings);
			}
		}, {
			key: 'getReference',
			value: function getReference(element) {
				var owner = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
				var Module = this;
	
				var p = _config2.default.directivePrefix;
				var d = Module.getDirective(owner);
	
				if (!element.hasAttribute('' + p + d) && owner) {
					var ref = owner.$element.getAttribute(p + 'ref');
					var hasRef = element.hasAttribute('' + p + d + ':' + ref);
	
					if (hasRef) {
						return ref;
					}
				}
	
				return null;
			}
		}, {
			key: 'trigger',
			value: function trigger(eventType) {
				var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
				var Module = this;
				var ExtendedModule = Module.extending;
				var eventFn = Module.events[eventType];
	
				if (eventFn) {
					eventFn.call(data.target, data);
				}
	
				if (ExtendedModule) {
					ExtendedModule.trigger(eventType, data);
				}
			}
		}, {
			key: 'extend',
			value: function extend(settings) {
				var SuperModule = this;
				var Module = function Module() {
					SuperModule.apply(this, arguments);
				};
	
				Module.prototype = new SuperModule();
	
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
	
				Module.prototype.constructor = Module;
	
				Module.getDirective = SuperModule.getDirective;
				Module.getSelector = SuperModule.getSelector;
				Module.getSettings = SuperModule.getSettings;
				Module.getReference = SuperModule.getReference;
				Module.trigger = SuperModule.trigger;
				Module.extend = SuperModule.extend;
				Module.start = SuperModule.start;
	
				Module.extending = SuperModule;
				Module.directive = settings.directive;
				Module.modules = Object.assign({}, SuperModule.modules, settings.modules);
				Module.defaults = Object.assign({}, SuperModule.defaults, settings.defaults);
				Module.methods = Module.prototype;
				Module.events = settings.events || {};
	
				return Module;
			}
		}, {
			key: 'start',
			value: function start() {
				var container = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
				var owner = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
				var Module = this;
				var elements = container.querySelectorAll(Module.getSelector(owner));
				var modules = [];
	
				var p = _config2.default.directivePrefix;
	
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = Array.from(elements)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var element = _step2.value;
	
						if (owner && !Module.getReference(element, owner)) {
							var OwnerModule = owner.constructor;
							var ownerElement = Element.closest(element, OwnerModule.getSelector(owner.$owner));
							if (ownerElement !== owner.$element) {
								continue;
							}
						}
	
						var settings = Module.getSettings(element, owner);
						var e = {
							element: element,
							settings: settings
						};
	
						Module.trigger('beforeInit', e);
	
						var module = new Module(e.element, e.settings, owner);
	
						var _iteratorNormalCompletion3 = true;
						var _didIteratorError3 = false;
						var _iteratorError3 = undefined;
	
						try {
							for (var _iterator3 = Object.keys(Module.modules)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
								var property = _step3.value;
	
								var SubModule = Module.modules[property];
								var subModules = SubModule.start(container, module);
	
								module.$owns[property] = subModules;
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
	
						module.$element.removeAttribute(p + 'cloak');
	
						Module.trigger('init', { target: module });
	
						modules.push(module);
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
	
				return modules;
			}
		}]);
	
		function Base(element) {
			var settings = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			var owner = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
			_classCallCheck(this, Base);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Base).call(this));
	
			_emitter2.default.call(_this);
	
			if (!element) return _possibleConstructorReturn(_this);
	
			var Module = _this.constructor;
	
			_this.$element = element;
			_this.$owner = owner;
			_this.$owns = {};
			_this.$settings = Object.assign({}, Module.defaults, settings);
	
			Element.data(element, Module.getDirective(owner), _this);
			return _this;
		}
	
		return Base;
	}(_emitter2.default);
	
	exports.default = Base;
	
	
	Base.directive = null;
	Base.modules = {};
	Base.defaults = {};
	Base.methods = Base.prototype;
	Base.events = {};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
		function _class() {
			_classCallCheck(this, _class);
	
			this.events = {};
		}
	
		_createClass(_class, [{
			key: "on",
			value: function on(type, callback) {
				if (!this.events.hasOwnProperty(type)) {
					this.events[type] = [];
				}
	
				this.events[type].push(callback);
			}
		}, {
			key: "off",
			value: function off(type) {
				var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
				if (callback && this.events.hasOwnProperty(type)) {
					var newList = [];
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = this.events[type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var cb = _step.value;
	
							if (cb !== callback) {
								newList.push(cb);
							}
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
	
					this.events[type] = newList;
				} else {
					delete this.events[type];
				}
			}
		}, {
			key: "trigger",
			value: function trigger(type) {
				var event = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
				if (this.events.hasOwnProperty(type)) {
					event.type = type;
	
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
	
					try {
						for (var _iterator2 = this.events[type][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var cb = _step2.value;
	
							cb.call(this, event);
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
			}
		}]);

		return _class;
	}();

	exports.default = _class;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.settings = settings;
	exports.value = value;
	exports.method = method;
	
	var _method = __webpack_require__(8);
	
	var _method2 = _interopRequireDefault(_method);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function settings() {
		var string = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
		string = typeof string === 'string' ? string : '';
	
		if (string[0] === '{') {
			return JSON.parse(string);
		}
	
		var parsed = {};
	
		var parts = string.trim().split(/\s+/);
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var part = _step.value;
	
				var item = part.split(':');
				var setting = item[0];
	
				parsed[setting] = item.length > 1 ? value(item[1]) : true;
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
	
	function value(data) {
		if (!isNaN(data)) {
			return parseFloat(data);
		}
	
		if (data === 'true') {
			return true;
		}
	
		if (data === 'false') {
			return false;
		}
	
		return data;
	}
	
	function method(data) {
		if (typeof data === 'string') {
			var eventMethod = data;
			var methodParts = eventMethod.split('|');
			var methodName = methodParts[0];
			var methodArgs = methodParts[1] ? methodParts[1].split('') : [];
	
			for (var i = 0; i < methodArgs.length; i++) {
				methodArgs[i] = value(methodArgs[i]);
			}
	
			return new _method2.default(methodName, methodArgs);
		}
	
		return data;
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
		function _class(name) {
			var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
			_classCallCheck(this, _class);
	
			this.name = name;
			this.args = args;
		}
	
		_createClass(_class, [{
			key: 'run',
			value: function run(module) {
				if (typeof module[this.name] === 'function') {
					return module[this.name].apply(module, this.args);
				}
	
				return module[this.name];
			}
		}]);

		return _class;
	}();

	exports.default = _class;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _lum = __webpack_require__(1);
	
	var _lum2 = _interopRequireDefault(_lum);
	
	var _base = __webpack_require__(5);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _parser = __webpack_require__(7);
	
	var Parser = _interopRequireWildcard(_parser);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _base2.default.extend({
		directive: 'action',
	
		events: {
	
			beforeInit: function beforeInit(e) {
				var newSettings = {};
	
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = Object.keys(e.settings)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var setting = _step.value;
	
						var value = e.settings[setting];
						var eventType = setting;
						var eventMethod = value;
	
						if (value === true) {
							eventType = 'click';
							eventMethod = setting;
						}
	
						if (!newSettings.hasOwnProperty(eventType)) {
							newSettings[eventType] = [];
						}
	
						newSettings[eventType].push(Parser.method(eventMethod));
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
	
				e.settings = newSettings;
			},
	
			init: function init() {
				var _this = this;
	
				var settings = this.$settings;
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					var _loop = function _loop() {
						var eventType = _step2.value;
	
						settings[eventType].forEach(function (method) {
							_this.$element.addEventListener(eventType, function (e) {
								e.preventDefault();
								method.run(_this.$owner);
							});
						});
					};
	
					for (var _iterator2 = Object.keys(settings)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						_loop();
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
		}
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _lum = __webpack_require__(1);
	
	var _lum2 = _interopRequireDefault(_lum);
	
	var _base = __webpack_require__(5);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _parser = __webpack_require__(7);
	
	var Parser = _interopRequireWildcard(_parser);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _base2.default.extend({
		directive: 'class',
	
		events: {
	
			beforeInit: function beforeInit(e) {
				var newSettings = {};
	
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = Object.keys(e.settings)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var setting = _step.value;
	
						var value = e.settings[setting];
						var className = setting;
						var eventMethod = value;
	
						newSettings[className] = Parser.method(eventMethod);
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
	
				e.settings = newSettings;
			},
	
			init: function init() {
				var _this = this;
	
				var settings = this.$settings;
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					var _loop = function _loop() {
						var className = _step2.value;
	
						var method = settings[className];
	
						_this.$owner.on('change', function (e) {
							var toggle = method.run(_this.$owner);
							_this.$element.classList.toggle(className, toggle);
						});
					};
	
					for (var _iterator2 = Object.keys(settings)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						_loop();
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
		}
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _element = __webpack_require__(4);
	
	var Element = _interopRequireWildcard(_element);
	
	var _base = __webpack_require__(5);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _toggler = __webpack_require__(3);
	
	var _toggler2 = _interopRequireDefault(_toggler);
	
	var _action = __webpack_require__(9);
	
	var _action2 = _interopRequireDefault(_action);
	
	var _class = __webpack_require__(10);
	
	var _class2 = _interopRequireDefault(_class);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = _base2.default.extend({
		directive: 'selector',
	
		modules: {
			actions: _action2.default,
			classes: _class2.default,
			items: _toggler2.default.extend({ directive: 'item' })
		},
	
		defaults: {
			selected: 0,
			interval: 0,
			classSelected: 'is-selected'
		},
	
		events: {
	
			init: function init() {
				var Module = this.constructor;
	
				this.select(this.$settings.selected | 0, false);
	
				if (this.$settings.interval > 0) {
					this.play();
				} else {
					this.stop();
				}
			}
		},
	
		methods: {
	
			select: function select(index) {
				var transition = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
				var oldSelected = this.selected;
				var newSelected = index | 0;
	
				if (oldSelected !== newSelected) {
					this.selected = newSelected;
	
					for (var i = 0; i < this.$owns.items.length; i++) {
						var item = this.$owns.items[i];
	
						item.toggle(i === newSelected, transition);
						item.$element.classList.toggle(this.$settings.classSelected, i === newSelected);
					}
	
					this.trigger('change', {
						property: 'selected',
						oldValue: oldSelected,
						newValue: newSelected
					});
				}
			},
	
			go: function go() {
				var count = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
				var transition = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
				var total = this.$owns.items.length;
				var selected = (this.selected + count) % total;
	
				if (selected < 0) {
					selected += total;
				}
	
				this.select(selected, transition);
			},
	
			next: function next() {
				var transition = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
				this.go(1, transition);
			},
	
			previous: function previous() {
				var transition = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
				this.go(-1, transition);
			},
	
			play: function play() {
				var _this = this;
	
				var interval = arguments.length <= 0 || arguments[0] === undefined ? this.$settings.interval : arguments[0];
	
				this._interval = setInterval(function () {
					return _this.next();
				}, interval | 0);
	
				this.trigger('change', {
					property: 'interval',
					oldValue: false,
					newValue: true
				});
			},
	
			stop: function stop() {
				clearInterval(this._interval);
				this._interval = false;
	
				this.trigger('change', {
					property: 'interval',
					oldValue: true,
					newValue: false
				});
			},
	
			isSelected: function isSelected(index) {
				return this.selected === index;
			},
	
			isFirst: function isFirst() {
				return this.isSelected(0);
			},
	
			isLast: function isLast() {
				return this.isSelected(this.$owns.items.length - 1);
			},
	
			isPlaying: function isPlaying() {
				return this._interval !== false;
			}
		}
	});

/***/ }
/******/ ]);
//# sourceMappingURL=luminate.js.map