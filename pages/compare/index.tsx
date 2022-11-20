import { Button, Layout } from "components";
import TextField, { TextFieldPayload } from "components/TextField";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};

function CompareForm({}: Props) {
    const router = useRouter();
    const [players, setPlayers] = useState({ player1: "", player2: "" });

    const handleChange = ({ name, value }: TextFieldPayload) => {
        if (typeof name === "string" && typeof value === "string") {
            setPlayers((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push(`/compare/${players.player1}/${players.player2}`);
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <TextField
                    label={"Player 1"}
                    name={"player1"}
                    value={players.player1}
                    required
                    onChange={handleChange}
                />
                <TextField
                    label={"Player 2"}
                    name={"player2"}
                    value={players.player2}
                    required
                    onChange={handleChange}
                />
                <Button type={"submit"}>Submit</Button>
            </form>
        </Layout>
    );
}

export default CompareForm;
