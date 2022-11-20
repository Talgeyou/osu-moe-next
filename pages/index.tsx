import { Layout } from "components";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
    return (
        <Layout>
            <h1>Home page</h1>
        </Layout>
    );
}
