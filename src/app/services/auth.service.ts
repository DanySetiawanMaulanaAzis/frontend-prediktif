import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { User } from '../models/User';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) { }

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getCurrentUser(): User | null {
        const user = localStorage.getItem('user');
        if (!user) {
            return null;
        }
        return JSON.parse(user);
    }

    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }

    saveSession(response: LoginResponse): void {

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

    }

    logout(): void {
        localStorage.clear();
    }

    private roleMap = {
        Engineer: 'is_Engineer',
        Technician: 'is_Technician',
        Operator: 'is_Operator'
    };

    hasRole(role: string): boolean {
        const user = this.getCurrentUser();
        if (!user) {
            return false;
        }
        switch (role) {
            case 'Engineer':
                return user.is_Engineer;
            case 'Technician':
                return user.is_Technician;
            case 'Operator':
                return user.is_Operator;
            default:
                return false;
        }
    }

    hasAnyRole(roles: string[]): boolean {
        return roles.some(role => this.hasRole(role));
    }

    getCurrentRole(): string {
        const user = this.getCurrentUser();

        if (!user)
            return '-';
        if (user.is_Engineer)
            return 'Engineer';
        if (user.is_Technician)
            return 'Technician';
        if (user.is_Operator)
            return 'Operator';
        return '-';
    }

    getDefaultRoute(): string {
        if (this.hasRole('Engineer'))
            return '/engineer';
        if (this.hasRole('Technician'))
            return '/technician';
        if (this.hasRole('Operator'))
            return '/operator';
        return '/login';
    }
}
