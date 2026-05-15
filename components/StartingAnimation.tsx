'use client'

import { useEffect, useRef, useState } from 'react'

export default function StartingAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [showSkip, setShowSkip] = useState(false)

  const dismiss = () => {
    setFadeOut(true)
    setTimeout(() => setVisible(false), 600)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
    const skipTimer = setTimeout(() => setShowSkip(true), 1500)
    return () => clearTimeout(skipTimer)
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      <video
        ref={videoRef}
        src="/Startinglogorevealanimation.mp4"
        muted
        playsInline
        onEnded={dismiss}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {showSkip && (
        <button
          onClick={dismiss}
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.35)',
            color: '#fff',
            padding: '0.5rem 1.25rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
        >
          Skip
        </button>
      )}
    </div>
  )
}
