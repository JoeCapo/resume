import { Canvas } from '@react-three/fiber'
import { Stars, Environment } from '@react-three/drei'
import { NeonFloor } from './components/World/NeonFloor'
import { CareerTower } from './components/World/CareerTower'
import { SkillDistrict } from './components/World/SkillDistrict'
import { Effects } from './components/World/Effects'
import { IntroCamera } from './components/Player/IntroCamera'
import { SceneControls } from './components/World/SceneControls'
import { Overlay } from './components/UI/Overlay'

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 50, 50], fov: 50 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <IntroCamera />
        <color attach="background" args={['#050510']} />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <fog attach="fog" args={['#050510', 10, 60]} />

        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
        <Environment preset="city" />

        <NeonFloor />
        <CareerTower />
        <SkillDistrict />

        <Effects />
        <SceneControls />
      </Canvas>

      <Overlay />
    </>
  )
}

export default App
