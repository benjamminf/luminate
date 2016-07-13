import Config from '../config'
import Emitter from '../helpers/emitter'
import * as Element from '../helpers/element'
import * as Parser from '../helpers/parser'

export default class Base extends Emitter
{
	static getDirective(owner = null)
	{
		const Module = this
		const d = Module.directive

		if(owner)
		{
			const OwnerModule = owner.constructor
			const od = OwnerModule.getDirective(owner.$owner)

			return `${od}-${d}`
		}

		return d
	}

	static getSelector(owner = null)
	{
		const Module = this

		let p = Config.directivePrefix
		let d = Module.getDirective(owner)
		let selector = [`[${p}${d}]`]

		if(owner)
		{
			let ref = owner.$element.getAttribute(`${p}ref`)
			selector.push(`[${p}${d}\\:${ref}]`)
		}

		return selector.join(',')
	}

	static getSettings(element, owner = null)
	{
		const Module = this

		let p = Config.directivePrefix
		let d = Module.getDirective(owner)
		let ref = Module.getReference(element, owner)
		let settings = ''

		if(ref)
		{
			settings = element.getAttribute(`${p}${d}:${ref}`)
		}
		else
		{
			settings = element.getAttribute(`${p}${d}`) || element.getAttribute(d)
		}

		return Parser.settings(settings)
	}

	static getReference(element, owner = null)
	{
		const Module = this

		let p = Config.directivePrefix
		let d = Module.getDirective(owner)

		if(!element.hasAttribute(`${p}${d}`) && owner)
		{
			let ref = owner.$element.getAttribute(`${p}ref`)
			let hasRef = element.hasAttribute(`${p}${d}:${ref}`)

			if(hasRef)
			{
				return ref
			}
		}

		return null
	}

	static trigger(eventType, data = {})
	{
		const Module = this
		const ExtendedModule = Module.extending
		const eventFn = Module.events[eventType]

		if(eventFn)
		{
			eventFn.call(data.target, data)
		}

		if(ExtendedModule && !data.stopPropagation)
		{
			ExtendedModule.trigger(eventType, data)
		}
	}

	static extend(settings)
	{
		const SuperModule = this
		const Module = function()
		{
			SuperModule.apply(this, arguments)
		}

		Module.prototype = new SuperModule()

		if(settings.methods)
		{
			for(let name of Object.keys(settings.methods))
			{
				let method = settings.methods[name]
				Module.prototype[name] = method
			}
		}

		Module.prototype.constructor = Module

		Module.getDirective = SuperModule.getDirective
		Module.getSelector = SuperModule.getSelector
		Module.getSettings = SuperModule.getSettings
		Module.getReference = SuperModule.getReference
		Module.trigger = SuperModule.trigger
		Module.extend = SuperModule.extend
		Module.start = SuperModule.start

		Module.extending = SuperModule
		Module.directive = settings.directive
		Module.modules = Object.assign({}, SuperModule.modules, settings.modules)
		Module.defaults = Object.assign({}, SuperModule.defaults, settings.defaults)
		Module.methods = Module.prototype
		Module.events = settings.events || {}

		return Module
	}

	static start(container = document, owner = null)
	{
		const Module = this
		const elements = container.querySelectorAll(Module.getSelector(owner))
		const modules = []

		let p = Config.directivePrefix

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

			Module.trigger('beforeInit', e)

			let module = new Module(e.element, e.settings, owner)

			for(let property of Object.keys(Module.modules))
			{
				let SubModule = Module.modules[property]
				let subModules = SubModule.start(container, module)

				module.$owns[property] = subModules
			}

			module.$element.removeAttribute(`${p}cloak`)

			Module.trigger('init', {target: module})

			modules.push(module)
		}

		return modules
	}

	constructor(element, settings = {}, owner = null)
	{
		super()
		Emitter.call(this)

		if(!element) return

		const Module = this.constructor

		this.$element = element
		this.$owner = owner
		this.$owns = {}
		this.$settings = Object.assign({}, Module.defaults, settings)

		Element.data(element, Module.getDirective(owner), this)
	}
}

Base.directive = null
Base.modules = {}
Base.defaults = {}
Base.methods = Base.prototype
Base.events = {}
