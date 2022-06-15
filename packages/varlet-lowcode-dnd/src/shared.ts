

export function mergeStyle(e: HTMLElement, newStyle: CSSStyleDeclaration) {
  const _style = e.style
  for (const key in newStyle) {
    if (Object.prototype.hasOwnProperty.call(newStyle, key)) {
      _style[key] = newStyle[key]
    }
  }
}