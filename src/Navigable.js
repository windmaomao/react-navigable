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
  items, activeItem, onSelectItem, children,
  circular,
}, { useCallback } = defaultOptions) => {
  if (!items) return null
  if (!children) return null

  const goto = useCallback(onSelectItem)
  const index = items.indexOf(activeItem)
  const count = items.length

  const prevIndex = index > 0 ? index - 1 : (
    !circular ? null : count - 1
  )
  const canPrev = prevIndex !== null
  const prev = useCallback(() => canPrev && goto(items[prevIndex]))

  const nextIndex = index < count - 1 ? index + 1 : (
    !circular ? null : 0
  )
  const canNext = nextIndex !== null
  const next = useCallback(() => canNext && goto(items[nextIndex]))

  const newProps = { 
    items, activeItem, goto, index, 
    prevIndex, canPrev, prev, 
    nextIndex, canNext, next,
  }

  return children(newProps)
}

export default Navigable