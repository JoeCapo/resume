import { CanvasTexture, RepeatWrapping } from 'three'

export function createAsphaltTexture() {
    const size = 1024
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d')

    // Base dark asphalt color
    context.fillStyle = '#222222'
    context.fillRect(0, 0, size, size)

    // Add noise frequency 1 (Fine grain)
    const imageData = context.getImageData(0, 0, size, size)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 30
        data[i] += noise
        data[i + 1] += noise
        data[i + 2] += noise
    }

    // Add larger "tar" spots
    context.putImageData(imageData, 0, 0)

    // Draw lighter/darker patches
    for (let i = 0; i < 500; i++) {
        const x = Math.random() * size
        const y = Math.random() * size
        const r = Math.random() * 5 + 1
        context.beginPath()
        context.arc(x, y, r, 0, Math.PI * 2)
        context.fillStyle = Math.random() > 0.5 ? '#2a2a2a' : '#1a1a1a'
        context.fill()
    }

    const texture = new CanvasTexture(canvas)
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(20, 20)

    return texture
}

export function createBuildingTexture() {
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    // Dark base (building wall)
    ctx.fillStyle = '#050510'
    ctx.fillRect(0, 0, size, size)

    // Windows grid
    const rows = 16
    const cols = 8
    const winW = (size / cols) * 0.6
    const winH = (size / rows) * 0.8
    const gapX = (size / cols) * 0.4
    const gapY = (size / rows) * 0.2

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            // Randomly lit windows
            const isLit = Math.random() > 0.6 // 40% chance of being lit
            if (isLit) {
                // Warm yellow/orange tones for simple variation
                const hue = 30 + Math.random() * 20
                const light = 50 + Math.random() * 50
                ctx.fillStyle = `hsl(${hue}, 100%, ${light}%)`

                // Draw window
                const px = x * (size / cols) + gapX / 2
                const py = y * (size / rows) + gapY / 2
                ctx.fillRect(px, py, winW, winH)
            }
        }
    }

    const texture = new CanvasTexture(canvas)
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    return texture
}
