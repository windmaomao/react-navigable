import list from './list'

const c = 3
const f = 0
const l = c - 1

describe('list', () => {

  it('should return first index', () => {
    const fns = list(c)
    expect(fns.firstIndex()).toEqual(f)
  })

  it('should return last index', () => {
    const fns = list(c)
    expect(fns.lastIndex()).toEqual(l)
  })

  it('should be able to goto the next item', () => {
    const fns = list(c, 1)
    expect(fns.canNext()).toEqual(true)
  })

  it('should goto the next item', () => {
    const fns = list(c, f)
    expect(fns.nextIndex()).toEqual(f + 1)
  })

  it('should not be able to goto the next item', () => {
    const fns = list(c, l)
    expect(fns.canNext()).toEqual(false)
  })

  it('should be able to goto the previous item', () => {
    const fns = list(c, l)
    expect(fns.canPrev()).toEqual(true)
  })

  it('should goto the previous item', () => {
    const fns = list(c, l)
    expect(fns.prevIndex()).toEqual(l - 1)
  })

  it('should not be able to goto the prev item', () => {
    const fns = list(c, f)
    expect(fns.canPrev()).toEqual(false)
  })

  it('should circle to the first item', () => {
    const fns = list(c, l, true)
    expect(fns.nextIndex()).toEqual(f)
  })

  it('should circle to the last item', () => {
    const fns = list(c, f, true)
    expect(fns.prevIndex()).toEqual(l)
  })

})