"use client"

import { useRef, useEffect } from "react"

// This is a simplified land parcel map component
// In a real application, you would integrate a mapping library
export default function LandParcelMap({ selectedZone = "all" }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background
    ctx.fillStyle = "#e5e7eb" // Light gray background
    ctx.fillRect(0, 0, width, height)

    // Draw grid lines
    drawGrid(ctx, width, height)

    // Draw land parcels
    drawParcels(ctx, width, height, selectedZone)

    // Draw legend
    drawLegend(ctx, width, height)
  }, [selectedZone])

  return <canvas ref={canvasRef} width="800" height="400" className="w-full h-full" />
}

// Draw grid
function drawGrid(ctx, width, height) {
  ctx.strokeStyle = "#d1d5db"
  ctx.lineWidth = 1

  // Vertical grid lines
  for (let x = 0; x <= width; x += 50) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }

  // Horizontal grid lines
  for (let y = 0; y <= height; y += 50) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
}

// Draw land parcels
function drawParcels(ctx, width, height, selectedZone) {
  // Zone colors
  const zoneColors = {
    "Zone A": "#3b82f6", // blue
    "Zone B": "#10b981", // green
    "Zone C": "#f59e0b", // yellow
    "Zone R": "#ef4444", // red
  }

  // Zone A - Residential North (Top-left quadrant)
  if (selectedZone === "all" || selectedZone === "Zone A") {
    ctx.fillStyle = zoneColors["Zone A"]
    ctx.fillRect(50, 50, 300, 125)

    // Parcel divisions
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2

    // Vertical divisions
    ctx.beginPath()
    ctx.moveTo(125, 50)
    ctx.lineTo(125, 175)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(200, 50)
    ctx.lineTo(200, 175)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(275, 50)
    ctx.lineTo(275, 175)
    ctx.stroke()

    // Labels
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("LP-001", 87, 112)
    ctx.fillText("LP-007", 162, 112)
    ctx.fillText("A", 350, 112)
  }

  // Zone B - Residential South (Bottom-left quadrant)
  if (selectedZone === "all" || selectedZone === "Zone B") {
    ctx.fillStyle = zoneColors["Zone B"]
    ctx.fillRect(50, 225, 300, 125)

    // Parcel divisions
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2

    // Vertical divisions
    ctx.beginPath()
    ctx.moveTo(125, 225)
    ctx.lineTo(125, 350)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(200, 225)
    ctx.lineTo(200, 350)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(275, 225)
    ctx.lineTo(275, 350)
    ctx.stroke()

    // Labels
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("LP-002", 87, 287)
    ctx.fillText("LP-008", 162, 287)
    ctx.fillText("B", 350, 287)
  }

  // Zone C - Common Areas (Center and right side)
  if (selectedZone === "all" || selectedZone === "Zone C") {
    ctx.fillStyle = zoneColors["Zone C"]

    // Central common area
    ctx.fillRect(400, 100, 200, 200)

    // Green area
    ctx.fillRect(450, 50, 100, 30)

    // Parking area
    ctx.fillRect(450, 320, 100, 30)

    // Labels
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("LP-003", 500, 200)
    ctx.fillText("LP-006", 500, 65)
    ctx.fillText("LP-005", 500, 335)
    ctx.fillText("C", 625, 200)
  }

  // Zone R - Restricted (Small utility areas)
  if (selectedZone === "all" || selectedZone === "Zone R") {
    ctx.fillStyle = zoneColors["Zone R"]

    // Utility area 1
    ctx.fillRect(650, 150, 50, 50)

    // Utility area 2
    ctx.fillRect(650, 250, 50, 50)

    // Labels
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("LP-004", 675, 175)
    ctx.fillText("R", 675, 275)
  }

  // Draw roads
  ctx.fillStyle = "#9ca3af" // Gray for roads

  // Horizontal main road
  ctx.fillRect(50, 185, 700, 30)

  // Vertical main road
  ctx.fillRect(360, 50, 30, 300)

  // Road labels
  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 10px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("MAIN ROAD", 400, 200)
}

// Draw legend
function drawLegend(ctx, width, height) {
  const legendX = width - 180
  const legendY = 20
  const itemHeight = 20

  ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
  ctx.fillRect(legendX - 10, legendY - 10, 170, 120)
  ctx.strokeStyle = "#9ca3af"
  ctx.strokeRect(legendX - 10, legendY - 10, 170, 120)

  ctx.fillStyle = "#000000"
  ctx.font = "bold 14px Arial"
  ctx.textAlign = "left"
  ctx.textBaseline = "top"
  ctx.fillText("Land Parcel Zones", legendX, legendY)

  let currentY = legendY + 25

  // Zone A
  drawLegendItem(ctx, legendX, currentY, "#3b82f6", "Zone A - Residential North")
  currentY += itemHeight

  // Zone B
  drawLegendItem(ctx, legendX, currentY, "#10b981", "Zone B - Residential South")
  currentY += itemHeight

  // Zone C
  drawLegendItem(ctx, legendX, currentY, "#f59e0b", "Zone C - Common Areas")
  currentY += itemHeight

  // Zone R
  drawLegendItem(ctx, legendX, currentY, "#ef4444", "Zone R - Restricted")
}

// Helper function to draw legend items
function drawLegendItem(ctx, x, y, color, label) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, 15, 15)

  ctx.fillStyle = "#000000"
  ctx.font = "12px Arial"
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"
  ctx.fillText(label, x + 25, y + 7)
}

