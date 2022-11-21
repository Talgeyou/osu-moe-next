import React, { memo, useMemo } from "react";
import Image from "next/image";
import classNames from "classnames";
import { Bar, Doughnut } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { OsuScore, OsuUser } from "types/osu.types";
import { Card } from "components";
import {
    getRankBarProps,
    getAccuracyBarProps,
    getPlaycountBarProps,
    getPlaytimeBarProps,
    getPPBarProps,
    getGradesData,
} from "./helpers";
import styles from "./ComparePlayers.module.scss";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = { players: { player: OsuUser; scores: OsuScore[] }[] };

function ComparePlayers({ players }: Props) {
    const playersList = useMemo(() => players.map(({ player }) => player), [players]);

    const rankBarProps = getRankBarProps(playersList);
    const accuracyBarProps = getAccuracyBarProps(playersList);
    const playcountBarProps = getPlaycountBarProps(playersList);
    const playtimeBarProps = getPlaytimeBarProps(playersList);
    const ppBarProps = getPPBarProps(playersList);
    const gradesData = getGradesData(playersList);

    return (
        <section className={styles["ComparePlayers"]}>
            <div className={styles["ComparePlayers_Header"]}>
                {players.map(({ player }) => {
                    return (
                        <div key={player.id} className={styles["ComparePlayers_Player"]}>
                            <div className={styles["ComparePlayers_Image"]}>
                                <Image
                                    className={styles["ComparePlayers_Avatar"]}
                                    alt="avatar"
                                    src={player.avatar_url}
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className={styles["ComparePlayers_PlayerInfo"]}>
                                <h1 className={styles["ComparePlayers_Username"]}>
                                    {player.username}
                                </h1>
                                <div className={styles["ComparePlayers_Country"]}>
                                    {player.country.code}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles["ComparePlayers_Cards"]}>
                <Card className={styles["ComparePlayers_Card"]} label="Rank">
                    <Bar {...rankBarProps} />
                </Card>
                <Card className={styles["ComparePlayers_Card"]} label="Perfomance Points">
                    <Bar {...ppBarProps} />
                </Card>
                <Card className={styles["ComparePlayers_Card"]} label="Accuracy">
                    <Bar {...accuracyBarProps} />
                </Card>
                <Card className={styles["ComparePlayers_Card"]} label="Playcount">
                    <Bar {...playcountBarProps} />
                </Card>
                <Card className={styles["ComparePlayers_Card"]} label="Playtime">
                    <Bar {...playtimeBarProps} />
                </Card>
                <Card
                    className={classNames(
                        styles["ComparePlayers_Card"],
                        styles["ComparePlayers_Card_grades"],
                    )}
                    label="Grades"
                >
                    <Doughnut data={gradesData} />
                </Card>
            </div>
        </section>
    );
}

export default memo(ComparePlayers);
