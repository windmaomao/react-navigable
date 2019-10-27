const navigate = (items, item) => {
  const count = () => items.length
  const index = () => items.indexOf(item)
  const prevIndex = () => {
    const i = index()
    return i > 0 ? i - 1 : null
  }
  const canPrev = () => {
    return prevIndex() !== null
  }
  const nextIndex = () => {
    const i = index()
    const c = count()
    return i < c - 1 ? i + 1 : null
  }
  const canNext = () => {
    return nextIndex() !== null
  }
  
  return {
    count, index,
    prevIndex, canPrev,
    nextIndex, canNext
  }
}

export default navigate