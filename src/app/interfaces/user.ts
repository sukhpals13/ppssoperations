export interface User {
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
    roles: Array<string>;
    accessToken: string;
}

export interface userResposne {
    status: number;
    user: User;
}