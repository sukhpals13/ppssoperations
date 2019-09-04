import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'walkthrough', loadChildren: () => import('./walkthrough/walkthrough.module').then(m => m.WalkthroughPageModule) },
  { path: 'getting-started', loadChildren: () => import('./getting-started/getting-started.module').then(m => m.GettingStartedPageModule) },
  { path: 'auth/login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'auth/signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule) },
  // tslint:disable-next-line:max-line-length
  { path: 'auth/forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule) },
  { path: 'app', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'contact-card', loadChildren: () => import('./contact-card/contact-card.module').then(m => m.ContactCardPageModule) },
  // tslint:disable-next-line:max-line-length
  { path: 'forms-and-validations', loadChildren: () => import('./forms/validations/forms-validations.module').then(m => m.FormsValidationsPageModule) },
  { path: 'forms-filters', loadChildren: () => import('./forms/filters/forms-filters.module').then(m => m.FormsFiltersPageModule) },
  { path: 'page-not-found', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
  { path: 'showcase', loadChildren: () => import('./showcase/showcase.module').then(m => m.ShowcasePageModule) },
  { path: 'orders/to-pick', loadChildren: () => import('./pages/Orders/orders-to-pick/orders-to-pick.module').then(m => m.OrdersToPickPageModule) },
  { path: 'orders/view-orders', loadChildren: () => import('./pages/Orders/view-orders/view-orders.module').then(m => m.ViewOrdersPageModule) },
  { path: 'orders/view-orders/:oNumber', loadChildren: () => import('./pages/Orders/order-details/order-details.module').then(m => m.OrderDetailsPageModule) },
  { path: '**', redirectTo: 'page-not-found' },
  // { path: 'order-details', loadChildren: './pages/Orders/order-details/order-details.module#OrderDetailsPageModule' },
  // { path: 'orders-to-pick', loadChildren: './pages/Orders/orders-to-pick/orders-to-pick.module#OrdersToPickPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
