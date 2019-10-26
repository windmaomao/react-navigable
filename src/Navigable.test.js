import Navigable from './Navigable'

describe('Navigable', () => {
  let children
  beforeEach(() => {
    children = jest.fn()
  })  

  it('should return null without items', () => {
    expect(Navigable({ children: 1 })).toEqual(null)
  })

  it('should return null without children', () => {
    expect(Navigable({ items: [] })).toEqual(null)
  })

  it('should return call children function', () => {
    Navigable({ items: [], children })
    expect(children).toHaveBeenCalled()
  })

})