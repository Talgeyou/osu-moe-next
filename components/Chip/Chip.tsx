import React, { memo, ReactNode } from "react";
import styles from "./Chip.module.scss";

type Props = {
    label?: string;
    value: string;
};

function Chip({ value, label }: Props) {
    return (
        <div className={styles["Chip"]}>
            {label && <div className={styles["Chip_Label"]}>{label}</div>}
            <div className={styles["Chip_Value"]}>{value}</div>
        </div>
    );
}

export default memo(Chip);
