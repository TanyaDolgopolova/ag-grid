export default class MenuItemModel {
    name: string;
    disabled?: boolean;
    shortcut?: string;
    action?: () => void;
    checked?: boolean;
    icon?: HTMLElement | string;
    subMenu?: MenuItemModel[];
    cssClasses?: string[];
    tooltip?: string;
}
