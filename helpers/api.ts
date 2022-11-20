import axios from "axios";
import { OsuScore, OsuUser } from "types/osu.types";

export async function fetchPlayer(username: string, token?: string): Promise<OsuUser | null> {
    return await axios
        .get<OsuUser>(`https://osu.ppy.sh/api/v2/users/${username}/osu`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data)
        .catch((e) => {
            return null;
        });
}

export async function fetchBestScores(userId: number, token?: string) {
    return await axios
        .get<OsuScore[]>(
            `https://osu.ppy.sh/api/v2/users/${userId}/scores/best?mode=osu&limit=100`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        .then((res) => res.data)
        .catch((e) => {
            console.log(e.message);
            return null;
        });
}
