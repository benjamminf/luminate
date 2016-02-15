import Lum from '../lum'
import Base from './base'
import * as Parser from '../helpers/parser'

export default Base.extend({

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

				newSettings[eventType].push(Parser.method(eventMethod))
			}

			e.settings = newSettings
		},

		init: function()
		{
			const settings = this.$settings
			for(let eventType of Object.keys(settings))
			{
				settings[eventType].forEach(method =>
				{
					this.$element.addEventListener(eventType, e =>
					{
						e.preventDefault()
						method.run(this.$owner)
					})
				})
			}
		}
	}
})
