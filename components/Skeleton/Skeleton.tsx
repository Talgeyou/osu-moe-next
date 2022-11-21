import React, { memo } from "react";
import styles from "./Skeleton.module.scss";

function Skeleton() {
    return <div className={styles["Skeleton"]} />;
}

export default memo(Skeleton);
