import axios from "axios";
import { JWT } from "next-auth/jwt";
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

export async function fetchGuestToken(): Promise<JWT | null> {
    return await axios
        .post<{
            access_token: string;
            expires_in: number;
            token_type: string;
        }>("https://osu.ppy.sh/oauth/token", {
            client_id: process.env.OSU_CLIENT_ID,
            client_secret: process.env.OSU_CLIENT_SECRET,
            grant_type: "client_credentials",
            scope: "public",
        })
        .then(
            (res): JWT => ({
                accessToken: res.data.access_token,
            }),
        )
        .catch((e) => {
            console.log(e.message);
            return null;
        });
}
