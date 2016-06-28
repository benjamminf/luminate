export default class
{
	constructor(name, args = [])
	{
		this.name = name
		this.args = args
	}

	run(target, source = null)
	{
		source = source || target

		let value
		let e = {
			name: this.name,
			args: this.args,
			caller: source
		}

		target.trigger('methodCall', e)

		if(typeof target[e.name] === 'function')
		{
			value = target[e.name].apply(target, e.args)
		}
		else
		{
			value = target[this.name]
		}

		e = {
			name: e.name,
			args: e.args,
			value: value,
			caller: source
		}

		target.trigger('methodReturn', e)

		return e.value
	}
}
