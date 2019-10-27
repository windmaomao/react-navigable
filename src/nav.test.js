import nav from './nav'

const items = [0, 1, 2]
const lastItem = items.length - 1

describe('nav', () => {

  it('should return items count', () => {
    const fns = nav(items, 1)
    expect(fns.count()).toEqual(items.length)
  })

  it('should return item index', () => {
    const fns = nav(items, 2)
    expect(fns.index()).toEqual(2)
  })

  it('should be able to goto the next item', () => {
    const fns = nav(items, 1)
    expect(fns.canNext()).toEqual(true)
  })

  it('should not be able to goto the next item', () => {
    const fns = nav(items, lastItem)
    expect(fns.canNext()).toEqual(false)
  })

  it('should goto the previous item', () => {
    const fns = nav(items, lastItem)
    expect(fns.canPrev()).toEqual(true)
  })

  it('should not be able to goto the prev item', () => {
    const fns = nav(items, 0)
    expect(fns.canPrev()).toEqual(false)
  })

  // it('should circle to the first item', () => {
  //   activeItem = lastItem
  //   Navigable({
  //     items, activeItem, onSelectItem, children,
  //     circular: true
  //   })

  //   const { next } = getArgs(children)
  //   next()
  //   expect(activeItem).toEqual(1)
  // })

  // it('should circle to the last item', () => {
  //   activeItem = 1
  //   Navigable({
  //     items, activeItem, onSelectItem, children,
  //     circular: true
  //   })

  //   const { prev } = getArgs(children)
  //   prev()
  //   expect(activeItem).toEqual(lastItem)
  // })

})