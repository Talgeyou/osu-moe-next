import React from "react";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { OsuScore, OsuUser } from "types/osu.types";
import { Layout, PlayerDetails } from "components";
import { fetchBestScores, fetchGuestToken, fetchPlayer } from "helpers/api";

type Props = { player: OsuUser | null; scores: OsuScore[] | null };

function PlayerPage({ player, scores }: Props) {
    if (!player) {
        return <h1>Player has not been found</h1>;
    }

    return (
        <Layout>
            <PlayerDetails player={player} scores={scores} />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (
    context,
): Promise<{ props: Props }> => {
    const { params, req } = context;

    if (typeof params?.username !== "string") return { props: { player: null, scores: null } };

    const token = (await getToken({ req })) || (await fetchGuestToken());

    const player = await fetchPlayer(params.username, token?.accessToken);

    if (!player) {
        return { props: { player: null, scores: null } };
    }

    const scores = await fetchBestScores(player.id, token?.accessToken);

    return { props: { player, scores } };
};

export default PlayerPage;
