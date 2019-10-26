/**
 * Navigable is a render prop component
 * which output its children with 
 * a component that provides 
 * new set of props as inputs
 */

const defaultOptions = {
  useCallback: a => a
}

const Navigable = ({ 
  items, activeItem, onSelectItem, children 
}, { useCallback } = defaultOptions) => {
  if (!items) return null
  if (!children) return null

  const goto = useCallback(onSelectItem)
  const index = items.indexOf(activeItem)
  const canPrev = index > 0
  const prev = useCallback(() => canPrev && goto(items[index - 1]))
  const canNext = index + 1 < items.length
  const next = useCallback(() => canNext && goto(items[index + 1]))

  const newProps = { 
    items, activeItem, goto, index, 
    canPrev, prev, canNext, next,
  }

  return children(newProps)
}

export default Navigable