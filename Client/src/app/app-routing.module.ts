import { AuthGuard } from './auth.guard';
import { UsersComponent } from './Components/users/users.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'signIn', pathMatch: 'full' },
  { path: "signIn", component: SignInComponent },
  { path: "signUp", component: SignUpComponent },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: '404', component: PageNotFoundComponent
  },
  {
    path: '**', redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const rountingComponents = [SignInComponent, SignUpComponent, UsersComponent, PageNotFoundComponent]
