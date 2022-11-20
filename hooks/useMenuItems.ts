import { IconName } from "types/icon.types";
import { MenuItem } from "types/layout.types";

export function useMenuItems(): MenuItem[] {
    return [
        {
            key: "home",
            label: "Home",
            url: "/",
            icon: IconName.Home,
        },
        {
            key: "stats",
            label: "Stats",
            url: "/player",
            icon: IconName.Stats,
            children: [
                {
                    key: "player",
                    label: "Player",
                    url: "/player",
                    icon: IconName.Player,
                },
                {
                    key: "compare",
                    label: "Compare",
                    url: "/compare",
                    icon: IconName.Compare,
                },
            ],
        },
    ];
}
