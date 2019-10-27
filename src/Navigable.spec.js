import React from 'react'
import { shallow } from 'enzyme'
import Navigable from './Navigable'

const n = (items, children, activeItem) => (
  <Navigable
    items={items}
    children={children}
    activeItem={activeItem}
  />
)

const list = [0, 1, 2]
describe('Navigable', () => {
  let children
  const render = item => shallow(n(list, children, item))
  beforeEach(() => {
    children = jest.fn()
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
    render(1)
    const calls = children.mock.calls
    expect(children).toHaveBeenCalled()
    expect(calls.length).toEqual(1)
  })
  
})