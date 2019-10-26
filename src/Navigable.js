/**
 * Navigable is a render prop component
 * which output its children with 
 * a component that provides 
 * new set of props as inputs
 */

import { useCallback } from 'react'
import PropTypes from 'prop-types'

const Navigable = ({ 
  items, activeItem, onSelectItem, children 
}) => {
  if (!children) return null

  const goto = useCallback(onSelectItem)
  const index = items.indexOf(activeItem)
  const canPrev = index > 0
  const prev = useCallback(() => canPrev && goto(items[index - 1]))

  const newProps = { 
    items, activeItem, 
    goto, index, 
    canPrev, prev, 
  }

  return children(newProps)
}

Navigable.propTypes = {
  items: PropTypes.array,
  activeItem: PropTypes.any,
}

Navigable.defaultProps = {
  items: [],
  activeItem: null,
}

export default Navigable