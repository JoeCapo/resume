export function generateTechTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const context = canvas.getContext('2d')

    // Background
    context.fillStyle = '#050510'
    context.fillRect(0, 0, 512, 512)

    // Windows / Tech Lines
    context.fillStyle = '#00ffff'

    // Random "windows"
    for (let i = 0; i < 100; i++) {
        const x = Math.floor(Math.random() * 20) * 25
        const y = Math.floor(Math.random() * 20) * 25
        const w = Math.random() * 20 + 5
        const h = Math.random() * 20 + 5

        if (Math.random() > 0.5) {
            context.globalAlpha = Math.random() * 0.5 + 0.2
            context.fillRect(x, y, w, h)
        }
    }

    // Circuit lines
    context.strokeStyle = '#ff00ff'
    context.lineWidth = 2
    context.globalAlpha = 0.3
    context.beginPath()
    for (let i = 0; i < 20; i++) {
        context.moveTo(0, Math.random() * 512)
        context.lineTo(512, Math.random() * 512)
    }
    context.stroke()

    return canvas
}

export function generatePCBTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 1024
    const context = canvas.getContext('2d')

    // Dark Green/Black PCB Board
    context.fillStyle = '#102010'
    context.fillRect(0, 0, 1024, 1024)

    // Copper Traces
    context.strokeStyle = '#b87333' // Copper color
    context.lineWidth = 4
    context.lineCap = 'round'

    // Grid of traces
    for (let i = 0; i < 50; i++) {
        context.beginPath()
        const startX = Math.random() * 1024
        const startY = Math.random() * 1024
        context.moveTo(startX, startY)
        // Make 90 degree turns
        if (Math.random() > 0.5) {
            context.lineTo(startX, Math.random() * 1024)
        } else {
            context.lineTo(Math.random() * 1024, startY)
        }
        context.stroke()

        // Solder pads (circles)
        context.fillStyle = '#c0c0c0' // Silver
        context.beginPath()
        context.arc(startX, startY, 6, 0, Math.PI * 2)
        context.fill()
    }

    return canvas
}
