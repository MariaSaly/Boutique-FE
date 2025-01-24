import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { LayoutzzComponent } from '../layout/layoutzz/layoutzz.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { AddItemsComponent } from '../pages/adminpage/add-items/add-items.component';
import { ListItemsComponent } from '../pages/adminpage/list-items/list-items.component';
import { AddUserComponent } from '../pages/userpage/add-user/add-user.component';
import { ListUserComponent } from '../pages/userpage/list-user/list-user.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { SareeComponent } from '../pages/sareefolder/saree/saree.component';
import { ViewsareeComponent } from '../pages/sareefolder/viewsaree/viewsaree.component';
import { AdmindashboardComponent } from '../pages/admindashboard/admindashboard.component';
import { CartComponent } from '../pages/cart/cart.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListingComponent } from './order-listing/order-listing.component';
import { ProfileComponent } from '../pages/profile/profile.component';


export const routes: Routes = [
  // Default route redirects to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'MoksheDestination', component: DashboardComponent },
  
  // Protected routes under Layout
  {
    path: '',
    component: LayoutzzComponent,
    children: [
        { path: 'saree', component: SareeComponent },
        { path: 'viewsaree/:id', component: ViewsareeComponent },
      { path: 'home', component: HomepageComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'add',canActivate:[AdminAuthGuard], component: AddItemsComponent },
      { path: 'list',canActivate:[AdminAuthGuard], component: ListItemsComponent },
      { path: 'user',canActivate:[AdminAuthGuard], component: ListUserComponent },
      { path: 'adduser',canActivate:[AdminAuthGuard], component: AddUserComponent },
      {path:'admindashboard',canActivate:[AdminAuthGuard],component:AdmindashboardComponent},
      { path:'cart',component:CartComponent},
      {path:'order/:id',canActivate:[AdminAuthGuard], component:OrderDetailsComponent},
      {path:'order-listing', canActivate:[AdminAuthGuard],component:OrderListingComponent}
    ],
  },
  {
    path:'item',
    loadChildren:() =>import('../pages/adminpage/admin.module').then( m =>m.adminModule),
    canActivate: [AdminAuthGuard],

 },
 {
    path:'item/add',
    loadChildren:() =>import('../pages/adminpage/admin.module').then( m =>m.adminModule),
    canActivate: [AdminAuthGuard],
 },
 {
    path:'item/:id/view',
    loadChildren:() =>import('../pages/adminpage/admin.module').then( m =>m.adminModule),
    canActivate: [AdminAuthGuard],
 },
 {
    path:'item/:id/edit',
    loadChildren:() =>import('../pages/adminpage/admin.module').then( m =>m.adminModule),
    canActivate: [AdminAuthGuard],
 },
  // Wildcard route for 404
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
