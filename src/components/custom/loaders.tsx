'use client'

import React, { useEffect } from 'react'

export function MirageLoader({
  color = 'gray',
  size = '35',
  speed = '1.5',
  stroke = '2',
}: {
  color?: string
  size?: string
  speed?: string
  stroke?: string
}) {
  useEffect(() => {
    async function getLoader() {
      const { mirage } = await import('ldrs')
      mirage.register()
    }

    getLoader()
  }, [])

  return React.createElement('l-mirage', {
    color,
    size,
    speed,
    stroke,
  })
}
