import { ShellModel } from '../shell/data-store';

export class ClientsModel extends ShellModel {
    clientNumber: number;
    name: string;
}

export class ClientsListModel extends ShellModel {
    clients: Array<ClientsModel>;
}

// export class OrdersToPickModel extends ShellModel {
//     status: number;
//     orders: Array<OrderModel>;
// }