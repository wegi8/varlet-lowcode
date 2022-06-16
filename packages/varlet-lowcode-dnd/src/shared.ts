export function mergeStyle(e: HTMLElement, newStyle: CSSStyleDeclaration, reset = false) {
  const _style = e.style
  for (const key in newStyle) {
    if (Object.prototype.hasOwnProperty.call(newStyle, key)) {
      _style[key] = reset ? '' : newStyle[key]
    }
  }
}
