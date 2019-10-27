/**
 * Navigable is a render prop component
 * which output its children with 
 * a component that provides 
 * new set of props as inputs
 */

import React from 'react'
import PropTypes from 'prop-types'
import list from './list'

const Navigable = ({ 
  items, activeItem, onSelectItem, children,
  circular,
}) => {
  if (!items) return null
  if (!children) return null

  let fns
  let prevIndex, canPrev, nextIndex, canNext

  React.useEffect(() => {
    const count = items.length
    const index = items.indexOf(activeItem)
    fns = list(count, index, circular)
    prevIndex = fns.prevIndex()
    canPrev = fns.canPrev()
    nextIndex = fns.nextIndex()
    canNext = fns.canNext()
  }, [items, activeItem, circular])

  const goto = React.useCallback(onSelectItem)
  const prev = React.useCallback(() => canPrev && goto(items[prevIndex]))
  const next = React.useCallback(() => canNext && goto(items[nextIndex]))

  const newProps = { 
    items, activeItem, 
    goto,
    prevIndex, canPrev, prev, 
    nextIndex, canNext, next,
  }

  return children(newProps)
}

Navigable.propTypes = {
  items: PropTypes.array, 
  activeItem: PropTypes.any, 
  onSelectItem: PropTypes.func, 
  children: PropTypes.func,
  circular: PropTypes.bool,
}

Navigable.defaultProps = {
  items: null,
  activeItem: null,
  onSelectItem: () => {},
  children: null,
  circular: false
}

export default Navigable