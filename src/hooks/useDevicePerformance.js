import { useState, useEffect, useMemo } from 'react'

function detectDevice() {
  if (typeof window === 'undefined') return { tier: 'high', isMobile: false, isLowEnd: false }

  const isMobile = window.innerWidth < 768 || 'ontouchstart' in window
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4

  // Check device memory (Chrome only)
  const memory = navigator.deviceMemory || 4

  // Check GPU via canvas
  let gpuTier = 'high'
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        const gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        const gpuLower = gpu.toLowerCase()
        // Low-end GPUs
        if (gpuLower.includes('mali-4') || gpuLower.includes('mali-3') ||
            gpuLower.includes('adreno 2') || gpuLower.includes('adreno 3') ||
            gpuLower.includes('powervr') || gpuLower.includes('video4') ||
            gpuLower.includes('swiftshader')) {
          gpuTier = 'low'
        }
        // Mid-range GPUs
        else if (gpuLower.includes('mali-t') || gpuLower.includes('mali-g') ||
                 gpuLower.includes('adreno 4') || gpuLower.includes('adreno 5') ||
                 gpuLower.includes('adreno 610') || gpuLower.includes('adreno 615')) {
          gpuTier = 'mid'
        }
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  } catch (e) {
    gpuTier = 'mid'
  }

  // Determine overall tier
  let tier = 'high'
  if (reducedMotion || (cores <= 2 && memory <= 2) || gpuTier === 'low') {
    tier = 'low'
  } else if (cores <= 4 || memory <= 4 || gpuTier === 'mid' || isMobile) {
    tier = 'mid'
  }

  return { tier, isMobile, isLowEnd: tier === 'low', isMidRange: tier === 'mid', reducedMotion }
}

export function useDevicePerformance() {
  const [device, setDevice] = useState(() => detectDevice())

  useEffect(() => {
    const handleResize = () => {
      setDevice(detectDevice())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return useMemo(() => ({
    ...device,
    // Convenience flags
    showParticles: device.tier !== 'low',
    showHeavyAnimations: device.tier === 'high',
    showCursor: !device.isMobile && device.tier !== 'low',
    showScanlines: device.tier === 'high',
    showNoise: device.tier !== 'low',
    showGrid: device.tier !== 'low',
    // Particle/element counts
    orbCount: device.tier === 'low' ? 0 : device.tier === 'mid' ? 6 : 12,
    particleCount: device.tier === 'low' ? 0 : device.tier === 'mid' ? 6 : 10,
    blobCount: device.tier === 'low' ? 1 : device.tier === 'mid' ? 3 : 4,
    // Blur amounts
    blurAmount: device.tier === 'low' ? 15 : device.tier === 'mid' ? 30 : 60,
    // Three.js quality
    threeDpr: device.tier === 'low' ? 1 : device.tier === 'mid' ? [1, 1.25] : [1, 1.5],
    threeParticleCount: device.tier === 'low' ? 15 : device.tier === 'mid' ? 30 : 50,
  }), [device])
}

// Quick check without hook (for SSR-safe usage)
export function getIsMobile() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 || 'ontouchstart' in window
}

export function getReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
