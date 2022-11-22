import React, { Suspense } from "react";
import Head from "next/head";
import { PlayerDetailsSkeleton } from "components/PlayerDetails";
import PlayerPageContent from "./PlayerPageContent";

function PlayerPage({ params: { username } }: { params: { username?: string } }) {
    if (!username) {
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
                <title>osu!Moe | {username} statistics</title>
                <meta name="description" content={`all statistics of ${username}`}></meta>
            </Head>
            <Suspense fallback={<PlayerDetailsSkeleton />}>
                <PlayerPageContent username={username} />
            </Suspense>
        </>
    );
}

export default PlayerPage;
