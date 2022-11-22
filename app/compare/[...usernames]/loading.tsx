import React from "react";
import { PlayerDetailsSkeleton } from "components/PlayerDetails";

type Props = {};

function ComparingPageLoader({}: Props) {
    return <PlayerDetailsSkeleton />;
}

export default ComparingPageLoader;
