import React, { Suspense } from "react";
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
            <Suspense fallback={<PlayerDetailsSkeleton />}>
                <ComparePageContent usernames={usernames} />
            </Suspense>
        </>
    );
}

export default ComparePage;
