import React from 'react'
import { shallow } from 'enzyme'
import Navigable from './Navigable'

const n = (items, children, activeItem, onSelectItem, circular, backward) => (
  <Navigable
    items={items}
    children={children}
    activeItem={activeItem}
    onSelectItem={onSelectItem}
    circular={circular}
    backward={backward}
  />
)

const list = [1, 2, 3]
const firstItem = 1
const lastItem = list.length

describe('Navigable', () => {
  jest.spyOn(React, "useEffect").mockImplementation(f => f())
  jest.spyOn(React, "useCallback").mockImplementation(f => f)

  let children
  let activeItem
  const select = item => { activeItem = item }
  const render = (item, circular, backward) => {
    activeItem = item
    shallow(n(list, children, activeItem, select, circular, backward))
  }
  const getArgs = call => {
    const calls = call.mock.calls
    return calls.length ? calls[0][0] : {}
  }

  beforeEach(() => {
    children = jest.fn()
    activeItem = null
  })  

  it('should return null without items', () => {
    const res = shallow(n(null, children))
    expect(res.children().length).toEqual(0)
  })


  it('should return null without children', () => {
    const res = shallow(n(list, null))
    expect(res.children().length).toEqual(0)
  })

  it('should render children', () => {
    render(firstItem)
    const calls = children.mock.calls
    expect(children).toHaveBeenCalled()
    expect(calls.length).toEqual(1)
  })

  it('should goto an item', () => {
    render(firstItem + 1)
    const { goto } = getArgs(children)
    goto(firstItem)
    expect(activeItem).toEqual(firstItem)
  })

  it('should go to the next item', () => {
    render(firstItem)
    const { next } = getArgs(children)
    next()
    expect(activeItem).toEqual(firstItem + 1)
  })

  it('should not go to the next item', () => {
    render(lastItem)
    const { next } = getArgs(children)
    next()
    expect(activeItem).toEqual(lastItem)
  })

  it('should go to the previous item', () => {
    render(lastItem)
    const { prev } = getArgs(children)
    prev()
    expect(activeItem).toEqual(lastItem - 1)
  })

  it('should not go to the previous item', () => {
    render(firstItem)
    const { prev } = getArgs(children)
    prev()
    expect(activeItem).toEqual(firstItem)
  })

  it('should circle to the first item', () => {
    render(lastItem, true)
    const { next } = getArgs(children)
    next()
    expect(activeItem).toEqual(firstItem)
  })

  it('should circle to the last item', () => {
    render(firstItem, true)
    const { prev } = getArgs(children)
    prev()
    expect(activeItem).toEqual(lastItem)
  })

  it('should circle back to the last item', () => {
    render(firstItem, true, true)
    const { next } = getArgs(children)
    next()
    expect(activeItem).toEqual(lastItem)
  })

  it('should circle back to the first item', () => {
    render(lastItem, true, true)
    const { prev } = getArgs(children)
    prev()
    expect(activeItem).toEqual(firstItem)
  })

})