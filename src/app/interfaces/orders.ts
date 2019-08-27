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