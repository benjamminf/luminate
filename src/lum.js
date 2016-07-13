export default {
	version: '0.2.2',

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
