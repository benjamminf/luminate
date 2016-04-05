import * as Element from '../helpers/element'
import Base from './base'
import Toggler from './toggler'
import Action from './action'
import Class from './class'

export default Base.extend({
	directive: 'selector',

	modules: {
		actions: Action,
		classes: Class,
		items: Toggler.extend({directive: 'item'})
	},

	defaults: {
		selected: 0,
		interval: 0,
		classSelected: 'is-selected'
	},

	events: {

		init: function()
		{
			const Module = this.constructor

			this.select(this.$settings.selected | 0, false)

			if(this.$settings.interval > 0)
			{
				this.play()
			}
			else
			{
				this.stop()
			}
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
					item.$element.classList.toggle(this.$settings.classSelected, i === newSelected)
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

		play: function(interval = this.$settings.interval)
		{
			this._interval = setInterval(() => this.next(), interval | 0)
		},

		stop: function()
		{
			clearInterval(this._interval)
			this._interval = false
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
		},

		isPlaying: function()
		{
			return this._interval !== false
		}
	}
})
