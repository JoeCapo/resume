import { OrbitControls } from '@react-three/drei'
import { useStore } from '../../store'

export function SceneControls() {
    const selectedItem = useStore((state) => state.selectedItem)

    return <OrbitControls
        makeDefault
        enabled={!selectedItem} // Disable controls when modal is open
        maxPolarAngle={Math.PI / 2 - 0.1}
    />
}
