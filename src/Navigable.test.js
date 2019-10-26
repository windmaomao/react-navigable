import Navigable from './Navigable'

describe('Navigable', () => {
  let children
  const items = [1, 2, 3]
  let activeItem
  const onSelectItem = item => { activeItem = item }
  const getArgs = call => {
    const calls = call.mock.calls
    return calls.length ? calls[0][0] : {}
  }
  const lastItem = items.length
  beforeEach(() => {
    children = jest.fn()
  })  

  it('should return null without items', () => {
    expect(Navigable({ children: 1 })).toEqual(null)
  })

  it('should return null without children', () => {
    expect(Navigable({ items: [] })).toEqual(null)
  })

  it('should call children function', () => {
    Navigable({ items, children })

    const calls = children.mock.calls    
    expect(children).toHaveBeenCalled()
    expect(calls.length).toEqual(1)
  })

  it('should goto a item', () => {
    activeItem = 1
    Navigable({ items, activeItem, onSelectItem, children })

    const { goto } = getArgs(children)
    goto(2)
    expect(activeItem).toEqual(2)
  })

  it('should be able to goto the next item', () => {
    activeItem = 1
    Navigable({ items, activeItem, onSelectItem, children })

    const { canNext } = getArgs(children)
    expect(canNext).toEqual(true)
  })

  it('should goto the next item', () => {
    activeItem = 1
    Navigable({ items, activeItem, onSelectItem, children })

    const { next } = getArgs(children)
    next()
    expect(activeItem).toEqual(2)
  })

  it('should not be able to goto the next item', () => {
    activeItem = lastItem
    Navigable({ items, activeItem, onSelectItem, children })

    const { canNext } = getArgs(children)
    expect(canNext).toEqual(false)
  })

  it('should be able to goto the prev item', () => {
    activeItem = 2
    Navigable({ items, activeItem, onSelectItem, children })

    const { canPrev } = getArgs(children)
    expect(canPrev).toEqual(true)
  })

  it('should goto the previous item', () => {
    activeItem = 2
    Navigable({ items, activeItem, onSelectItem, children })

    const { prev } = getArgs(children)
    prev()
    expect(activeItem).toEqual(1)
  })

  it('should not be able to goto the prev item', () => {
    activeItem = 1
    Navigable({ items, activeItem, onSelectItem, children })

    const { canPrev } = getArgs(children)
    expect(canPrev).toEqual(false)
  })

  it('should circle to the first item', () => {
    activeItem = lastItem
    Navigable({ 
      items, activeItem, onSelectItem, children,
      circular: true
   })

    const { next } = getArgs(children)
    next()
    expect(activeItem).toEqual(1)
  })

  it('should circle to the last item', () => {
    activeItem = 1
    Navigable({
      items, activeItem, onSelectItem, children,
      circular: true
    })

    const { prev } = getArgs(children)
    prev()
    expect(activeItem).toEqual(lastItem)
  })

})