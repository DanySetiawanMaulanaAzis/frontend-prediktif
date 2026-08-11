export interface User {
    userId: number;
    name: string;
    password: string;
    is_Operator: boolean;
    is_Technician: boolean;
    is_Engineer: boolean;
    created_At: Date;
}