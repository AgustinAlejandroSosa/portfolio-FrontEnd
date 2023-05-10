import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/models/experience';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.css']
})
export class EducationListComponent implements OnInit {

  isLogged: boolean = false;
  remaining:number = 150;
  education:Experience;

  constructor(private tokenService: TokenService){}
  
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onSaveEducation(){}
}
