import React, { memo, ReactNode, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import Icon from "components/Icon";
import { MenuItem } from "types/layout.types";
import { IconName } from "types/icon.types";
import styles from "./Sidebar.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "components/Button";

type Props = {
    menuItems: MenuItem[];
    className?: string;
};

function getSidebarItems(items: MenuItem[], currentPath: string) {
    console.log(currentPath);
    return (
        <ul className={styles["Sidebar_Items"]}>
            {items.map((item) => (
                <li key={item.key} className={styles["Sidebar_Item"]}>
                    <Link
                        className={classNames(styles["Sidebar_Link"], {
                            [styles["Sidebar_Link_active"]]: item.url.slice(1)
                                ? currentPath.slice(1).startsWith(item.url.slice(1))
                                : item.url === currentPath,
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
    const router = useRouter();
    const { status } = useSession();

    const actionButton: ReactNode = useMemo(() => {
        switch (status) {
            case "authenticated": {
                return (
                    <Button className={styles["Sidebar_Action"]} onClick={() => signOut()}>
                        <Icon name={IconName.SignOut} className={styles["Sidebar_ActionIcon"]} />
                        <span className={styles["Sidebar_ActionText"]}>Sign Out</span>
                    </Button>
                );
            }
            case "unauthenticated": {
                return (
                    <Button className={styles["Sidebar_Action"]} onClick={() => signIn("osu")}>
                        <Icon name={IconName.SignIn} className={styles["Sidebar_ActionIcon"]} />
                        <span className={styles["Sidebar_ActionText"]}>Sign In</span>
                    </Button>
                );
            }
            default: {
                return null;
            }
        }
    }, [status]);

    return (
        <aside className={classNames(styles["Sidebar"], className)}>
            <div className={styles["Sidebar_Logo"]}>
                <div className={"Sidebar_LogoIcon"}>
                    <Icon name={IconName.Menu} className={styles["Sidebar_LogoBurger"]} />
                </div>
                <span className={styles["Sidebar_LogoText"]}>osu!Moe</span>
            </div>
            {getSidebarItems(menuItems, router.pathname)}
            <div className={styles["Sidebar_Actions"]}>{actionButton}</div>
        </aside>
    );
}

export default memo(Sidebar);
