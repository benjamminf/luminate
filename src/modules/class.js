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
				let className = setting
				let eventMethod = value

				newSettings[className] = Parser.method(eventMethod)
			}

			e.settings = newSettings
		},

		init: function()
		{
			const settings = this.$settings
			for(let className of Object.keys(settings))
			{
				let method = settings[className]

				this.$owner.on('change', e =>
				{
					const toggle = method.run(this.$owner)
					this.$element.classList.toggle(className, toggle)
				})
			}
		}
	}
})
