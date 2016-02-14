export function settings(string = '')
{
	const parsed = {}

	let parts = string.trim().split(/\s+/)
	for(let part of parts)
	{
		let item = part.split(':')
		parsed[item[0]] = item[1] || true
	}

	return parsed
}
