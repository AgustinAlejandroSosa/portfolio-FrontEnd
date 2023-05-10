import { Component } from '@angular/core';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-soft-skill-list',
  templateUrl: './soft-skill-list.component.html',
  styleUrls: ['./soft-skill-list.component.css']
})
export class SoftSkillListComponent {

  isLogged: boolean = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }
}
