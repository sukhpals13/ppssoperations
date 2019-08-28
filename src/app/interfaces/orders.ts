// For orders picking
export interface Order {
    orderNumber: number;
    orderSource: string;
    orgName: string;
    orderAge: string;
    orderStatus: string;
    orderSubstatus: string;
}

export interface orderResponse {
    status: object;
    orders: Array<Order>;
}