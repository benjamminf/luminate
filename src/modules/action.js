import Lum from '../lum'
import Base from './base'

export default Base.extend({
	
	methods: {

		bind: function(eventType, eventMethod)
		{
			this.$element.addEventListener(eventType, function(e)
			{
				console.log(eventMethod)
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

				newSettings[eventType].push(eventMethod)
			}

			e.settings = newSettings
		},

		init: function()
		{
			const settings = this.$settings
			for(let eventType of Object.keys(settings))
			{
				let eventMethod = settings[eventType]
				this.bind(eventType, eventMethod)
			}
		}
	}
})
