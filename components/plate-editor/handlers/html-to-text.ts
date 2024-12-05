export function htmlElementToText(element: HTMLElement) {
  let text = ''
  for (const child of Array.from(element.childNodes)) {
    switch (child.nodeType) {
      case Node.ELEMENT_NODE:
        text += handleElement(child as HTMLElement)
        break
      case Node.TEXT_NODE:
        text += child.nodeValue
        break
      default:
        break
    }
  }
  return text
}

// Handle specific HTML elements for text formatting
function handleElement(elem: HTMLElement) {
  let text = ''
  switch (elem.tagName.toLowerCase()) {
    case 'p':
    case 'div':
    case 'br':
      text += htmlElementToText(elem) + '\n'
      break
    case 'li':
      text += '- ' + htmlElementToText(elem) + '\n'
      break
    case 'ul':
    case 'ol':
      text += htmlElementToText(elem) + '\n'
      break
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      text += htmlElementToText(elem) + '\n'
      break
    case 'b':
    case 'strong':
      text += '*' + htmlElementToText(elem) + '*'
      break
    case 'i':
    case 'em':
      text += '_' + htmlElementToText(elem) + '_'
      break
    default:
      text += htmlElementToText(elem)
      break
  }
  return text
}
