import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onLogin() {
    const request: LoginRequest = {
      name: this.username,
      password: this.password,
    };

    this.authService.login(request).subscribe({
      next: (response) => {
        console.log(response);

        this.authService.saveSession(response);

        alert(response.message);

        this.router.navigate([
          this.authService.getDefaultRoute()
        ]);
      },

      error: (error) => {
        console.error(error);

        if (error.status === 401) {
          alert('Username atau Password salah');
        } else {
          alert('Terjadi kesalahan');
        }
      },
    });
  }
}
