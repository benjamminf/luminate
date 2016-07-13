export function matches(element, selector)
{
	if(element.matches) return element.matches(selector)
	if(element.webkitMatchesSelector) return element.webkitMatchesSelector(selector)
	if(element.mozMatchesSelector) return element.mozMatchesSelector(selector)
	if(element.oMatchesSelector) return element.oMatchesSelector(selector)
	if(element.msMatchesSelector) return element.msMatchesSelector(selector)

	return false
}

export function closest(element, selector)
{
	if(element.closest)
	{
		return element.closest(selector)
	}

	let currentElement = element
	while(currentElement)
	{
		if(matches(currentElement, selector))
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

export function repaint(element = document.body)
{
	element.offsetTop
}
