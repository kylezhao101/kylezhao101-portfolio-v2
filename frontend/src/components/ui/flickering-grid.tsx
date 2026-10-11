"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { gridRevealDelay, gridRevealOpacity } from "@/lib/grid-reveal"
import { isSmileyPixel } from "@/lib/grid-smiley"

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  alternateColor?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
  showSmiley?: boolean
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  alternateColor,
  width,
  height,
  className,
  maxOpacity = 0.3,
  showSmiley = false,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const revealStart = useRef<number | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(preference.matches)
    update()
    preference.addEventListener("change", update)
    return () => preference.removeEventListener("change", update)
  }, [])

  const memoizedColor = useMemo(() => {
    const toRGB = (color: string) => {
      if (typeof window === "undefined") {
        return [0, 0, 0]
      }
      const canvas = document.createElement("canvas")
      canvas.width = canvas.height = 1
      const ctx = canvas.getContext("2d")
      if (!ctx) return [0, 0, 0]
      ctx.fillStyle = color
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
      return [r, g, b]
    }
    const base = toRGB(color)
    const jade = toRGB(alternateColor ?? color)
    // A gentle tint range, capped at 35% of the way toward the alternate color.
    return Array.from({ length: 32 }, (_, index) => {
      const blend = index / 31 * 0.35
      const channels = base.map((channel, i) => Math.round(channel + (jade[i] - channel) * blend))
      return `rgba(${channels.join(", ")},`
    })
  }, [color, alternateColor])

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const cols = Math.ceil(width / (squareSize + gridGap))
      const rows = Math.ceil(height / (squareSize + gridGap))

      const squares = new Float32Array(cols * rows)
      const colorIndices = new Uint8Array(cols * rows)
      const revealDelays = new Float32Array(cols * rows)
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity
        colorIndices[i] = Math.floor(Math.random() ** 2 * 32)
        revealDelays[i] = gridRevealDelay(i % rows, rows, Math.random())
      }

      return { cols, rows, squares, colorIndices, revealDelays, dpr }
    },
    [squareSize, gridGap, maxOpacity]
  )

  const updateSquares = useCallback(
    (squares: Float32Array, colorIndices: Uint8Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity
          colorIndices[i] = Math.floor(Math.random() ** 2 * 32)
        }
      }
    },
    [flickerChance, maxOpacity]
  )

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      colorIndices: Uint8Array,
      dpr: number,
      revealDelays: Float32Array,
      elapsed: number
    ) => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "transparent"
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j
          const cellOpacity = showSmiley && isSmileyPixel(i, j, cols, rows)
            ? Math.min(1, 0.6 + squares[index])
            : squares[index]
          const opacity = cellOpacity * gridRevealOpacity(elapsed, revealDelays[index])
          ctx.fillStyle = `${memoizedColor[colorIndices[index]]}${opacity})`
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          )
        }
      }
    },
    [memoizedColor, squareSize, gridGap, showSmiley]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas?.getContext("2d") ?? null
    let animationFrameId: number | null = null
    let resizeObserver: ResizeObserver | null = null
    let intersectionObserver: IntersectionObserver | null = null
    let gridParams: ReturnType<typeof setupCanvas> | null = null

    if (canvas && container && ctx) {
      const updateCanvasSize = () => {
        const newWidth = width || container.clientWidth
        const newHeight = height || container.clientHeight
        setCanvasSize({ width: newWidth, height: newHeight })
        gridParams = setupCanvas(canvas, newWidth, newHeight)
      }

      updateCanvasSize()

      let lastTime = performance.now()
      const animate = (time: number) => {
        if (!isInView || !gridParams) return

        const deltaTime = Math.min((time - lastTime) / 1000, 0.05)
        lastTime = time
        if (revealStart.current === null) revealStart.current = time
        const elapsed = reducedMotion ? 1 : (time - revealStart.current) / 1000

        if (!reducedMotion) updateSquares(gridParams.squares, gridParams.colorIndices, deltaTime)
        drawGrid(
          ctx,
          canvas.width,
          canvas.height,
          gridParams.cols,
          gridParams.rows,
          gridParams.squares,
          gridParams.colorIndices,
          gridParams.dpr,
          gridParams.revealDelays,
          elapsed
        )
        if (!reducedMotion) animationFrameId = requestAnimationFrame(animate)
      }

      resizeObserver = new ResizeObserver(() => {
        updateCanvasSize()
        if (reducedMotion) animate(performance.now())
      })
      resizeObserver.observe(container)

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting)
        },
        { threshold: 0 }
      )
      intersectionObserver.observe(canvas)

      if (isInView) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect()
      }
    }
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView, reducedMotion])

  return (
    <div
      ref={containerRef}
      className={cn(`h-full w-full ${className}`)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  )
}
