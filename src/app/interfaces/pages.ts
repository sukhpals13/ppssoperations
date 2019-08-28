export interface Pages {
    title: string;
    url?: any;
    direct?: string;
    icon?: string;
    children?: Array<Children>;
    open?: boolean;
}
// For sub menu
export interface Children {
    title: string;
    url: any;
    direct?: string;
    icon?: string;
}
