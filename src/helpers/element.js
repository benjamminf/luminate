export function closest(element, selector)
{
	if(element.closest)
	{
		return element.closest(selector)
	}

	let currentElement = element
	while(currentElement)
	{
		if(currentElement.matches(selector))
		{
			return currentElement
		}

		currentElement = currentElement.parentElement
	}

	return null
}

const expando = `lum-${Date.now().toString(36)}_`
export function data(element, property, value)
{
	const expandoProperty = expando + property

	if(value !== undefined)
	{
		element[expandoProperty] = value
	}

	return element[expandoProperty]
}
