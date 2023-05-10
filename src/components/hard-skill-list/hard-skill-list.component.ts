import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-hard-skill-list',
  templateUrl: './hard-skill-list.component.html',
  styleUrls: ['./hard-skill-list.component.css']
})
export class HardSkillListComponent implements OnInit {

  isLogged:boolean = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

}
