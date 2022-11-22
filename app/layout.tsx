import { Layout } from "components";
import { ReactNode } from "react";
import "styles/globals.scss";

type Props = {
    children?: ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html>
            <head>
                <title>osu!Moe</title>
            </head>
            <body>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
