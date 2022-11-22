"use client";

import React, { memo, useCallback, useRef } from "react";
import { FormField, FormSubmitHandler, FormSubmitPayload } from "./types";
import styles from "./Form.module.scss";
import TextField from "components/TextField";
import Button from "components/Button";

type Props = {
    fields: FormField[];
    onSubmit: FormSubmitHandler;
};

function Form({ fields, onSubmit }: Props) {
    const dataRef = useRef<Record<string, HTMLInputElement | null>>({});

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const data: FormSubmitPayload = {};

            Object.values(dataRef.current).forEach((element) => {
                if (!element) return;
                const { name, value } = element;
                if (typeof name === "string" && typeof value === "string") {
                    data[name] = value;
                }
            });

            onSubmit(data, event);
        },
        [onSubmit],
    );

    return (
        <form className={styles["Form"]} onSubmit={handleSubmit}>
            {fields.map(({ key, ...options }) => {
                return (
                    <TextField
                        key={key}
                        name={key}
                        ref={(element) => {
                            dataRef.current[key] = element;
                        }}
                        {...options}
                    />
                );
            })}
            <Button>Submit</Button>
        </form>
    );
}

export default memo(Form);
