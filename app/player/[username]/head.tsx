import React from "react";

type Props = {
    params: {
        username: string;
    };
};

function PlayerPageHead({ params: { username } }: Props) {
    console.log(username);
    return (
        <>
            <title>{`osu!Moe | ${username} statistics`}</title>
            <meta name="description" content={`all statistics of ${username}`} />
        </>
    );
}

export default PlayerPageHead;
