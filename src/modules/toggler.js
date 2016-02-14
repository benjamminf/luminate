import Lum from '../lum'
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
		classClosed: 'is-closed'
	},

	events: {

		init: function()
		{
			this.toggle(this.$settings.is === 'open')
		}
	},

	methods: {

		toggle: function(isOpen)
		{
			this.isOpen = (typeof isOpen === 'boolean' ? isOpen : !this.isOpen)

			const classes = this.$element.classList
			classes.toggle(this.$settings.classOpen, this.isOpen)
			classes.toggle(this.$settings.classClosed, !this.isOpen)
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
