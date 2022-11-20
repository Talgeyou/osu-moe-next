import { Button, Layout, TextField } from "components";
import { TextFieldPayload } from "components/TextField";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};

function PlayerForm({}: Props) {
    const router = useRouter();
    const [username, setUsername] = useState("");

    const handleChange = ({ name, value }: TextFieldPayload) => {
        if (typeof name === "string" && typeof value === "string") {
            setUsername(value);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push(`/player/${username}`);
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <TextField
                    label={"Username"}
                    name={"username"}
                    value={username}
                    required
                    onChange={handleChange}
                />
                <Button type={"submit"}>Submit</Button>
            </form>
        </Layout>
    );
}

export default PlayerForm;
