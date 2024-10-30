import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'reports',
      pathMatch: 'full'
    },
    {
      path: 'reports',
      loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
    }
   ];
