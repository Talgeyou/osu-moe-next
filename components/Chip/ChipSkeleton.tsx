import Skeleton from "components/Skeleton";
import React, { memo } from "react";
import styles from "./Chip.module.scss";

type Props = { label?: string };

function ChipSkeleton({ label }: Props) {
    return (
        <div className={styles["Chip"]}>
            {label && <div className={styles["Chip_Label"]}>{label}</div>}
            <div className={styles["Chip_Value"]}>
                <Skeleton />
            </div>
        </div>
    );
}

export default memo(ChipSkeleton);
