import React, { ComponentProps, ElementType, memo, ReactNode } from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

type OwnProps<E extends ElementType = ElementType> = {
    className?: string;
    children?: ReactNode;
    as?: E;
    onClick?: () => void;
};

type Props<E extends ElementType = ElementType> = OwnProps<E> &
    Omit<ComponentProps<E>, keyof OwnProps<E>>;

const defaultElement = "button";

function Button<E extends ElementType = typeof defaultElement>({
    className,
    children,
    as,
    onClick,
    ...otherProps
}: Props<E>) {
    const TagName = as || defaultElement;

    return (
        <TagName
            className={classNames(styles["Button"], className)}
            onClick={onClick}
            {...otherProps}
        >
            {children}
        </TagName>
    );
}

export default memo(Button);
