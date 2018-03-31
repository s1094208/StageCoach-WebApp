import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './public/authentication/authentication.component';
import { LoginComponent } from './public/authentication/login/login.component';
import { Routing } from "./app.routing";
import { RecoverComponent } from './public/authentication/recover/recover.component';
import { RegisterComponent } from './public/authentication/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
  ],
  imports: [
    BrowserModule,
    Routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
