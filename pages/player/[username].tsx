import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { OsuScore, OsuUser } from "types/osu.types";
import { PlayerDetails } from "components";
import { fetchBestScores, fetchGuestToken, fetchPlayer } from "helpers/api";
import { useRouter } from "next/router";
import axios from "axios";
import { PlayerDetailsSkeleton } from "components/PlayerDetails";
import Head from "next/head";

type Props = { player: OsuUser | null; scores: OsuScore[] | null };

function PlayerPage({ player, scores }: Props) {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <>
                <Head>
                    <title>osu!Moe | Loading...</title>
                </Head>
                <PlayerDetailsSkeleton />
            </>
        );
    }

    if (!player) {
        return (
            <>
                <Head>
                    <title>osu!Moe | Not Found</title>
                </Head>
                <h1>Player has not been found</h1>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>osu!Moe | {player.username} statistics</title>
                <meta name="description" content={`all statistics of ${player.username}`}></meta>
            </Head>
            <PlayerDetails player={player} scores={scores} />
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const token = await fetchGuestToken();

    const data = await axios
        .get<{ ranking: { user: OsuUser }[] }>(
            "https://osu.ppy.sh/api/v2/rankings/osu/performance",
            {
                headers: {
                    Authorization: `Bearer ${token?.accessToken}`,
                },
            },
        )
        .then((res) => res.data)
        .catch((e) => console.log(e.message));

    return {
        paths: data
            ? data.ranking.map((ranking) => ({
                  params: {
                      username: ranking.user.username,
                  },
              }))
            : [],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const { params } = context;

    if (typeof params?.username !== "string")
        return { props: { player: null, scores: null }, revalidate: 30 };

    const token = await fetchGuestToken();

    const player = await fetchPlayer(params.username, token?.accessToken);

    if (!player) {
        return { props: { player: null, scores: null }, revalidate: 30 };
    }

    // const scores = await fetchBestScores(player.id, token?.accessToken);

    return { props: { player, scores: [] }, revalidate: 30 };
};

export default PlayerPage;
