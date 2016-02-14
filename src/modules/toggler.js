import Lum from '../lum'
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
			this.toggle(this.$settings.is === 'open', false)

			if(this.$settings.transition)
			{
				this.$element.addEventListener('transitionend', e =>
				{
					if(e.target === this.$element)
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
				})
			}
		}
	},

	methods: {

		toggle: function(isOpen, transition = this.$settings.transition)
		{
			const prevIsOpen = this.isOpen
			const classes = this.$element.classList

			this.isOpen = (typeof isOpen === 'boolean' ? isOpen : !this.isOpen)

			if(transition && this.isOpen !== prevIsOpen)
			{
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
			}
			else
			{
				classes.remove(this.$settings.classClosing, this.$settings.classOpening)
				classes.toggle(this.$settings.classOpen, this.isOpen)
				classes.toggle(this.$settings.classClosed, !this.isOpen)
			}
		},

		open: function()
		{
			this.toggle(true)
		},

		close: function()
		{
			this.toggle(false)
		}
	}
})
