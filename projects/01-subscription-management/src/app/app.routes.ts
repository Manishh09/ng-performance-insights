import { Routes } from '@angular/router';
import { UserListClassicComponent } from './components/classic/user-list-classic.component';
import { UserListTakeuntilComponent } from './components/takeuntil/user-list-takeuntil.component';
import { UserListAutoUnsubscribeComponent } from './components/take-untildestroyed/user-list-auto-unsubscribe.component';
import { UserProfileSubsinkComponent } from './components/subsink/user-profile-subsink.component';
import { UserProductTakeUntilComponent } from './components/advanced/takeuntil/user-product-takeuntil.component';
import { UserProductAutoUnsubscribeComponent } from './components/advanced/take-untildestroyed/user-product-auto-unsubscribe.component';
import { NavigationComponent } from './components/navigation/navigation.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: NavigationComponent,
    title: 'Subscription Management Patterns'
  },
  {
    path: 'classic',
    component: UserListClassicComponent,
    title: 'Classic Subscription Management'
  },
  {
    path: 'takeuntil',
    component: UserListTakeuntilComponent,
    title: 'TakeUntil Pattern'
  },
  {
    path: 'auto-unsubscribe',
    component: UserListAutoUnsubscribeComponent,
    title: 'Auto Unsubscribe Pattern'
  },
  {
    path: 'subsink',
    component: UserProfileSubsinkComponent,
    title: 'SubSink Pattern'
  },
  {
    path: 'advanced',
    children: [
      {
        path: '',
        redirectTo: 'takeuntil',
        pathMatch: 'full'
      },
      {
        path: 'takeuntil',
        component: UserProductTakeUntilComponent,
        title: 'Advanced TakeUntil - Users & Products'
      },
      {
        path: 'auto-unsubscribe',
        component: UserProductAutoUnsubscribeComponent,
        title: 'Advanced Auto Unsubscribe - Users & Products'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
