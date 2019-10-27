const list = (c, i, circular, backward) => {
  const firstIndex = () => c ? 0 : null
  const lastIndex = () => c ? c - 1 : null
  const _prevIndex = () => i > 0 ? i - 1 : (
    !circular ? null : lastIndex()
  )
  const _nextIndex = () => i < c - 1 ? i + 1 : (
    !circular ? null : firstIndex()
  )
  const prevIndex = () => !backward ? _prevIndex() : _nextIndex()
  const nextIndex = () => !backward ? _nextIndex() : _prevIndex()
  const canPrev = () => prevIndex() !== null
  const canNext = () => nextIndex() !== null
  
  return {
    firstIndex, lastIndex,
    prevIndex, canPrev, nextIndex, canNext
  }
}

export default list