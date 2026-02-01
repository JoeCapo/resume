import { EffectComposer, Vignette, Noise, SSAO, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'

export default function PostProcessing() {
    return (
        <EffectComposer disableNormalPass={false}>
            {/* Ambient Occlusion for depth - keeping this as it adds realism without blur */}
            <SSAO
                radius={0.1}
                intensity={15}
                luminanceInfluence={0.5}
                color="black"
            />

            {/* Cinematic Color Grading */}
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />

            {/* Subtle Vignette for focus */}
            <Vignette eskil={false} offset={0.1} darkness={0.3} />

            {/* Texture grain to reduce banding */}
            <Noise opacity={0.02} />

            {/* REMOVED: DepthOfField (Blur Source) */}
            {/* REMOVED: Bloom (Glow Source - can look blurry if too strong) */}
        </EffectComposer>
    )
}
