import { reactive, onMounted, onBeforeUnmount } from 'vue'

interface WindowSize {
  width: number
  height: number
}

export function useDevice() {
  const windowSize = reactive<WindowSize>({
    width: 0,
    height: 0
  })

  function handleResize() {
    windowSize.width = window.innerWidth
    windowSize.height = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    windowSize
  }
}
