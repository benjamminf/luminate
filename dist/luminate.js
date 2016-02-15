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
	
	var _selector = __webpack_require__(8);
	
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
	
	var _action = __webpack_require__(7);
	
	var _action2 = _interopRequireDefault(_action);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = _base2.default.extend({
		directive: 'toggler',
	
		modules: {
	
			actions: _action2.default.extend({
				directive: 'toggler-action'
			})
		},
	
		defaults: {
			is: 'open',
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
	
				if (this.isOpen) {
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
	
				if (this.isOpen) {
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
				var prevIsOpen = this.isOpen;
				var classes = this.$element.classList;
	
				this.isOpen = typeof isOpen === 'boolean' ? isOpen : !this.isOpen;
	
				if (transition && this.isOpen !== prevIsOpen) {
					Module.trigger('transitionStart', { target: this });
				} else {
					classes.remove(this.$settings.classClosing, this.$settings.classOpening);
					classes.toggle(this.$settings.classOpen, this.isOpen);
					classes.toggle(this.$settings.classClosed, !this.isOpen);
				}
			},
	
			open: function open() {
				var transition = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
				this.toggle(true, transition);
			},
	
			close: function close() {
				var transition = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
				this.toggle(false, transition);
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
	
	var _element = __webpack_require__(4);
	
	var Element = _interopRequireWildcard(_element);
	
	var _parser = __webpack_require__(6);
	
	var Parser = _interopRequireWildcard(_parser);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Base = function () {
		_createClass(Base, null, [{
			key: 'getSelector',
			value: function getSelector() {
				var owner = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				var Module = this;
	
				var p = _config2.default.directivePrefix;
				var d = Module.directive;
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
				var d = Module.directive;
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
				var d = Module.directive;
	
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
	
			var Module = this.constructor;
	
			this.$element = element;
			this.$owner = owner;
			this.$owns = {};
			this.$settings = Object.assign({}, Module.defaults, settings);
	
			Element.data(element, Module.directive, this);
		}
	
		return Base;
	}();
	
	exports.default = Base;
	
	
	Base.directive = null;
	Base.modules = {};
	Base.defaults = {};
	Base.methods = Base.prototype;
	Base.events = {};

/***/ },
/* 6 */
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _lum = __webpack_require__(1);
	
	var _lum2 = _interopRequireDefault(_lum);
	
	var _base = __webpack_require__(5);
	
	var _base2 = _interopRequireDefault(_base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _base2.default.extend({
	
		methods: {
	
			bind: function bind(eventType, eventMethod) {
				var _this = this;
	
				this.$element.addEventListener(eventType, function (e) {
					e.preventDefault();
	
					_this.$owner[eventMethod.name].apply(_this.$owner, eventMethod.args);
				});
			}
		},
	
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
	
						var methodParts = eventMethod.split('|');
						var methodName = methodParts[0];
						var methodArgs = methodParts[1] ? methodParts[1].split('') : [];
	
						newSettings[eventType].push({
							name: methodName,
							args: methodArgs
						});
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
				var settings = this.$settings;
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = Object.keys(settings)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var eventType = _step2.value;
						var _iteratorNormalCompletion3 = true;
						var _didIteratorError3 = false;
						var _iteratorError3 = undefined;
	
						try {
							for (var _iterator3 = settings[eventType][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
								var eventMethod = _step3.value;
	
								this.bind(eventType, eventMethod);
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
/* 8 */
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
	
	var _action = __webpack_require__(7);
	
	var _action2 = _interopRequireDefault(_action);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = _base2.default.extend({
		directive: 'selector',
	
		modules: {
	
			actions: _action2.default.extend({
				directive: 'selector-action'
			}),
	
			items: _toggler2.default.extend({
				directive: 'selector-item'
			})
		},
	
		defaults: {
			selected: 0,
			classSelected: 'is-selected'
		},
	
		events: {
	
			init: function init() {
				var Module = this.constructor;
	
				this.select(this.$settings.selected | 0, false);
			}
		},
	
		methods: {
	
			select: function select(index) {
				var transition = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
				this.selected = index | 0;
	
				for (var i = 0; i < this.$owns.items.length; i++) {
					var item = this.$owns.items[i];
	
					item.toggle(i === this.selected, transition);
				}
			}
		}
	});

/***/ }
/******/ ]);
//# sourceMappingURL=luminate.js.map