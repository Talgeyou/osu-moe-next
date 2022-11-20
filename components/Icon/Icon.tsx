import classNames from "classnames";
import React, { memo } from "react";
import { IconName } from "types/icon.types";
import styles from "./Icon.module.scss";

type Props = { name: IconName; className?: string };

function Icon({ name, className }: Props) {
    return <span className={classNames(styles["Icon"], className)}>{name}</span>;
}

export default memo(Icon);
