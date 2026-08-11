import { User } from './User';

export interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    user: User;
}