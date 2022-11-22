"use client";

import React, { memo, useMemo } from "react";
import Image from "next/image";
import { OsuScore, OsuUser } from "types/osu.types";
import styles from "./PlayerDetails.module.scss";
import Card from "components/Card";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { getGradesData } from "./helpers";
import Chip from "components/Chip";
import ScoresList from "components/ScoresList";

Chart.register(ArcElement, Tooltip, Legend);

type Props = { player: OsuUser; scores: OsuScore[] | null };

function PlayerDetails({ player, scores }: Props) {
    const gradesData = useMemo(() => {
        return getGradesData(player.statistics.grade_counts);
    }, [player.statistics.grade_counts]);

    return (
        <section className={styles["PlayerDetails"]}>
            <div className={styles["PlayerDetails_Header"]}>
                <div className={styles["PlayerDetails_Image"]}>
                    <Image
                        className={styles["PlayerDetails_Avatar"]}
                        alt="avatar"
                        src={player.avatar_url}
                        width={200}
                        height={200}
                    />
                </div>
                <div className={styles["PlayerDetails_HeaderInfo"]}>
                    <h1 className={styles["PlayerDetails_Username"]}>{player.username}</h1>
                    <div className={styles["PlayerDetails_Country"]}>{player.country.code}</div>
                    <div className={styles["PlayerDetails_Rank"]}>
                        #{player.statistics.global_rank}
                    </div>
                </div>
                <div className={styles["PlayerDetails_HeaderStats"]}>
                    <Chip value={`${player.statistics.pp}pp`} label={"Perfomance Points"} />
                    <Chip value={`#${player.statistics.country_rank}`} label={"Country Rank"} />
                    <Chip value={`${player.statistics.level.current}`} label={"Level"} />
                    <Chip
                        value={`${player.statistics.hit_accuracy.toFixed(2)}%`}
                        label={"Accuracy"}
                    />
                    <Chip value={`${player.statistics.play_count} times`} label={"Playcount"} />
                    <Chip
                        value={`${(player.statistics.play_time / 3600).toFixed(2)} hours`}
                        label={"Playtime"}
                    />
                </div>
            </div>
            <div className={styles["PlayerDetails_Cards"]}>
                <Card className={styles["PlayerDetails_Card"]} label={"Grades"}>
                    <Doughnut
                        className={styles["PlayerDetails_Donut"]}
                        width={150}
                        height={150}
                        data={gradesData}
                    />
                </Card>
                {scores && (
                    <Card
                        className={styles["PlayerDetails_Card"]}
                        label={"Best Scores"}
                        maxHeight={300}
                    >
                        <ScoresList scores={scores} />
                    </Card>
                )}
            </div>
        </section>
    );
}

export default memo(PlayerDetails);
