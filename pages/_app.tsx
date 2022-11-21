import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { getSession, SessionProvider } from "next-auth/react";
import { Layout } from "components";
import { useEffect } from "react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    useEffect(() => {
        if (typeof window !== undefined) {
            if (!session && !localStorage.getItem("guest_token")) {
                fetch("/api/auth/guestToken")
                    .then((res) => res.json())
                    .then((data) =>
                        localStorage.setItem("guest_token", JSON.stringify(data.accessToken)),
                    );
            }
        }
    }, [session]);

    return (
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
}
