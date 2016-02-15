import * as Element from '../helpers/element'
import Base from './base'
import Action from './action'

export default Base.extend({
	directive: 'toggler',

	modules: {

		actions: Action.extend({
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

		init: function()
		{
			const Module = this.constructor

			this.toggle(this.$settings.is === 'open', false)

			if(this.$settings.transition === true)
			{
				this.$element.addEventListener('transitionend', e =>
				{
					if(e.target === this.$element)
					{
						Module.trigger('transitionEnd', {target: this})
					}
				})
			}
		},

		transitionStart: function()
		{
			const classes = this.$element.classList

			if(this.isOpen)
			{
				classes.remove(this.$settings.classClosed)
				classes.add(this.$settings.classClosing)

				Element.repaint(this.$element)

				classes.remove(this.$settings.classClosing)
				classes.add(this.$settings.classOpening)
			}
			else
			{
				classes.remove(this.$settings.classOpen)
				classes.add(this.$settings.classOpening)

				Element.repaint(this.$element)

				classes.remove(this.$settings.classOpening)
				classes.add(this.$settings.classClosing)
			}
		},

		transitionEnd: function()
		{
			const classes = this.$element.classList

			if(this.isOpen)
			{
				classes.remove(this.$settings.classOpening)
				classes.add(this.$settings.classOpen)
			}
			else
			{
				classes.remove(this.$settings.classClosing)
				classes.add(this.$settings.classClosed)
			}
		}
	},

	methods: {

		toggle: function(isOpen, transition = true)
		{
			const Module = this.constructor
			const prevIsOpen = this.isOpen
			const classes = this.$element.classList

			this.isOpen = (typeof isOpen === 'boolean' ? isOpen : !this.isOpen)

			if(transition && this.isOpen !== prevIsOpen)
			{
				Module.trigger('transitionStart', {target: this})
			}
			else
			{
				classes.remove(this.$settings.classClosing, this.$settings.classOpening)
				classes.toggle(this.$settings.classOpen, this.isOpen)
				classes.toggle(this.$settings.classClosed, !this.isOpen)
			}

			Module.trigger('toggle', {
				target: this,
				transition: transition
			})
		},

		open: function(transition = true)
		{
			this.toggle(true, transition)
		},

		close: function(transition = true)
		{
			this.toggle(false, transition)
		}
	}
})
