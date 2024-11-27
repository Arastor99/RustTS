import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import materials from "../data/materials.json"

const Decay = () => {
	const [selectedMaterial, setSelectedMaterial] = useState(materials[0])
	const [currentHealth, setCurrentHealth] = useState(materials[0].maxHealth)
	const [decayTime, setDecayTime] = useState("")

	useEffect(() => {
		setCurrentHealth(selectedMaterial.maxHealth)
	}, [selectedMaterial])

	const calculateDecayTime = () => {
		const remainingTime =
			(currentHealth / selectedMaterial.maxHealth) * selectedMaterial.decayTime
		const hours = Math.floor(remainingTime)
		const minutes = Math.round((remainingTime - hours) * 60)
		setDecayTime(`${hours}h ${minutes}m`)
	}

	return (
		<div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-4xl font-bold text-center text-amber-400 mb-8">
					Calculadora de Decay en Rust
				</h1>
				<div className="bg-gray-800 rounded-lg shadow-lg p-6">
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Material
						</label>
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
							{materials.map((material) => (
								<motion.button
									key={material.name}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setSelectedMaterial(material)}
									className={`p-3 rounded-lg flex flex-col items-center justify-center ${
										selectedMaterial.name === material.name
											? "bg-amber-500 text-gray-700"
											: "bg-gray-700 text-gray-300 hover:bg-gray-600"
									}`}
								>
									<div className="w-12 h-12 mb-2 relative">
										<img
											src={material.image}
											alt={material.name}
											className="w-full h-full object-contain"
										/>
									</div>
									<span className="text-xs text-center">{material.name}</span>
								</motion.button>
							))}
						</div>
					</div>
					<div className="mb-6">
						<label
							htmlFor="health"
							className="block text-sm font-medium text-gray-300 mb-2"
						>
							Salud Actual (HP)
						</label>
						<input
							type="number"
							id="health"
							value={currentHealth}
							onChange={(e) =>
								setCurrentHealth(
									Math.min(Number(e.target.value), selectedMaterial.maxHealth)
								)
							}
							max={selectedMaterial.maxHealth}
							className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
						/>
						<p className="mt-1 text-sm text-gray-400">
							Máximo: {selectedMaterial.maxHealth} HP
						</p>
					</div>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={calculateDecayTime}
						className="w-full bg-amber-500 text-gray-700 font-bold rounded-lg py-2 px-4 hover:bg-amber-600 transition duration-300"
					>
						Calcular Tiempo de Decay
					</motion.button>
					{decayTime && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="mt-6 text-center"
						>
							<p className="text-lg font-semibold text-gray-300">
								Tiempo estimado hasta el decay completo:
							</p>
							<p className="text-3xl font-bold text-amber-400">{decayTime}</p>
							<p className="text-sm text-gray-400 mt-2">
								Nota: Este cálculo asume que no hay Tool Cupboard o está vacío.
							</p>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Decay
