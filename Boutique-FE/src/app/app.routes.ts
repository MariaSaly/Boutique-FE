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
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { ReturnandexchangeComponent } from './returnandexchange/returnandexchange.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { BridalcostumesComponent } from './bridalCostumesFolder/bridalcostumes/bridalcostumes.component';
import { ViewBridalCostumesComponent } from './bridalCostumesFolder/view-bridal-costumes/view-bridal-costumes.component';
import { BridesquadComponent } from './brideSquadeFolder/bridesquad/bridesquad.component';
import { ViewBrideSquadeComponent } from './brideSquadeFolder/view-bride-squade/view-bride-squade.component';
import { CousinsSquardComponent } from './cousinsSquardFolder/cousins-squard/cousins-squard.component';
import { ViewCousinsSquardComponent } from './cousinsSquardFolder/view-cousins-squard/view-cousins-squard.component';
import { FamilyComboComponent } from './familyComboFolder/family-combo/family-combo.component';
import { ViewFamilyComboComponent } from './familyComboFolder/view-family-combo/view-family-combo.component';
import { MensWearComponent } from './mensWearFolder/mens-wear/mens-wear.component';
import { ViewMensWearComponent } from './mensWearFolder/view-mens-wear/view-mens-wear.component';
import { MomandDaughterComponent } from './momAndDaughterFolder/momand-daughter/momand-daughter.component';
import { ViewMomandDaughterComponent } from './momAndDaughterFolder/view-momand-daughter/view-momand-daughter.component';
import { NinenineninecostumesComponent } from './999/ninenineninecostumes/ninenineninecostumes.component';
import { ViewninenineninecostumesComponent } from './999/viewninenineninecostumes/viewninenineninecostumes.component';
import { LeggingComponent } from './leggings/legging/legging.component';
import { ViewleggingsComponent } from './leggings/viewleggings/viewleggings.component';
import { HalfsareeComponent } from './halfsarees/halfsaree/halfsaree.component';
import { ViewhalfsareeComponent } from './halfsarees/viewhalfsaree/viewhalfsaree.component';
import { OfficewearComponent } from './officewears/officewear/officewear.component';
import { ViewofficewearComponent } from './officewears/viewofficewear/viewofficewear.component';
import { PlussizeeComponent } from '../plussize/plussizee/plussizee.component';
import { ViewplussizeeComponent } from '../plussize/viewplussizee/viewplussizee.component';
import { CoordsComponent } from './cordset/coords/coords.component';
import { ViewcoordsComponent } from './cordset/viewcoords/viewcoords.component';


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
        { path: 'terms', component: TermsandconditionComponent },
        { path: 'policy', component: PrivacypolicyComponent },
        { path: 'aboutus', component: AboutusComponent },
        { path: 'return', component: ReturnandexchangeComponent },
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
      {path:'order-listing', canActivate:[AdminAuthGuard],component:OrderListingComponent},
      { path: 'search', component: SearchResultComponent },
      { path: 'saree', component: SareeComponent },
      { path: 'viewsaree/:id', component: ViewsareeComponent },
      { path: 'nine', component: NinenineninecostumesComponent },
      { path: 'nine/:id', component: ViewninenineninecostumesComponent },
      { path: 'coords', component: CoordsComponent },
      { path: 'coords/:id', component: ViewcoordsComponent },
      { path: 'leggins', component: LeggingComponent },
      { path: 'leggins/:id', component: ViewleggingsComponent },
      { path: 'halfsaree', component: HalfsareeComponent },
      { path: 'halfsaree/:id', component: ViewhalfsareeComponent },
      { path: 'officewear', component: OfficewearComponent },
      { path: 'officewear/:id', component: ViewofficewearComponent },
      { path: 'plussize', component: PlussizeeComponent },
      { path: 'plussize/:id', component: ViewplussizeeComponent },
      { path: 'bridalcostumes', component: BridalcostumesComponent },
      { path: 'bridalcostumes/:id', component: ViewBridalCostumesComponent },
      { path: 'bridalsquade', component: BridesquadComponent },
      { path: 'bridalsquade/:id', component: ViewBrideSquadeComponent },
      { path: 'cousinsquade', component: CousinsSquardComponent },
      { path: 'cousinsquade/:id', component: ViewCousinsSquardComponent },
      { path: 'familycombo', component: FamilyComboComponent },
      { path: 'familycombo/:id', component: ViewFamilyComboComponent },
      { path: 'menswear', component: MensWearComponent },
      { path: 'menswear/:id', component: ViewMensWearComponent },
      { path: 'momanddaughter', component: MomandDaughterComponent },
      { path: 'momanddaughter/:id', component: ViewMomandDaughterComponent },
      { path: 'home', component: HomepageComponent },
      { path: 'add', canActivate: [AdminAuthGuard], component: AddItemsComponent },
      { path: 'list', canActivate: [AdminAuthGuard], component: ListItemsComponent },
      { path: 'user', canActivate: [AdminAuthGuard], component: ListUserComponent },
      { path: 'adduser', canActivate: [AdminAuthGuard], component: AddUserComponent },
      { path: 'admindashboard', canActivate: [AdminAuthGuard], component: AdmindashboardComponent },
      { path: 'cart', component: CartComponent },
      { path: 'order/:id', canActivate: [AdminAuthGuard], component: OrderDetailsComponent },
      { path: 'order-listing', canActivate: [AdminAuthGuard], component: OrderListingComponent }
    ],
  },
  {
    path: 'item',
    loadChildren: () => import('../pages/adminpage/admin.module').then(m => m.adminModule),
    canActivate: [AdminAuthGuard],

  },
  {
    path: 'item/add',
    loadChildren: () => import('../pages/adminpage/admin.module').then(m => m.adminModule),
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'item/:id/view',
    loadChildren: () => import('../pages/adminpage/admin.module').then(m => m.adminModule),
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'item/:id/edit',
    loadChildren: () => import('../pages/adminpage/admin.module').then(m => m.adminModule),
    canActivate: [AdminAuthGuard],
  },
  // Wildcard route for 404
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
