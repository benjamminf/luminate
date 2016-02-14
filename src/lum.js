export default {
	version: '0.0.1',

	register: function(module)
	{
		this._baseModules.push(module)
	},

	start: function(container = document)
	{
		for(let module of this._baseModules)
		{
			module.start(container)
		}
	},

	_baseModules: []
}
