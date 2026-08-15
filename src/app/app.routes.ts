import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Layout } from './components/layouts/layout/layout';
import { Engineer } from './components/engineer/engineer';    
import { authGuard } from './guards/auth-guard';
import { AddMachine } from './components/add-machine/add-machine';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: 'engineer',
        component: Engineer,
        data: { roles: ['Engineer'] },
        children: [
          {
            path: '', // Path kosong berarti langsung otomatis dirender saat mengakses /engineer
            loadComponent: () => 
              import('smart_tablev1/EngineerSmartprioritization')
                .then(m => m.EngineerSmartprioritization) // Sesuaikan dengan nama kelas class eksak di remote Anda
                
          }
        ]
      },
      {
        path: 'add-machine',
        component: AddMachine,
        data: { roles: ['Engineer'] },
        children: [
          {
            path: '', // Akan otomatis tampil di <router-outlet> milik AddMachine
            loadComponent: () =>
              import('smart_tablev1/EngineerDetail').then(m => m.EngineerDetail) // Sesuaikan nama class eksak komponen MFE Anda
          },
        ]
      },
      // 2. Route Halaman Full Detail Mesin (Sejajar dengan add-machine)
      {
        path: 'add-machine/:id',
        data: { roles: ['Engineer'] },
        loadComponent: () => 
          import('smart_tablev1/EngineerDetailById').then(m => m.EngineerDetailById)
      }
    ]
  } 
];
