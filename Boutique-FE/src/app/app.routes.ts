import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { HomepageComponent } from '../pages/homepage/homepage.component';
 export const routes: Routes = [
     {path:'',redirectTo:'login',pathMatch:'full'},
     {path:'login', component:LoginComponent},
     {path:'signup', component:SignUpComponent},
     {path:'MoksheDestination', component:DashboardComponent},
     {path:'home',component:HomepageComponent}

 ];


@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
 export class AppRoutingModule {}
