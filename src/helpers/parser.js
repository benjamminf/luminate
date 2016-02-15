import Method from './method'

export function settings(string = '')
{
	const parsed = {}

	let parts = string.trim().split(/\s+/)
	for(let part of parts)
	{
		let item = part.split(':')
		let setting = item[0]

		if(item.length > 1)
		{
			let value = item[1]

			if(!isNaN(value))
			{
				value = parseFloat(value)
			}
			else if(value === 'true')
			{
				value = true
			}
			else if(value === 'false')
			{
				value = false
			}

			parsed[setting] = value
		}
		else
		{
			parsed[setting] = true
		}
	}

	return parsed
}

export function method(value)
{
	if(typeof value === 'string')
	{
		let eventMethod = value
		let methodParts = eventMethod.split('|')
		let methodName = methodParts[0]
		let methodArgs = methodParts[1] ? methodParts[1].split('') : []

		return new Method(methodName, methodArgs)
	}

	return value
}
