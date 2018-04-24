import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './public/authentication/authentication.component';
import { LoginComponent } from './public/authentication/login/login.component';
import { RegisterComponent } from './public/authentication/register/register.component';
import { RecoverComponent } from './public/authentication/recover/recover.component';
import { StudentDashboardComponent } from './protected/student/student-dashboard/student-dashboard.component';
import { StudentComponent } from './protected/student/student.component';
import {ResetComponent} from './public/authentication/reset/reset.component';
import {UserProfileComponent} from './protected/user/user-profile/user-profile.component';
import {ProtectedComponent} from './protected/protected.component';
import {UserResolve} from './shared/resolvers/user.resolve';
import {VerifyComponent} from "./public/authentication/verify/verify.component";

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent},
      { path: 'recover', component: RecoverComponent },
      { path: 'reset', component: ResetComponent },
      { path: 'reset/:token', component: ResetComponent },
      { path: 'verify/:token', component: VerifyComponent },
    ]
  },
  {
    path: 'secure',
    component: ProtectedComponent,
    children: [
      {
        path: 'students',
        component: StudentComponent,
        children: [
          { path: 'dashboard', component: StudentDashboardComponent },
        ]
      },
      {
        path: 'user',
        children: [
          { path: 'profile/:id', component: UserProfileComponent, resolve: { user: UserResolve }},
        ]
      }
    ]
  }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
