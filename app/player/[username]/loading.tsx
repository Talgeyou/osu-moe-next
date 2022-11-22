import { PlayerDetailsSkeleton } from "components/PlayerDetails";
import React from "react";

type Props = {};

function PlayerPageLoader({}: Props) {
    return <PlayerDetailsSkeleton />;
}

export default PlayerPageLoader;
