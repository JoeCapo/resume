import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { Sky, Environment as DreiEnvironment } from '@react-three/drei'
import { Suspense } from 'react'
import MountainTerrain from './Environment/MountainTerrain'
import CentralTower from './Monument/CentralTower'
import FirstPersonController from './Player/FirstPersonController'
import FrontendPavilion from './SkillZones/FrontendPavilion'
import BackendFortress from './SkillZones/BackendFortress'
import DevOpsRidge from './SkillZones/DevOpsRidge'
import CustomerPlaza from './SkillZones/CustomerPlaza'
import EducationBuilding from './Education/EducationBuilding'
import PathNetwork from './Pathways/PathNetwork'
import Vegetation from './Environment/Vegetation'
import PostProcessing from './Effects/PostProcessing'
import Particles from './Effects/Particles'

export default function Scene({ onExit3D }) {
    return (
        <>
            <Canvas shadows camera={{ fov: 60 }} gl={{ preserveDrawingBuffer: true }}>
                <Suspense fallback={null}>
                    {/* Environment & Cinematic Lighting */}
                    {/* Sunset Preset for Golden Hour feel */}
                    <Sky
                        sunPosition={[100, 20, 100]}
                        turbidity={8}
                        rayleigh={2}
                        mieCoefficient={0.005}
                        mieDirectionalG={0.8}
                    />
                    <DreiEnvironment preset="sunset" background blur={0.5} />

                    <ambientLight intensity={0.4} />
                    <directionalLight
                        position={[50, 50, 25]}
                        intensity={2}
                        castShadow
                        shadow-bias={-0.0001}
                        shadow-mapSize={[2048, 2048]}
                    >
                        <orthographicCamera attach="shadow-camera" args={[-100, 100, 100, -100]} />
                    </directionalLight>

                    {/* Volumetric-ish Fog */}
                    <fog attach="fog" args={['#17171b', 30, 120]} />

                    <Particles />

                    <Physics gravity={[0, -9.81, 0]}>
                        <FirstPersonController />
                        <MountainTerrain />
                        <Vegetation />
                        <CentralTower />

                        <PathNetwork />

                        {/* Zones - Placed at cardinal directions */}
                        <FrontendPavilion position={[20, 0, 0]} />

                        <BackendFortress position={[-20, 0, 0]} />

                        <DevOpsRidge position={[0, 0, -20]} />

                        <CustomerPlaza position={[15, 0, 15]} />

                        <EducationBuilding position={[-15, 0, 15]} />

                    </Physics>

                    {/* <PostProcessing /> */}
                </Suspense>
            </Canvas>

            {/* Exit 3D Button - Top Center (Desktop) / Full Width Top (Mobile) */}
            {onExit3D && (
                <div className="absolute z-[100] top-0 w-full p-4 md:top-5 md:w-auto md:left-1/2 md:-translate-x-1/2 md:p-0">
                    <button
                        onClick={onExit3D}
                        className="w-full md:w-auto"
                        style={{
                            background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(10,20,30,0.95) 100%)',
                            border: '2px solid rgba(6, 182, 212, 0.6)',
                            padding: '12px 28px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#06b6d4',
                            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(6, 182, 212, 0.05)',
                            transition: 'all 0.2s',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontFamily: 'monospace'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)'
                            e.target.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.6), inset 0 0 30px rgba(6, 182, 212, 0.1)'
                            e.target.style.borderColor = 'rgba(6, 182, 212, 0.9)'
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)'
                            e.target.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(6, 182, 212, 0.05)'
                            e.target.style.borderColor = 'rgba(6, 182, 212, 0.6)'
                        }}
                    >
                        ← Back to Resume
                    </button>
                </div>
            )}
        </>
    )
}
