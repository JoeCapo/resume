import { useState } from 'react'
import Scene from './components/Scene'
import LandingPage from './components/LandingPage/LandingPage'
import Modal from './components/UI/Modal'
import Crosshair from './components/UI/Crosshair'
import Loader from './components/UI/Loader'
import HUD from './components/UI/HUD'

function App() {
  const [view, setView] = useState('landing') // 'landing' or '3d'

  console.log('Current view:', view)

  if (view === 'landing') {
    return <LandingPage onEnter3D={() => {
      console.log('Switching to 3D view...')
      setView('3d')
    }} />
  }

  console.log('Rendering 3D scene...')

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Loader />
      <HUD />
      <Crosshair />
      <Scene onExit3D={() => setView('landing')} />
      <Modal />
    </div>
  )
}

export default App
