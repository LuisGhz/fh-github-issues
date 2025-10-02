import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'issues',
    loadComponent: () =>
      import('./modules/issues/pages/issues-list/issues-list-page').then((m) => m.IssuesListPage),
  },
  {
    path: 'issues/:id',
    loadComponent: () => import('./modules/issues/pages/issue/issue-page').then((m) => m.IssuePage),
  },
  {
    path: '**',
    redirectTo: 'issues',
  },
];
