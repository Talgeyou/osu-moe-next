"use client";

import React, { memo, ReactNode, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import Icon from "components/Icon";
import Button from "components/Button";
import { MenuItem } from "types/layout.types";
import { IconName } from "types/icon.types";
import styles from "./Sidebar.module.scss";

type Props = {
    menuItems: MenuItem[];
    className?: string;
};

function getSidebarItems(items: MenuItem[], currentPath: string | null) {
    return (
        <ul className={styles["Sidebar_Items"]}>
            {items.map((item) => (
                <li key={item.key} className={styles["Sidebar_Item"]}>
                    <Link
                        className={classNames(styles["Sidebar_Link"], {
                            [styles["Sidebar_Link_active"]]: currentPath
                                ? item.url.slice(1)
                                    ? currentPath.slice(1).startsWith(item.url.slice(1))
                                    : item.url === currentPath
                                : false,
                        })}
                        href={item.url}
                    >
                        {item.icon && <Icon className={styles["Sidebar_Icon"]} name={item.icon} />}
                        <span className={styles["Sidebar_Label"]}>{item.label}</span>
                    </Link>
                    {item.children && getSidebarItems(item.children, currentPath)}
                </li>
            ))}
        </ul>
    );
}

function Sidebar({ menuItems, className }: Props) {
    const pathname = usePathname();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        getSession().then((session) => setIsAuth(Boolean(session)));
    }, []);

    const actionButton: ReactNode = useMemo(() => {
        if (isAuth) {
            return (
                <Button className={styles["Sidebar_Action"]} onClick={() => signOut()}>
                    <Icon name={IconName.SignOut} className={styles["Sidebar_ActionIcon"]} />
                    <span className={styles["Sidebar_ActionText"]}>Sign Out</span>
                </Button>
            );
        }
        return (
            <Button className={styles["Sidebar_Action"]} onClick={() => signIn("osu")}>
                <Icon name={IconName.SignIn} className={styles["Sidebar_ActionIcon"]} />
                <span className={styles["Sidebar_ActionText"]}>Sign In</span>
            </Button>
        );
    }, [isAuth]);

    return (
        <aside className={classNames(styles["Sidebar"], className)}>
            <div className={styles["Sidebar_Logo"]}>
                <div className={"Sidebar_LogoIcon"}>
                    <Icon name={IconName.Menu} className={styles["Sidebar_LogoBurger"]} />
                </div>
                <span className={styles["Sidebar_LogoText"]}>osu!Moe</span>
            </div>
            {getSidebarItems(menuItems, pathname)}
            <div className={styles["Sidebar_Actions"]}>{actionButton}</div>
        </aside>
    );
}

export default memo(Sidebar);
