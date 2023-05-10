import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged = false;

  constructor(private tokenService:TokenService){

  }

  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.isLogged = true;
    }
  }

  logout(): void {
    this.tokenService.logOut();
  }

}
