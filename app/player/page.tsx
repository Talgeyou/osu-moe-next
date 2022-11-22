"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Form } from "components";
import { FormSubmitHandler } from "components/Form";

function PlayerForm() {
    const router = useRouter();

    const handleSubmit: FormSubmitHandler = ({ username }) => {
        if (typeof username === "string") {
            router.push(`/player/${username}`);
        }
    };

    return (
        <>
            <Form
                fields={[{ key: "username", label: "Username", autoFocus: true, required: true }]}
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default PlayerForm;
