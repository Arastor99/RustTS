import axios from "axios"

const API_KEY = "A972A2A4CD1FB1CBD126E3B247041552"
const BASE_URL = "https://api.steampowered.com"

export const getPlayerSummaries = async (steamId: string) => {
	const url = `${BASE_URL}/ISteamUser/GetPlayerSummaries/v2/`
	const { data } = await axios.get(url, {
		params: {
			key: API_KEY,
			steamids: steamId,
		},
	})
	return data.response.players
}

export const getRustStats = async (steamId: string) => {
	const url = `${BASE_URL}/ISteamUserStats/GetUserStatsForGame/v2/`
	const { data } = await axios.get(url, {
		params: {
			key: API_KEY,
			steamid: steamId,
			appid: 252490,
		},
	})
	return data.playerstats.stats
}

export const resolveVanityName = async (
	vanityName: string
): Promise<string> => {
	const url = `${BASE_URL}/ISteamUser/ResolveVanityURL/v1/`
	const { data } = await axios.get(url, {
		params: {
			key: API_KEY,
			vanityurl: vanityName,
		},
	})

	if (data.response.success === 1) {
		return data.response.steamid
	} else {
		throw new Error("Failed to resolve vanity name")
	}
}

export const getRustPlaytime = async (steamId: string): Promise<number> => {
	const url = `${BASE_URL}/IPlayerService/GetOwnedGames/v1/`
	const { data } = await axios.get(url, {
		params: {
			key: API_KEY,
			steamid: steamId,
			include_appinfo: false,
			"appids_filter[0]": 252490,
		},
	})

	const games = data.response.games || []
	if (games.length > 0) {
		return games[0].playtime_forever
	} else {
		return 0
	}
}
