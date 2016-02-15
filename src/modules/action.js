import Lum from '../lum'
import Base from './base'

export default Base.extend({

	methods: {

		bind: function(eventType, eventMethod)
		{
			this.$element.addEventListener(eventType, e =>
			{
				e.preventDefault()

				this.$owner[eventMethod.name].apply(this.$owner, eventMethod.args)
			})
		}
	},

	events: {

		beforeInit: function(e)
		{
			const newSettings = {}

			for(let setting of Object.keys(e.settings))
			{
				let value = e.settings[setting]
				let eventType = setting
				let eventMethod = value

				if(value === true)
				{
					eventType = 'click'
					eventMethod = setting
				}

				if(!newSettings.hasOwnProperty(eventType))
				{
					newSettings[eventType] = []
				}

				let methodParts = eventMethod.split('|')
				let methodName = methodParts[0]
				let methodArgs = methodParts[1] ? methodParts[1].split('') : []

				newSettings[eventType].push({
					name: methodName,
					args: methodArgs
				})
			}

			e.settings = newSettings
		},

		init: function()
		{
			const settings = this.$settings
			for(let eventType of Object.keys(settings))
			{
				for(let eventMethod of settings[eventType])
				{
					this.bind(eventType, eventMethod)
				}
			}
		}
	}
})
