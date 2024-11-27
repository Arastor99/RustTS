import React, { useState } from "react"
import {
	getPlayerSummaries,
	getRustPlaytime,
	getRustStats,
	resolveVanityName,
} from "./services/steamService"
import { motion } from "framer-motion"

interface PlayerInfo {
	avatarfull: string
	personaname: string
	profileurl: string
}

interface Stat {
	name: string
	value: number
}

const Stats: React.FC = () => {
	const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null)
	const [stats, setStats] = useState<Stat[] | null>(null)
	const [playtime, setPlaytime] = useState<number>(0)
	const [inputValue, setInputValue] = useState<string>("")

	const fetchData = async () => {
		try {
			let resolvedSteamId = inputValue.trim()

			// Detect if the input is a vanity name, steamID64, or a URL
			if (resolvedSteamId.includes("steamcommunity.com")) {
				const urlParts = new URL(resolvedSteamId)
				const path = urlParts.pathname.split("/")
				if (path.includes("id")) {
					// Vanity name
					resolvedSteamId = await resolveVanityName(
						path[path.indexOf("id") + 1]
					)
				} else if (path.includes("profiles")) {
					// Steam ID
					resolvedSteamId = path[path.indexOf("profiles") + 1]
				} else {
					throw new Error("Invalid Steam profile URL")
				}
			} else if (isNaN(Number(resolvedSteamId))) {
				// Vanity name
				resolvedSteamId = await resolveVanityName(resolvedSteamId)
			}

			// Fetch player info and stats
			const playerData = await getPlayerSummaries(resolvedSteamId)
			setPlayerInfo(playerData[0])

			const rustStats = await getRustStats(resolvedSteamId)
			setStats(rustStats)

			// Fetch playtime for Rust
			const playtimeMinutes = await getRustPlaytime(resolvedSteamId)
			console.log(playtimeMinutes)
			setPlaytime(Math.round(playtimeMinutes / 60))
		} catch (error) {
			console.error("Error fetching data", error)
		}
	}

	const handleButtonClick = () => {
		fetchData()
	}

	const getStatValue = (name: string): number => {
		const stat = stats?.find((s) => s.name === name)
		return stat ? Math.round(stat.value) : 0
	}

	const StatSection: React.FC<{
		title: string
		stats: { [key: string]: number | string }
		icon: string
	}> = ({ title, stats, icon }) => (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
		>
			<div className="flex items-center mb-4">
				<span className="text-2xl mr-2">{icon}</span>
				<h3 className="text-xl font-bold text-amber-400">{title}</h3>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
				{Object.entries(stats).map(([key, value]) => (
					<div key={key} className="flex justify-between items-center py-1">
						<span className="text-gray-400 mr-2">{key}:</span>
						<span className="font-semibold text-right">{value}</span>
					</div>
				))}
			</div>
		</motion.div>
	)

	return (
		<div className="min-h-screen bg-gray-900 text-white py-12 px-4">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-5xl font-bold text-center text-amber-400 mb-8">
					Rust Player Statistics
				</h1>

				<div className="flex justify-center mb-12">
					<input
						type="text"
						className="flex-grow max-w-md px-4 py-2 rounded-l-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
						onChange={(e) => setInputValue(e.target.value)}
						placeholder="Enter Steam ID 64"
					/>
					<button
						className="px-6 py-2 bg-amber-500 text-white rounded-r-md hover:bg-amber-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
						onClick={handleButtonClick}
					>
						Search
					</button>
				</div>

				{playerInfo && stats && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<div className="flex items-center justify-center mb-12 bg-gray-800 p-6 rounded-lg shadow-lg">
							<img
								src={playerInfo.avatarfull}
								alt={playerInfo.personaname}
								className="w-24 h-24 rounded-full mr-6 border-4 border-amber-500"
							/>
							<div>
								<h2 className="text-3xl font-bold mb-2">
									{playerInfo.personaname}
								</h2>
								<a
									href={playerInfo.profileurl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-amber-400 hover:underline mb-2 inline-block"
								>
									View Steam Profile
								</a>
								<p className="text-gray-300 text-lg">
									Hours Played: {playtime} hours
								</p>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<StatSection
								title="PVP"
								icon="⚔️"
								stats={{
									Kills: getStatValue("kill_player"),
									Deaths: getStatValue("deaths"),
									"K/D Ratio": (
										getStatValue("kill_player") /
										Math.max(getStatValue("deaths"), 1)
									).toFixed(2),
									Headshots: getStatValue("headshot"),
									"Bullets Hit": getStatValue("bullet_hit_player"),
									"Bullets Fired": getStatValue("bullet_fired"),
									"Hit %": `${Math.round(
										(getStatValue("bullet_hit_player") /
											Math.max(getStatValue("bullet_fired"), 1)) *
											100
									)}%`,
									"Headshot %": `${Math.round(
										(getStatValue("headshot") /
											Math.max(getStatValue("kill_player"), 1)) *
											100
									)}%`,
								}}
							/>

							<StatSection
								title="Kills"
								icon="🎯"
								stats={{
									Scientists: getStatValue("kill_scientist"),
									Boars: getStatValue("kill_boar"),
									Bears: getStatValue("kill_bear"),
									Wolves: getStatValue("kill_wolf"),
									Chickens: getStatValue("kill_chicken"),
									Deers: getStatValue("kill_stag"),
									Horses: getStatValue("kill_horse"),
								}}
							/>

							<StatSection
								title="Bow Hits"
								icon="🏹"
								stats={{
									"Shots Fired": getStatValue("arrow_fired"),
									Players: getStatValue("arrow_hit_player"),
									Buildings: getStatValue("arrow_hit_building"),
									Bears: getStatValue("arrow_hit_bear"),
									Boars: getStatValue("arrow_hit_boar"),
									Deers: getStatValue("arrow_hit_stag"),
									Horses: getStatValue("arrow_hit_horse"),
									Chickens: getStatValue("arrow_hit_chicken"),
								}}
							/>

							<StatSection
								title="Shotgun Hits"
								icon="🔫"
								stats={{
									"Shots Fired": getStatValue("shotgun_fired"),
									Players: getStatValue("shotgun_hit_player"),
									Buildings: getStatValue("shotgun_hit_building"),
								}}
							/>

							<StatSection
								title="Exposure (hours)"
								icon="🌡️"
								stats={{
									Cold: Math.round(getStatValue("cold_exposure") / 3600),
									Heat: Math.round(getStatValue("heat_exposure") / 3600),
									Comfort: Math.round(getStatValue("comfort_exposure") / 3600),
									Radiation: Math.round(
										getStatValue("radiation_exposure") / 3600
									),
								}}
							/>

							<StatSection
								title="Gathered"
								icon="🧰"
								stats={{
									Wood: getStatValue("gathered_wood"),
									Stone: getStatValue("gathered_stone"),
									Metal: getStatValue("gathered_metal"),
									Scrap: getStatValue("gathered_scrap"),
									Cloth: getStatValue("gathered_cloth"),
									Leather: getStatValue("gathered_leather"),
									"Low Grade": getStatValue("gathered_lowgrade"),
								}}
							/>

							<StatSection
								title="Other"
								icon="📊"
								stats={{
									"Voice Chat": `${Math.round(
										getStatValue("seconds_speaking") / 3600
									)} hours`,
									"Barrels Destroyed": getStatValue("destroyed_barrels"),
									"Rockets Fired": getStatValue("rocket_fired"),
									"Inventory Opened": getStatValue("inventory_opened"),
									"Map Opened": getStatValue("map_opened"),
									Wounded: getStatValue("wounded"),
									"Blueprints Learned": getStatValue("blueprint_studied"),
								}}
							/>
						</div>
					</motion.div>
				)}
			</div>
		</div>
	)
}

export default Stats
