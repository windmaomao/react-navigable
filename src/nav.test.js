import nav from './nav'

const items = [0, 1, 2]
const lastItem = items.length - 1

describe('nav', () => {

  it('should return items count', () => {
    const fns = nav(items)
    expect(fns.count()).toEqual(items.length)
  })

  it('should return first index', () => {
    const fns = nav(items)
    expect(fns.firstIndex()).toEqual(0)
  })

  it('should return last index', () => {
    const fns = nav(items)
    expect(fns.lastIndex()).toEqual(lastItem)
  })

  it('should return item index', () => {
    const fns = nav(items, 2)
    expect(fns.index()).toEqual(2)
  })

  it('should be able to goto the next item', () => {
    const fns = nav(items, 1)
    expect(fns.canNext()).toEqual(true)
  })

  it('should goto the next item', () => {
    const fns = nav(items, 0)
    expect(fns.nextIndex()).toEqual(1)
  })

  it('should not be able to goto the next item', () => {
    const fns = nav(items, lastItem)
    expect(fns.canNext()).toEqual(false)
  })

  it('should be able to goto the previous item', () => {
    const fns = nav(items, lastItem)
    expect(fns.canPrev()).toEqual(true)
  })

  it('should goto the previous item', () => {
    const fns = nav(items, lastItem)
    expect(fns.prevIndex()).toEqual(lastItem - 1)
  })

  it('should not be able to goto the prev item', () => {
    const fns = nav(items, 0)
    expect(fns.canPrev()).toEqual(false)
  })

  it('should circle to the first item', () => {
    const fns = nav(items, lastItem, true)
    expect(fns.nextIndex()).toEqual(0)
  })

  it('should circle to the last item', () => {
    const fns = nav(items, 0, true)
    expect(fns.prevIndex()).toEqual(lastItem)
  })

})