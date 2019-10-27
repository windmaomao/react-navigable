/**
 * Navigable is a render prop component
 * which output its children with 
 * a component that provides 
 * new set of props as inputs
 */

import list from './list'
import { useCallback, useEffect } from 'react'

const Navigable = ({ 
  items, activeItem, onSelectItem, children,
  circular,
}) => {
  if (!items) return null
  if (!children) return null

  let fns
  let prevIndex, canPrev, nextIndex, canNext

  useEffect(() => {
    const count = items.length
    const index = items.indexOf(activeItem)
    fns = list(count, index, circular)
    prevIndex = fns.prevIndex()
    canPrev = fns.canPrev()
    nextIndex = fns.nextIndex()
    canNext = fns.canNext()
  }, [items, activeItem, circular])

  const goto = useCallback(onSelectItem)
  const prev = useCallback(() => canPrev && goto(items[prevIndex]))
  const next = useCallback(() => canNext && goto(items[nextIndex]))

  const newProps = { 
    items, activeItem, 
    goto,
    prevIndex, canPrev, prev, 
    nextIndex, canNext, next,
  }

  return children(newProps)
}

export default Navigable