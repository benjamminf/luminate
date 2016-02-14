export default {
	version: '0.0.1',

	register: function(module)
	{
		this._baseModules.push(module)
	},

	start: function(container = document)
	{
		const refElements = container.querySelectorAll('[data-ref],[ref]')
		for(let refElement of Array.from(refElements))
		{
			let ref = refElement.getAttribute('data-ref') || refElement.getAttribute('ref')
			this._refList.push(ref)
		}

		for(let Module of this._baseModules)
		{
			Module.start(container)
		}
	},

	_refList: [],
	_baseModules: []
}
