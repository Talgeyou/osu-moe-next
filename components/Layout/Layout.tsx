import Sidebar from "components/Sidebar";
import { useMenuItems } from "hooks";
import React, { memo, ReactNode } from "react";
import styles from "./Layout.module.scss";

type Props = { children: ReactNode };

function Layout({ children }: Props) {
    const menuItems = useMenuItems();

    return (
        <div className={styles["Layout"]}>
            <main className={styles["Layout_Content"]}>{children}</main>
            <Sidebar className={styles["Layout_Sidebar"]} menuItems={menuItems} />
        </div>
    );
}

export default memo(Layout);
