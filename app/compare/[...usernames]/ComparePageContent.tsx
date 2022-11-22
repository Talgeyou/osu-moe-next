import React from "react";
import { asyncComponent } from "helpers/asyncComponent";
import { OsuScore, OsuUser } from "types/osu.types";
import { fetchBestScores, fetchGuestToken, fetchPlayer } from "helpers/api";
import { ComparePlayers } from "components";

type CompareData = { player: OsuUser; scores: OsuScore[] }[];

async function getCompareData(usernames: string[]): Promise<CompareData> {
    const token = await fetchGuestToken();

    let data: { player: OsuUser; scores: OsuScore[] }[] = [];

    await Promise.all(
        usernames.map((username) => {
            return new Promise<{ player: OsuUser; scores: OsuScore[] }>(async (resolve, reject) => {
                const fetchedPlayer = await fetchPlayer(username, token?.accessToken);
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
        data = [...values];
    });

    return data;
}

type Props = {
    usernames: string[];
};

async function ComparePageContent({ usernames }: Props) {
    const data = await getCompareData(usernames);

    return <ComparePlayers data={data} />;
}

export default asyncComponent(ComparePageContent);
