import React, { Suspense } from "react";
import PlayerDetails, { PlayerDetailsSkeleton } from "components/PlayerDetails";
import { fetchBestPlayers, fetchBestScores, fetchGuestToken, fetchPlayer } from "helpers/api";
import { OsuScore, OsuUser } from "types/osu.types";

export async function generateStaticParams() {
    const token = await fetchGuestToken();

    // TODO: Solve 429 HTTP error problem
    // const rankings = await fetchBestPlayers(token?.accessToken);
    const rankings = [{ user: { username: "Talge" } }];

    return rankings
        ? rankings.map((ranking) => ({ username: ranking.user.username }))
        : [{ username: "Talge" }];
}

async function getPlayerData(
    username: string,
): Promise<{ player: OsuUser; scores: OsuScore[] } | null> {
    const token = await fetchGuestToken();

    if (!username) {
        return null;
    }

    const player = await fetchPlayer(username, token?.accessToken);

    if (!player) {
        return null;
    }

    const scores = await fetchBestScores(player.id, token?.accessToken);

    if (!scores) return null;

    return { player, scores };
}

async function PlayerPage({ params: { username } }: { params: { username?: string } }) {
    if (!username) {
        return <h1>Player has not been found</h1>;
    }

    const data = await getPlayerData(username);

    if (!data) {
        return <h1>An error occured while fetching data</h1>;
    }

    return <PlayerDetails player={data.player} scores={data.scores} />;
}

export default PlayerPage;
