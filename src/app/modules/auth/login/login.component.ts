import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarwisService } from '../services/jarwis.service';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
declare var swal: any;
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    cin: null,
    password: null
  };

  public error = null;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) { }

  onSubmit() {
    swal('Connexion en cours...')
    swal.showLoading()
    setTimeout(()=>{
      this.Jarwis.login(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    },150);
  }

  handleResponse(data) {
    this.Token.handle(data.token.original.access_token);
    this.Token.setUserName(data.user.name);
    this.Token.setUserRole(data.user.role);
    this.Auth.changeAuthStatus(true);
    swal.close();
    this.router.navigateByUrl('/dashboard');
  }

  handleError(error) {
    swal.close();
    this.error = JSON.parse(error.error).error;
  }
  ngOnInit() {
  }

}
