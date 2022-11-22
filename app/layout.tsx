import { Layout } from "components";
import { ReactNode } from "react";
import "styles/globals.scss";

type Props = {
    children?: ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang={"en"}>
            <body>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
