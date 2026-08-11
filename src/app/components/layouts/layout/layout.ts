import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit {
  // State untuk melacak apakah sidebar sedang diminimize
  isSidebarCollapsed = signal<boolean>(false);

  // Method untuk toggle minimize/expand
  toggleSidebar(): void {
    this.isSidebarCollapsed.update(state => !state);
  }
  
  showDropdown = false;

  user: User | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  get role(): string {
    return this.authService.getCurrentRole();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  logout(): void {
    this.authService.logout();
    this.showDropdown = false;
    this.router.navigate(['/login']);
  }
}
