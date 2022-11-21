import React from "react";
import { useRouter } from "next/router";
import Form, { FormSubmitHandler } from "components/Form";
import Head from "next/head";

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
            <Head>
                <title>osu!Moe | Comparing players</title>
            </Head>
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
