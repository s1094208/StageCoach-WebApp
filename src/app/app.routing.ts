import { Routes, RouterModule } from "@angular/router";
import { AuthenticationComponent } from "./public/authentication/authentication.component";
import { LoginComponent } from "./public/authentication/login/login.component";
import { RegisterComponent } from "./public/authentication/register/register.component";
import { RecoverComponent } from "./public/authentication/recover/recover.component";

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent},
      { path: 'recover', component: RecoverComponent },
    ]
  },
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
