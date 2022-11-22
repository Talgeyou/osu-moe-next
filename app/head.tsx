import React from "react";

type Props = {};

function RootHead({}: Props) {
    return (
        <>
            <title>osu!Moe | osu! statistics</title>
            <meta
                name="description"
                content="osu tools for checking statistics of players and comparing them"
            />
            <meta
                name="google-site-verification"
                content="Eh4weCPQYX0-vf3VOvB3_R3sz0bU-0CX08s80w7vFPo"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </>
    );
}

export default RootHead;
