export interface Pages {
    title: string;
    url?: any;
    direct?: string;
    icon?: string;
    children?: Array<Children>;
    open?: boolean;
}
// For sub menu
interface Children {
    title: string;
    url: any;
    direct?: string;
    icon?: string;
}

// For orders picking
export interface Order {
    orderNumber: number;
    orderSource: string;
    orgName: string;
    orderAge: string;
    orderStatus: string;
    orderSubstatus: string;
}

export interface Response {
    status: object;
    orders: Array<Order>;
}