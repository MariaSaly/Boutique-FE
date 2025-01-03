import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
 export const routes: Routes = [
     {path:'',redirectTo:'login',pathMatch:'full'},
     {path:'login', component:LoginComponent},
     {path:'signup', component:SignUpComponent},
     {path:'moksherentaldestination', component:DashboardComponent}

 ];


@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
 export class AppRoutingModule {}
