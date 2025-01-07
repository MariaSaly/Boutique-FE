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
     
      { path: 'home', component: HomepageComponent },
      { path: 'add', component: AddItemsComponent },
      { path: 'list', component: ListItemsComponent },
      { path: 'user', component: ListUserComponent },
      { path: 'adduser', component: AddUserComponent },
    ],
  },

  // Wildcard route for 404
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
