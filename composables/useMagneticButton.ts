export const useMagneticButton = () => {
  const applyMagneticEffect = (button: HTMLElement) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const maxDistance = 100

      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance
        const moveX = deltaX * strength * 0.5
        const moveY = deltaY * strength * 0.5

        button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`
      } else {
        button.style.transform = 'translate(0, 0) scale(1)'
      }
    }

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0, 0) scale(1)'
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }

  return {
    applyMagneticEffect,
  }
}
