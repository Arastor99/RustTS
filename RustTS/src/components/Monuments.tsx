import React from "react"
import { motion } from "framer-motion"

// Monument images
import water from "../../public/static/resources/monuments/water.png"
import power from "../../public/static/resources/monuments/power.png"
import harbor from "../../public/static/resources/monuments/harbor.png"
import airfield from "../../public/static/resources/monuments/airfield.png"
import junkyard from "../../public/static/resources/monuments/junkyard.png"
import launch from "../../public/static/resources/monuments/launch.png"
import lighthouse from "../../public/static/resources/monuments/lighthouse.png"
import tunel from "../../public/static/resources/monuments/tunel.png"
import silo from "../../public/static/resources/monuments/silo.png"
import satelite from "../../public/static/resources/monuments/satelite.png"
import sewer from "../../public/static/resources/monuments/sewer.png"
import train from "../../public/static/resources/monuments/train.png"

// Resource images
import rad from "../../public/static/resources/rad.png"
import green from "../../public/static/resources/green.png"
import blue from "../../public/static/resources/blue.png"
import red from "../../public/static/resources/red.png"
import fuse from "../../public/static/resources/fuse.png"

interface Monument {
	id: string
	name: string
	image: string
	requirements: {
		keycards: ("green" | "blue" | "red")[]
		fuse?: boolean
		radsuit?: boolean
	}
}

const monuments: Monument[] = [
	{
		id: "water",
		name: "Water Treatment Plant",
		image: water,
		requirements: { keycards: ["blue"], fuse: true, radsuit: true },
	},
	{
		id: "power",
		name: "Power Plant",
		image: power,
		requirements: { keycards: ["green", "blue"], fuse: true, radsuit: true },
	},
	{
		id: "harbor",
		name: "Harbor",
		image: harbor,
		requirements: { keycards: ["green"], fuse: true },
	},
	{
		id: "airfield",
		name: "Airfield",
		image: airfield,
		requirements: { keycards: ["blue"], fuse: true, radsuit: true },
	},
	{
		id: "junkyard",
		name: "Junkyard",
		image: junkyard,
		requirements: { keycards: ["green"] },
	},
	{
		id: "launch",
		name: "Launch Site",
		image: launch,
		requirements: { keycards: ["red"], fuse: true, radsuit: true },
	},
	{
		id: "lighthouse",
		name: "Lighthouse",
		image: lighthouse,
		requirements: { keycards: ["green"] },
	},
	{
		id: "tunel",
		name: "Train Tunnel",
		image: tunel,
		requirements: { keycards: ["green", "blue"], fuse: true, radsuit: true },
	},
	{
		id: "silo",
		name: "Military Tunnel",
		image: silo,
		requirements: { keycards: ["blue"], fuse: true, radsuit: true },
	},
	{
		id: "satelite",
		name: "Satellite Dish",
		image: satelite,
		requirements: { keycards: ["green"], fuse: true, radsuit: true },
	},
	{
		id: "sewer",
		name: "Sewer Branch",
		image: sewer,
		requirements: { keycards: ["green"], fuse: true, radsuit: true },
	},
	{
		id: "train",
		name: "Train Yard",
		image: train,
		requirements: { keycards: ["blue"], fuse: true, radsuit: true },
	},
]

const Monuments: React.FC = () => {
	return (
		<div className="bg-gray-900 text-gray-200 min-h-screen p-4 sm:p-8">
			<h1 className="text-4xl font-bold mb-8 text-center text-amber-500">
				Rust Monuments
			</h1>

			{/* Keycard Table */}
			<div className="mb-12 flex justify-center">
				<div className="w-full max-w-3xl overflow-x-auto">
					<h2 className="text-2xl font-semibold mb-4 text-amber-400">
						Keycard Locations
					</h2>
					<table className="w-full border-collapse">
						<thead>
							<tr className="bg-gray-800">
								<th className="border border-gray-700 p-2">Keycard Color</th>
								<th className="border border-gray-700 p-2">Where to Find</th>
							</tr>
						</thead>
						<tbody>
							{[
								{ color: "Green", textColor: "text-green-500" },
								{ color: "Blue", textColor: "text-blue-500" },
								{ color: "Red", textColor: "text-red-500" },
							].map(({ color, textColor }) => (
								<tr key={color} className="bg-gray-700">
									<td
										className={`border border-gray-600 p-2 font-semibold ${textColor}`}
									>
										{color} Keycard
									</td>
									<td className="border border-gray-600 p-2">Airfield</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Monument Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
				{monuments.map((monument) => (
					<motion.a
						key={monument.id}
						href={`#${monument.id}`}
						className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.98 }}
					>
						<img
							src={monument.image}
							alt={monument.name}
							className="w-full h-56 object-cover"
						/>
						<div className="p-4">
							<h3 className="text-xl font-semibold mb-2 text-amber-400">
								{monument.name}
							</h3>
							<div className="flex flex-wrap gap-2">
								{monument.requirements.keycards.map((keycard) => (
									<img
										key={keycard}
										src={
											keycard === "green"
												? green
												: keycard === "blue"
												? blue
												: red
										}
										alt={`${keycard} keycard`}
										className="w-6 h-6"
									/>
								))}
								{monument.requirements.fuse && (
									<img src={fuse} alt="Fuse" className="w-6 h-6" />
								)}
								{monument.requirements.radsuit && (
									<img src={rad} alt="Radsuit" className="w-6 h-6" />
								)}
							</div>
						</div>
					</motion.a>
				))}
			</div>

			{/* Monument Details */}
			{monuments.map((monument) => (
				<motion.div
					key={monument.id}
					id={monument.id}
					className="mb-12 p-6 bg-gray-800 rounded-lg"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					<h2 className="text-3xl font-bold mb-4 text-amber-500">
						{monument.name}
					</h2>
					<div className="flex flex-col lg:flex-row items-start gap-6">
						<div className="w-full lg:w-1/3">
							<h3 className="text-xl font-semibold mb-2 text-amber-400">
								Requirements:
							</h3>
							<ul className="space-y-2">
								{monument.requirements.keycards.map((keycard) => (
									<li key={keycard} className="flex items-center">
										<img
											src={
												keycard === "green"
													? green
													: keycard === "blue"
													? blue
													: red
											}
											alt={`${keycard} keycard`}
											className="w-6 h-6 mr-2"
										/>
										<span className="capitalize">{keycard} Keycard</span>
									</li>
								))}
								{monument.requirements.fuse && (
									<li className="flex items-center">
										<img src={fuse} alt="Fuse" className="w-6 h-6 mr-2" />
										<span>Fuse</span>
									</li>
								)}
								{monument.requirements.radsuit && (
									<li className="flex items-center">
										<img src={rad} alt="Radsuit" className="w-6 h-6 mr-2" />
										<span>Radsuit</span>
									</li>
								)}
							</ul>
						</div>
						<div className="w-full lg:w-2/3 flex justify-center">
							<div
								className="relative"
								style={{ width: "50%", paddingTop: "30%" }}
							>
								<iframe
									src="https://www.youtube.com/embed/ri225udSk50"
									title={`${monument.name} Guide`}
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
									className="absolute top-0 left-0 w-full h-full"
								></iframe>
							</div>
						</div>
					</div>
				</motion.div>
			))}
		</div>
	)
}

export default Monuments
