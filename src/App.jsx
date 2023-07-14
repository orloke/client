import { CanvasModel } from "./canvas"
import Customizer from "./pages/Customizer"
import Home from "./pages/Home"

function App() {

  return (
    <main className="app transition-all">
        <Home />
        <CanvasModel />
        <Customizer />
    </main>
  )
}

export default App
