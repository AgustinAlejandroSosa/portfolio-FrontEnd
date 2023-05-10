import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  
  title: string;
  description: string;
  year: string;
  imageUrl:string;

  @Input() isLogged: boolean;


  ngOnInit(): void {
    this.title = "titulo"
  }

}
