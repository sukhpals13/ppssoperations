export interface Pages {
    title: string;
    url?: any;
    direct?: string;
    icon?: string;
    children?: Array<Children>;
    open?: boolean;
}
interface Children {
    title: string;
    url: any;
    direct?: string;
    icon?: string;
}
export interface Order {
    orderNumber: number;
    orderSource: string;
    orgName: string;
    orderAge: string;
    orderStatus: string;
    orderSubstatus: string;
}