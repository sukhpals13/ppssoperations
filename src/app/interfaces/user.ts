import { ShellModel } from '../shell/data-store';

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
    roles: Array<string>;
    accessToken: string;
}

export class UsersModel extends ShellModel {
    // UserNumber: number;
    firstName: string;
    lastName: string;
    email: string;
}

export class UsersListModel extends ShellModel {
    // UserNumber: number;
    firstName: string;
    lastName: string;
    email: string;
    users: Array<UsersModel>;
}

export interface userResposne {
    status: number;
    user: User;
}