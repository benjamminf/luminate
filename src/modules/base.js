import * as Element from '../helpers/element'
import * as Parser from '../helpers/parser'

export default class Base
{
	static getSelector()
	{
		const Module = this

		let d = Module.directive
		return `[${d}],[data-${d}]`
	}

	static getSettings(element)
	{
		const Module = this

		let d = Module.directive
		let s = element.getAttribute('data-' + d) || element.getAttribute(d)

		return Parser.settings(s)
	}

	static extend(settings)
	{
		const SuperModule = this
		const Module = class extends SuperModule {}

		if(settings.methods)
		{
			for(let name of Object.keys(settings.methods))
			{
				let method = settings.methods[name]
				Module.prototype[name] = method
			}
		}

		Module.getSelector = SuperModule.getSelector
		Module.getSettings = SuperModule.getSettings
		Module.extend = SuperModule.extend
		Module.start = SuperModule.start

		Module.directive = settings.directive
		Module.modules = Object.assign({}, SuperModule.modules, settings.modules)
		Module.defaults = Object.assign({}, SuperModule.defaults, settings.defaults)
		Module.methods = Module.prototype
		Module.events = Object.assign({}, SuperModule.events, settings.events)

		return Module
	}

	static start(container = document, owner = null)
	{
		const Module = this
		const elements = container.querySelectorAll(Module.getSelector())

		for(let element of Array.from(elements))
		{
			if(owner)
			{
				let OwnerModule = owner.constructor
				let ownerElement = Element.closest(element, OwnerModule.getSelector())
				if(ownerElement !== owner.$element)
				{
					continue;
				}
			}

			let settings = Module.getSettings(element)
			let e = {
				element: element,
				settings: settings
			}

			Module.events.beforeInit(e)
			new Module(e.element, e.settings, owner)
		}
	}

	constructor(element, settings = {}, owner = null)
	{
		const Module = this.constructor

		this.$element = element
		this.$owner = owner
		this.$owns = []
		this.$settings = Object.assign({}, Module.defaults, settings)

		Element.data(element, Module.directive, this)

		for(let property of Object.keys(Module.modules))
		{
			let SubModule = Module.modules[property]

			SubModule.start(element, this)
		}

		Module.events.init.call(this)
	}
}

Base.directive = null
Base.modules = {}
Base.defaults = {}
Base.methods = Base.prototype
Base.events = {
	beforeInit: function() {},
	init: function() {},
	beforeDestroy: function() {},
	destroy: function() {}
}
