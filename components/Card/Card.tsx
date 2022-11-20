import classNames from "classnames";
import React, { memo, ReactNode } from "react";
import styles from "./Card.module.scss";

type Props = { children: ReactNode; className?: string; label?: string; maxHeight?: number };

function Card({ children, className, label, maxHeight }: Props) {
    return (
        <section className={classNames(styles["Card"], className)}>
            <div
                className={styles["Card_Content"]}
                style={{ height: maxHeight ? maxHeight : undefined }}
            >
                {children}
            </div>
            {label && <div className={styles["Card_Label"]}>{label}</div>}
        </section>
    );
}

export default memo(Card);
