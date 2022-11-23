import React from "react";

type Props = {
    params: {
        usernames: string[];
    };
};

function ComparingPageHead({ params: { usernames } }: Props) {
    return (
        <>
            <title>{`osu!Moe | Comparing ${usernames.map((player) => player).join(", ")}`}</title>
            <meta
                name="description"
                content={`Comparing all statistics of ${usernames
                    .map((username) => username)
                    .join(", ")}`}
            />
        </>
    );
}

export default ComparingPageHead;
