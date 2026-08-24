import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Layout } from './components/layouts/layout/layout';
import { Engineer } from './components/engineer/engineer';    
import { authGuard } from './guards/auth-guard';
import { AddMachine } from './components/add-machine/add-machine';
import { Operator } from './components/operator/operator';
import { Technician } from './components/technician/technician';

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
      },
      {
        path: 'operator',
        component: Operator,
        data: { roles: ['Operator'] },
        children: [
          {
            path: '', // Akan otomatis tampil di <router-outlet> milik Operator
            loadComponent: () =>
              import('smart_tablev1/OperatorDashboardSelectedMachine').then(m => m.OperatorDashboardSelectedMachine) // Sesuaikan nama class eksak komponen MFE Anda
          },
          {
            path: ':id',
            loadComponent: () =>
              import('smart_tablev1/OperatorDashboardById').then(m => m.OperatorDashboardById)
          }
        ]
      },
      {
        path: 'technician',
        component: Technician,
        data: { roles: ['Technician'] },
        children: [
          {
            path: '', // Akan otomatis tampil di <router-outlet> milik Technician
            loadComponent: () =>
              import('smart_tablev1/TechnicianDashboard').then(m => m.TechnicianDashboard) // Sesuaikan nama class eksak komponen MFE Anda
          },
          {
            path: ':id',
            loadComponent: () =>
              import('smart_tablev1/TechnicianDashboardById').then(m => m.TechnicianDashboardById)
          }
        ]
      }
    ]
  } 
];
