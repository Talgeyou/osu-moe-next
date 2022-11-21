import React, { ComponentProps, ForwardedRef, memo, useCallback } from "react";
import { TextFieldPayload } from "./types";
import classNames from "classnames";
import styles from "./TextField.module.scss";

type OwnProps = {
    label?: string;
    name?: string;
    value?: string;
    className?: string;
    onChange?: (payload: TextFieldPayload) => void;
};

type Props = OwnProps & Omit<ComponentProps<"input">, keyof OwnProps>;

const WrappedTextField = React.forwardRef(function TextField(
    { className, name, value, label, onChange, ...otherProps }: Props,
    ref: ForwardedRef<HTMLInputElement>,
) {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            if (onChange) {
                onChange({ name: event.target.name, value: event.target.value });
            }
        },
        [onChange],
    );

    return (
        <div className={classNames(styles["TextField"], className)}>
            <input
                className={styles["TextField_Input"]}
                name={name}
                value={value}
                placeholder={`Enter the ${label || name || "value"}`}
                onChange={handleChange}
                ref={ref}
                {...otherProps}
            />
            {label && <label className={styles["TextField_Label"]}>{label}</label>}
        </div>
    );
});

export default memo(WrappedTextField);
