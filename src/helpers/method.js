export default class
{
	constructor(name, args = [])
	{
		this.name = name
		this.args = args
	}

	run(module)
	{
		if(typeof module[this.name] === 'function')
		{
			return module[this.name].apply(module, this.args)
		}

		return module[this.name]
	}
}
