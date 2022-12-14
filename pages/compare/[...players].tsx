import { ComparePlayers } from "components";
import { fetchBestScores, fetchGuestToken, fetchPlayer } from "helpers/api";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import Head from "next/head";
import React from "react";
import { OsuScore, OsuUser } from "types/osu.types";

type Props = { players: { player: OsuUser; scores: OsuScore[] }[] };

function ComparePage({ players }: Props) {
    return (
        <>
            <Head>
                <title>
                    osu!Moe | Comparing {players.map(({ player }) => player.username).join(", ")}
                </title>
                <meta
                    name="description"
                    content={`Comparing all statistics of ${players
                        .map(({ player }) => player.username)
                        .join(", ")}`}
                />
            </Head>
            <ComparePlayers players={players} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (
    context,
): Promise<{ props: Props }> => {
    if (!context.params?.players?.length || typeof context.params.players === "string")
        return { props: { players: [] } };

    const token = (await getToken({ req: context.req })) || (await fetchGuestToken());

    let players: { player: OsuUser; scores: OsuScore[] }[] = [];

    await Promise.all(
        context.params.players.map((player) => {
            return new Promise<{ player: OsuUser; scores: OsuScore[] }>(async (resolve, reject) => {
                const fetchedPlayer = await fetchPlayer(player, token?.accessToken);
                if (!fetchedPlayer) {
                    reject("Player has not been found");
                    return;
                }

                const fetchedScores = await fetchBestScores(fetchedPlayer.id, token?.accessToken);

                if (fetchedScores) {
                    resolve({ player: fetchedPlayer, scores: fetchedScores });
                } else {
                    reject("Error while fetching scores");
                }
            });
        }),
    ).then((values) => {
        players = [...values];
    });

    return { props: { players } };
};

export default ComparePage;
