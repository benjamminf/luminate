import Method from './method'

export function settings(string = '')
{
	string = (typeof string === 'string' ? string : '')
	
	const parsed = {}

	let parts = string.trim().split(/\s+/)
	for(let part of parts)
	{
		let item = part.split(':')
		let setting = item[0]

		parsed[setting] = (item.length > 1 ? value(item[1]) : true)
	}

	return parsed
}

export function value(data)
{
	if(!isNaN(data))
	{
		return parseFloat(data)
	}

	if(data === 'true')
	{
		return true
	}

	if(data === 'false')
	{
		return false
	}

	return data
}

export function method(data)
{
	if(typeof data === 'string')
	{
		let eventMethod = data
		let methodParts = eventMethod.split('|')
		let methodName = methodParts[0]
		let methodArgs = methodParts[1] ? methodParts[1].split('') : []

		for(let i = 0; i < methodArgs.length; i++)
		{
			methodArgs[i] = value(methodArgs[i])
		}

		return new Method(methodName, methodArgs)
	}

	return data
}
