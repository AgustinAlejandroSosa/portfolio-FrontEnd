import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent {
  text:string = "Investigador"
  img:string = ""
  
  @Input() isLogged:boolean;
}
