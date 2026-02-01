import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

const TerrainShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uLightDirection: new THREE.Vector3(1, 1, 1).normalize(),
        uColorGrass: new THREE.Color('#3f621d'), // Darker, organic green
        uColorRock: new THREE.Color('#57534e'),  // Stone grey
        uColorSnow: new THREE.Color('#f3f4f6'),  // White
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    varying float vHeight;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vPosition = position;
      vHeight = position.z; // Z is up in our terrain generation logic usually, but let's check rotation
      // Actually in the mesh rotation=[-PI/2, 0, 0], so "local Z" is "world Y".
      // Let's rely on the passed position.
      
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;
      vNormal = normalize(normalMatrix * normal);
    }
  `,
    // Fragment Shader
    `
    uniform vec3 uColorGrass;
    uniform vec3 uColorRock;
    uniform vec3 uColorSnow;
    uniform vec3 uLightDirection;

    varying float vHeight;
    varying vec3 vNormal;
    varying vec3 vPosition;

    // Simple noise for detail
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      // Basic Lighting
      float lightness = dot(vNormal, uLightDirection);
      lightness = clamp(lightness, 0.3, 1.0); // Ambient 

      // Mixing based on Height
      vec3 color = uColorGrass;
      
      // Noise for organic masking
      float noise = random(vPosition.xy * 0.1); 

      // Grass -> Rock transition
      float rockThreshold = 4.0 + (noise * 2.0);
      float rockMix = smoothstep(rockThreshold - 2.0, rockThreshold + 2.0, vHeight);
      color = mix(color, uColorRock, rockMix);

      // Rock -> Snow transition
      float snowThreshold = 18.0 + (noise * 4.0);
      float snowMix = smoothstep(snowThreshold - 3.0, snowThreshold + 3.0, vHeight);
      color = mix(color, uColorSnow, snowMix);

      // Slope based mixing (rock on steep slopes)
      // Normal.z is up in local space (since plane is flat), 
      // but we rotate the mesh -PI/2.
      // So local Z is world Y (Up).
      // Steep slope = standard Z normal is deviation from 1.0.
      float slope = 1.0 - vNormal.z;
      float slopeRock = smoothstep(0.05, 0.2, slope);
      
      // Apply rock on slopes even at low altitude
      color = mix(color, uColorRock, slopeRock * 0.8);

      gl_FragColor = vec4(color * lightness, 1.0);
      
      // Simple fog awareness (optional, Threejs handles fog if we include chunks, 
      // but for raw shaderMaterial we need generic fog logic or ShaderLib mixin.
      // For now, let's keep it vivid without manual fog or rely on post-processing fog).
      
      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }
  `
)

extend({ TerrainShaderMaterial })

export { TerrainShaderMaterial }
