import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/models/admin';
import { AuthService } from 'src/services/auth.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginForm: FormGroup;
  userAdmin:Admin;
  username:string;
  password:string;
  roles:string[];
  errorMsg:string;

  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,

  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  inputChange(){
    this.isLoginFail = false;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {

      this.userAdmin = new Admin(this.username,this.password);
      this.authService.login(this.userAdmin).subscribe(
        data => {
          this.isLogged = true;
          this.isLoginFail = false;
          this.tokenService.setToken(data.token);
          this.tokenService.setAuthorities(data.authorities)
          this.tokenService.setUserName(data.username)
          this.roles = data.authorities
          this.router.navigate(["/portfolio"]);
        },
        err => {
          this.isLogged = false;
          this.isLoginFail = true;
          this.errorMsg = "Usuario o contraseña incorrectos";
        }
      );

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.isLogged = true
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }
}
