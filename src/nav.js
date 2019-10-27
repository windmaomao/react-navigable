const navigate = (items, item, circular) => {
  const count = () => items.length
  const index = () => items.indexOf(item)
  const firstIndex = () => {
    const c = count()
    return c ? 0 : null
  }
  const lastIndex = () => {
    const c = count()
    return c ? c - 1 : null
  }
  const prevIndex = () => {
    const i = index(), c = count()
    return i > 0 ? i - 1 : (
      !circular ? null : lastIndex()
    )
  }
  const canPrev = () => prevIndex() !== null
  const nextIndex = () => {
    const i = index(), c = count()
    return i < c - 1 ? i + 1 : (
      !circular ? null : firstIndex()
    )
  }
  const canNext = () => nextIndex() !== null
  
  return {
    count, index, firstIndex, lastIndex,
    prevIndex, canPrev, nextIndex, canNext
  }
}

export default navigate