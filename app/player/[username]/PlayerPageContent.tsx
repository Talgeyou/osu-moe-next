import React from "react";
import { PlayerDetails } from "components";
import { fetchBestScores, fetchGuestToken, fetchPlayer } from "helpers/api";
import { asyncComponent } from "helpers/asyncComponent";
import { OsuScore, OsuUser } from "types/osu.types";

type Props = { username: string };

async function getPlayer(
    username: string,
): Promise<{ player: OsuUser | null; scores: OsuScore[] | null }> {
    const token = await fetchGuestToken();

    if (!username) {
        return { player: null, scores: null };
    }

    const player = await fetchPlayer(username, token?.accessToken);

    if (!player) {
        return { player: null, scores: null };
    }

    const scores = await fetchBestScores(player.id, token?.accessToken);

    return { player, scores };
}

async function PlayerPageContent({ username }: Props) {
    const { player, scores } = await getPlayer(username);

    if (!player) return <h1>Not found player by {username} username</h1>;

    return <PlayerDetails player={player} scores={scores} />;
}

export default asyncComponent(PlayerPageContent);
