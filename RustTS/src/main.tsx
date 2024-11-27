import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import { BrowserRouter, Route, Routes } from "react-router"
import Index from "./components/Index.tsx"
import Decay from "./components/Decay.tsx"
import Stats from "./components/Stats.tsx"
import Navbar from "./components/Navbar.tsx"
import RustLoadingSpinner from "./components/LoadingSpinner.tsx"
import Monuments from "./components/Monuments.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Index />}></Route>
				<Route path="/decay" element={<Decay />}></Route>
				<Route path="/stats" element={<Stats />}></Route>
				<Route path="/monuments" element={<Monuments />}></Route>
				<Route path="/loading" element={<RustLoadingSpinner />}></Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
)
