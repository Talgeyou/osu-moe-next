import React, { memo } from "react";
import { Card, Skeleton } from "components";
import { ChipSkeleton } from "components/Chip";
import styles from "./PlayerDetails.module.scss";

function PlayerDetailsSkeleton() {
    return (
        <section className={styles["PlayerDetails"]}>
            <div className={styles["PlayerDetails_Header"]}>
                <div className={styles["PlayerDetails_Image"]}>
                    <Skeleton />
                </div>
                <div className={styles["PlayerDetails_HeaderInfo"]}>
                    <h1 className={styles["PlayerDetails_Username"]}>
                        <Skeleton />
                    </h1>
                    <div className={styles["PlayerDetails_Country"]}>
                        <Skeleton />
                    </div>
                    <div className={styles["PlayerDetails_Rank"]}>
                        <Skeleton />
                    </div>
                </div>
                <div className={styles["PlayerDetails_HeaderStats"]}>
                    <ChipSkeleton label={"Perfomance Points"} />
                    <ChipSkeleton label={"Country Rank"} />
                    <ChipSkeleton label={"Level"} />
                    <ChipSkeleton label={"Accuracy"} />
                    <ChipSkeleton label={"Playcount"} />
                    <ChipSkeleton label={"Playtime"} />
                </div>
            </div>
            <div className={styles["PlayerDetails_Cards"]}>
                <Card className={styles["PlayerDetails_Card"]} label={"Grades"}>
                    <Skeleton />
                </Card>
                <Card
                    className={styles["PlayerDetails_Card"]}
                    label={"Best Scores"}
                    maxHeight={300}
                >
                    <Skeleton />
                </Card>
            </div>
        </section>
    );
}

export default memo(PlayerDetailsSkeleton);
