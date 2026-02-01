import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js'

const simplex = new SimplexNoise()

export function getTerrainHeight(x, z) {
    const dist = Math.sqrt(x * x + z * z)
    const valleyRadius = 80 // Large flat area for campus

    // If inside the valley, absolutely flat at y=0.
    // This ensures no buildings are buried.
    if (dist < valleyRadius) {
        return 0
    }

    // Basic noise beyond the valley
    let noise = simplex.noise(x * 0.02, z * 0.02) * 5
    noise += simplex.noise(x * 0.01, z * 0.01) * 15

    // Smooth blend out from flat valley to mountains
    const blendZone = 30
    const blendFactor = Math.min(1, (dist - valleyRadius) / blendZone)

    // Apply blended height
    // (Noise + Slope) * Blend
    // The slope (dist - valleyRadius) * 0.5 ensures mountains rise up away from the center
    let height = (noise + (dist - valleyRadius) * 0.5) * blendFactor

    return Math.max(0, height)
}
