import * as Element from '../helpers/element'
import Base from './base'
import Toggler from './toggler'
import Action from './action'

export default Base.extend({
	directive: 'selector',

	modules: {

		actions: Action.extend({
			directive: 'selector-action'
		}),

		items: Toggler.extend({
			directive: 'selector-item'
		})
	},

	defaults: {
		selected: 0,
		classSelected: 'is-selected'
	},

	events: {

		init: function()
		{
			const Module = this.constructor

			this.select(this.$settings.selected | 0, false)
		}
	},

	methods: {

		select: function(index, transition = true)
		{
			this.selected = index | 0

			for(let i = 0; i < this.$owns.items.length; i++)
			{
				let item = this.$owns.items[i]

				item.toggle(i === this.selected, transition)
			}
		}
	}
})
