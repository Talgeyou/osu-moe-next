import Image from "next/image";
import React, { memo } from "react";
import { OsuScore } from "types/osu.types";
import styles from "./ScoreCard.module.scss";

type Props = {
    order?: number;
    score: OsuScore;
};

function ScoreCard({ score, order }: Props) {
    return (
        <li className={styles["Score"]}>
            {order && <div className={styles["Score_Order"]}>#{order}</div>}
            <div className={styles["Score_Image"]}>
                <Image
                    src={score.beatmapset.covers["list@2x"]}
                    alt="cover"
                    width={64}
                    height={64}
                />
            </div>
            <div className={styles["Score_Song"]}>
                <span className={styles["Score_Artist"]}>{score.beatmapset.artist}</span>
                <span className={styles["Score_Title"]}>{score.beatmapset.title}</span>
                <span className={styles["Score_Version"]}>({score.beatmap.version})</span>
            </div>
            <div className={styles["Score_Weight"]}>
                <div className={styles["Score_PP"]}>{score.pp.toFixed(2)}pp</div>
                <div className={styles["Score_Weightness"]}>
                    {score.weight.pp.toFixed(2)}pp ({score.weight.percentage.toFixed(2)}%)
                </div>
            </div>
        </li>
    );
}

export default memo(ScoreCard);
