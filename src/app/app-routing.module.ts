import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './services/auth.guards';

import { HeaderComponent } from './header/header.component';
import { DialogComponent } from './dialog/dialog.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {  TableComponent } from './table/table.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
    {path:'',component:SignInComponent},
    {path:'SignUp',component:SignUpComponent},
    {path:'Header',component:HeaderComponent},
    {path:'Dialog',component:DialogComponent},
    {path:'Table',component:TableComponent},

    // { path: '', 
    // component: PostListComponent },
    // { path: 'create', 
    // component: PostCreateComponent, 
    // canActivate: [AuthGuard]},
    // { path: 'edit', 
    // component: PostCreateComponent, 
    // canActivate: [AuthGuard] },
    // { path: 'login', 
    // component: LoginComponent },
    // { path: 'signup', 
    // component: SignupComponent }
    // { path: '',   redirectTo: '/SignUpComponent', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard]
})
export class AppRoutingModule { }
