export default class
{
	constructor()
	{
		this.events = {}
	}

	on(type, callback)
	{
		if(!this.events.hasOwnProperty(type))
		{
			this.events[type] = []
		}

		this.events[type].push(callback)
	}

	off(type, callback = null)
	{
		if(callback && this.events.hasOwnProperty(type))
		{
			const newList = []
			for(let cb of this.events[type])
			{
				if(cb !== callback)
				{
					newList.push(cb)
				}
			}

			this.events[type] = newList
		}
		else
		{
			delete this.events[type]
		}
	}

	trigger(type, event = {})
	{
		if(this.events.hasOwnProperty(type))
		{
			event.type = type
			
			for(let cb of this.events[type])
			{
				cb.call(this, event)
			}
		}
	}
}
