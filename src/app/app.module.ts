import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './public/authentication/authentication.component';
import { LoginComponent } from './public/authentication/login/login.component';
import { Routing } from './app.routing';
import { RecoverComponent } from './public/authentication/recover/recover.component';
import { RegisterComponent } from './public/authentication/register/register.component';
import { AuthService} from './shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StudentDashboardComponent } from './protected/student/student-dashboard/student-dashboard.component';
import { AccountService } from './shared/services/account.service';
import { JWT } from './jwt.config';
import { StudentComponent } from './protected/student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
    StudentDashboardComponent,
    StudentComponent,
  ],
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JWT,
  ],
  providers: [
    AuthService,
    AccountService,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
