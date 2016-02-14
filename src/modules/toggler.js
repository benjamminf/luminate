import Lum from '../lum'
import Base from './base'
import Action from './action'

export default Base.extend({
	directive: 'toggler',

	modules: {
		actions: Action.extend({
			directive: 'toggler-action'
		})
	}
})
