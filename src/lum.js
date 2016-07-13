export default {
	version: '0.2.3',

	register: function(module)
	{
		this._baseModules.push(module)
	},

	start: function(container = document)
	{
		for(let Module of this._baseModules)
		{
			Module.start(container)
		}
	},

	_baseModules: []
}
