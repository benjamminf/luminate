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

		go: function(count = 0, transition = true)
		{
			const total = this.$owns.items.length
			let selected = (this.selected + count) % total

			if(selected < 0)
			{
				selected += total
			}

			this.select(selected, transition)
		},

		next: function(transition = true)
		{
			this.go(1, transition)
		},

		previous: function(transition = true)
		{
			this.go(-1, transition)
		},

		isSelected: function(index)
		{
			return this.selected === index
		},

		isFirst: function()
		{
			return this.isSelected(0)
		},

		isLast: function()
		{
			return this.isSelected(this.$owns.items.length - 1)
		}
	}
})
