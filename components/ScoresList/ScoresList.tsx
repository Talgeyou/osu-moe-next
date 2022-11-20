import React, { memo } from "react";
import { ScoreCard } from "components";
import { OsuScore } from "types/osu.types";
import styles from "./ScoresList.module.scss";

type Props = { scores: OsuScore[] };

function ScoresList({ scores }: Props) {
    return (
        <ol className={styles["Scores"]}>
            {scores.map((score, index) => (
                <ScoreCard key={score.id} score={score} order={index + 1} />
            ))}
        </ol>
    );
}

export default memo(ScoresList);
