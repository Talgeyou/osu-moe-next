"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Form, { FormSubmitHandler } from "components/Form";

type Props = {};

function CompareForm({}: Props) {
    const router = useRouter();

    const handleSubmit: FormSubmitHandler = ({ player1, player2 }) => {
        if (typeof player1 === "string" && typeof player2 === "string") {
            router.push(`/compare/${player1}/${player2}`);
        }
    };

    return (
        <>
            <Form
                fields={[
                    { key: "player1", label: "Player 1", required: true, autoFocus: true },
                    { key: "player2", label: "Player 2", required: true },
                ]}
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default CompareForm;
