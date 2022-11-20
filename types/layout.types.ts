import { IconName } from "./icon.types";

export type MenuItem = {
    key: string;
    label: string;
    url: string;
    icon?: IconName;
    children?: MenuItem[];
};
