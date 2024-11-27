import React, { useState } from "react"
import { motion } from "framer-motion"

const tools = [
	{
		title: "Rust Calculator",
		description:
			"Calculate resource costs and decay times for your Rust structures.",
		image: "/static/resources/index/decayindex.webp",
		video: "/static/resources/index/vdecay.mp4",
	},
	{
		title: "Raid Table",
		description: "Plan your raids with our comprehensive raid cost calculator.",
		image: "/static/resources/index/raidindex.webp",
		video: "/static/resources/index/raid.mp4",
	},
	{
		title: "Player Statistics",
		description: "Track your performance and compare with other players.",
		image: "/static/resources/index/statsindex.webp",
		video: "/static/resources/index/vdecay.mp4",
	},
	{
		title: "Cameras",
		description:
			"Learn how to set up and use CCTV cameras effectively in Rust.",
		image: "/static/resources/index/camerasindex.webp",
		video: "/static/resources/index/camera.mp4",
	},
	{
		title: "Monuments Puzzles",
		description: "Solutions and strategies for all monument puzzles in Rust.",
		image: "/static/resources/index/bgmonuments.webp",
		video: "/static/resources/index/dome.mp4",
	},
]

const ToolCard = ({ tool }) => {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<motion.div
			className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer bg-gray-800"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
		>
			<motion.img
				src={tool.image}
				alt={tool.title}
				className="w-full h-full object-cover"
				initial={{ scale: 1 }}
				animate={{ scale: isHovered ? 1.1 : 1 }}
				transition={{ duration: 0.3 }}
			/>
			{isHovered && (
				<motion.video
					src={tool.video}
					autoPlay
					loop
					muted
					playsInline
					className="absolute inset-0 w-full h-full object-cover"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				/>
			)}
			<motion.div
				className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent flex flex-col justify-end p-6"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: isHovered ? 1 : 0.8, y: isHovered ? 0 : 10 }}
				transition={{ duration: 0.3 }}
			>
				<h2 className="text-2xl font-bold text-amber-400 mb-2">{tool.title}</h2>
				<p className="text-gray-200">{tool.description}</p>
			</motion.div>
		</motion.div>
	)
}

const Index = () => {
	return (
		<div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-5xl font-extrabold text-center text-amber-400 mb-12">
					Rust Tools
				</h1>
				<p className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
					Enhance your Rust gameplay with our suite of powerful tools. From
					resource management to raid planning, we've got you covered.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{tools.map((tool, index) => (
						<ToolCard key={index} tool={tool} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Index
