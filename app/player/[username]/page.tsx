import React, { Suspense } from "react";
import { PlayerDetailsSkeleton } from "components/PlayerDetails";
import PlayerPageContent from "./PlayerPageContent";

function PlayerPage({ params: { username } }: { params: { username?: string } }) {
    if (!username) {
        return (
            <>
                <h1>Player has not been found</h1>
            </>
        );
    }

    return (
        <>
            <Suspense fallback={<PlayerDetailsSkeleton />}>
                <PlayerPageContent username={username} />
            </Suspense>
        </>
    );
}

export default PlayerPage;
