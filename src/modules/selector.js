import * as Element from '../helpers/element'
import Base from './base'
import Toggler from './toggler'
import Action from './action'
import Class from './class'

export default Base.extend({
	directive: 'selector',

	modules: {

		actions: Action.extend({
			directive: 'selector-action'
		}),

		classes: Class.extend({
			directive: 'selector-class'
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
			const oldSelected = this.selected
			const newSelected = index | 0

			if(oldSelected !== newSelected)
			{
				this.selected = newSelected

				for(let i = 0; i < this.$owns.items.length; i++)
				{
					let item = this.$owns.items[i]

					item.toggle(i === newSelected, transition)
				}

				this.trigger('change', {
					property: 'selected',
					oldValue: oldSelected,
					newValue: newSelected
				})
			}
		},

		isSelected: function(index)
		{
			return this.selected === index
		}
	}
})
