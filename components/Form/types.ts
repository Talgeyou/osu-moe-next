import TextField from "components/TextField";
import React, { ComponentProps } from "react";

type OwnFormField = {
    key: string;
    value?: string;
    label: string;
};

export type FormField = OwnFormField & Omit<ComponentProps<typeof TextField>, keyof OwnFormField>;

export type FormSubmitPayload = Record<string, string>;

export type FormSubmitHandler = (
    payload: FormSubmitPayload,
    event: React.FormEvent<HTMLFormElement>,
) => void;
