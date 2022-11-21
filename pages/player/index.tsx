import React from "react";
import { useRouter } from "next/router";
import { Form } from "components";
import { FormSubmitHandler } from "components/Form";
import Head from "next/head";

type Props = {};

function PlayerForm({}: Props) {
    const router = useRouter();

    const handleSubmit: FormSubmitHandler = ({ username }) => {
        if (typeof username === "string") {
            router.push(`/player/${username}`);
        }
    };

    return (
        <>
            <Head>
                <title>osu!Moe | Player statistic</title>
            </Head>
            <Form
                fields={[{ key: "username", label: "Username", autoFocus: true, required: true }]}
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default PlayerForm;
