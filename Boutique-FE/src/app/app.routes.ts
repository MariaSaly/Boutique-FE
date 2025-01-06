import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { AddItemsComponent } from '../pages/adminpage/add-items/add-items.component';
import { ListItemsComponent } from '../pages/adminpage/list-items/list-items.component';
import { AdminAuthGuard } from './admin-auth.guard';
 export const routes: Routes = [
     {path:'',redirectTo:'login',pathMatch:'full'},
     {path:'login', component:LoginComponent},
     {path:'signup', component:SignUpComponent},
     {path:'MoksheDestination', component:DashboardComponent},
     {path:'home',component:HomepageComponent},
    //  {
    //     path:'admin',
    //     loadChildren:() =>import('../pages/adminpage/admin.module').then( m =>m.adminModule)
    //  },
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


 ];


@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
 export class AppRoutingModule {}
