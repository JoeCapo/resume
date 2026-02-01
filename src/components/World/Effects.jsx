import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

export function Effects() {
    return (
        <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={1.5} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
    )
}
