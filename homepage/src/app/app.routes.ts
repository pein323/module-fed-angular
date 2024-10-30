import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: 'billing',
    loadChildren: () => {
      return loadRemoteModule({
        remoteEntry: "http://localhost:4201/remoteEntry.js",
        remoteName: 'billing',
        exposedModule: './BillingModule'
      }).then(m => m.BillingModule).catch(error =>
 console.log('Error=>', error));
    }
  },
  {
    path: 'reports',
    loadChildren: () => {
      return loadRemoteModule({
        remoteEntry: "http://localhost:4202/remoteEntry.js",
        remoteName: 'report',
        exposedModule: './ReportModule'
      }).then(m => m.ReportModule).catch(error =>
 console.log('Error=>', error)); } } ];
