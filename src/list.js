const list = (c, i, circular) => {
  const firstIndex = () => c ? 0 : null
  const lastIndex = () => c ? c - 1 : null
  const prevIndex = () => i > 0 ? i - 1 : (
    !circular ? null : lastIndex()
  )
  const canPrev = () => prevIndex() !== null
  const nextIndex = () => i < c - 1 ? i + 1 : (
    !circular ? null : firstIndex()
  )
  const canNext = () => nextIndex() !== null
  
  return {
    firstIndex, lastIndex,
    prevIndex, canPrev, nextIndex, canNext
  }
}

export default list