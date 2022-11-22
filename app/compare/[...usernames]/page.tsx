import React, { Suspense } from "react";
import Head from "next/head";
import { PlayerDetailsSkeleton } from "components/PlayerDetails";
import ComparePageContent from "./ComparePageContent";

type Props = {
    params: {
        usernames?: string[];
    };
};

function ComparePage({ params: { usernames } }: Props) {
    if (!usernames) {
        return <h1>Players has not been found</h1>;
    }

    return (
        <>
            <Head>
                <title>osu!Moe | Comparing {usernames.map((player) => player).join(", ")}</title>
                <meta
                    name="description"
                    content={`Comparing all statistics of ${usernames
                        .map((username) => username)
                        .join(", ")}`}
                />
            </Head>
            <Suspense fallback={<PlayerDetailsSkeleton />}>
                <ComparePageContent usernames={usernames} />
            </Suspense>
        </>
    );
}

export default ComparePage;
