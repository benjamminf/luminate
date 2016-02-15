import * as Element from '../helpers/element'
import * as Parser from '../helpers/parser'

export default class Base
{
	static getSelector(owner = null)
	{
		const Module = this

		let d = Module.directive
		let selector = [`[data-${d}]`, `[${d}]`]

		if(owner)
		{
			let ref = owner.$element.getAttribute('data-ref') || owner.$element.getAttribute('ref')
			selector.push(`[data-${d}\\:${ref}]`, `[${d}\\:${ref}]`)
		}

		return selector.join(',')
	}

	static getSettings(element, owner = null)
	{
		const Module = this

		let d = Module.directive
		let ref = Module.getReference(element, owner)
		let settings = ''

		if(ref)
		{
			settings = element.getAttribute(`data-${d}:${ref}`) || element.getAttribute(`${d}:${ref}`)
		}
		else
		{
			settings = element.getAttribute(`data-${d}`) || element.getAttribute(d)
		}

		return Parser.settings(settings)
	}

	static getReference(element, owner = null)
	{
		const Module = this

		let d = Module.directive

		if(!element.hasAttribute(`data-${d}`) && !element.hasAttribute(d) && owner)
		{
			let ref = owner.$element.getAttribute('data-ref') || owner.$element.getAttribute('ref')
			let hasRef = element.hasAttribute(`data-${d}:${ref}`) || element.hasAttribute(`${d}:${ref}`)

			if(hasRef)
			{
				return ref
			}
		}

		return null
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
		Module.getReference = SuperModule.getReference
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
		const elements = container.querySelectorAll(Module.getSelector(owner))

		for(let element of Array.from(elements))
		{
			if(owner && !Module.getReference(element, owner))
			{
				let OwnerModule = owner.constructor
				let ownerElement = Element.closest(element, OwnerModule.getSelector(owner.$owner))
				if(ownerElement !== owner.$element)
				{
					continue;
				}
			}

			let settings = Module.getSettings(element, owner)
			let e = {
				element: element,
				settings: settings
			}

			Module.events.beforeInit(e)
			let module = new Module(e.element, e.settings, owner)

			for(let property of Object.keys(Module.modules))
			{
				let SubModule = Module.modules[property]

				SubModule.start(container, module)
			}

			Module.events.init.call(module)
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
