import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import ProductPage from "./pages/ProductPage"
import { useThemeStore } from "./store/UseThemeStore"
function App() {
  const { theme } = useThemeStore();



  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />

      </Routes>
    </div>
  )
}

export default App
