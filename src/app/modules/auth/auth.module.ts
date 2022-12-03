import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JarwisService } from './services/jarwis.service';
import { FormsModule } from '@angular/forms';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginComponent
  ],
  exports:[
    LoginComponent
  ],
  providers:[
    AuthService,
    TokenService,
    JarwisService,
    BeforeLoginService,
    AfterLoginService
    
  ]
})
export class AuthModule { }
