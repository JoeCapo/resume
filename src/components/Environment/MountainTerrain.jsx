import { useMemo } from 'react'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { getTerrainHeight } from '../../utils/terrainHeight'

// Simple noise wrapper
// const simplex = new SimplexNoise() // Removed

import { TerrainShaderMaterial } from './TerrainMaterial'

export default function MountainTerrain() {
    const { geometry } = useMemo(() => {
        // Create a large plane
        const size = 200
        const segments = 64 // Further reduced for stability
        const geom = new THREE.PlaneGeometry(size, size, segments, segments)

        const posAttribute = geom.attributes.position
        const vertex = new THREE.Vector3()

        for (let i = 0; i < posAttribute.count; i++) {
            vertex.fromBufferAttribute(posAttribute, i)
            const height = getTerrainHeight(vertex.x, vertex.y)
            posAttribute.setZ(i, height)
        }

        geom.computeVertexNormals()
        return { geometry: geom }
    }, [])

    return (
        <RigidBody type="fixed" colliders="trimesh">
            <mesh
                geometry={geometry}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow
            >
                <meshStandardMaterial color="#57534e" roughness={0.8} />
                {/* <terrainShaderMaterial side={THREE.DoubleSide} uTime={0} /> */}
            </mesh>
        </RigidBody>
    )
}
